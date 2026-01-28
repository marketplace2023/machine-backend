import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MonitoringModule } from './modules/monitoring/monitoring.module';
import { InjectionModule } from './modules/injection/injection.module';
import { AlertsModule } from './modules/alerts/alerts.module';
import { ThermalModule } from './modules/thermal/thermal.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'moldeo_pro',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Solo para desarrollo - desactivar en producción
      logging: true,
    }),
    MonitoringModule,
    InjectionModule,
    AlertsModule,
    ThermalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
