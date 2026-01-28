import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { MonitoringService } from './monitoring.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
})
export class MonitoringGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('MonitoringGateway');
  private monitoringInterval: NodeJS.Timeout;

  constructor(private readonly monitoringService: MonitoringService) {}

  afterInit() {
    this.logger.log('WebSocket Gateway inicializado');

    // Emitir datos de monitoreo cada 2 segundos
    this.monitoringInterval = setInterval(() => {
      void this.emitMonitoringData();
    }, 2000);
  }

  handleConnection(client: Socket) {
    this.logger.log(`Cliente conectado: ${client.id}`);

    // Enviar datos iniciales al conectarse
    void this.sendInitialData(client);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Cliente desconectado: ${client.id}`);
  }

  private async sendInitialData(client: Socket) {
    try {
      const liveData = await this.monitoringService.getLiveData();
      client.emit('monitoring:live', liveData);
    } catch (error) {
      this.logger.error('Error enviando datos iniciales', error);
    }
  }

  private async emitMonitoringData() {
    try {
      const liveData = await this.monitoringService.getLiveData();
      this.server.emit('monitoring:live', liveData);
    } catch (error) {
      this.logger.error('Error emitiendo datos de monitoreo', error);
    }
  }

  // Método para limpiar al destruir el gateway
  onModuleDestroy() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
    }
  }
}
