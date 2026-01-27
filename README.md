# Backend Moldeo Pro - API REST

Backend NestJS con TypeORM y MySQL para el sistema de monitoreo de inyección de plástico.

## 🗄️ Tablas MySQL (Entidades TypeORM)

- **tbl_machine_status** - Estado del gemelo digital (OEE, tiempos de ciclo, salud de servos)
- **tbl_injection_cycles** - Parámetros de inyección (temperatura husillo, fuerza cierre, presión)
- **tbl_thermal_zones** - Zonas térmicas (husillo/molde)
- **tbl_alerts_log** - Registro de alertas críticas y advertencias

## 📡 Endpoints API

### Monitoring (`/monitoring`)

- `GET /monitoring/live` - Datos del gemelo digital en tiempo real
- `GET /monitoring/diagnostics` - Diagnóstico de actuadores

### Injection (`/injection`)

- `GET /injection/params` - Parámetros de proceso actual
- `POST /injection/adjust` - Ajustar presión y velocidad

### Alerts (`/alerts`)

- `GET /alerts/active` - Alertas activas
- `PUT /alerts/resolve/:id` - Marcar alerta como resuelta

### Temperature (`/temperature`)

- `GET /temperature/zones` - Estado de zonas térmicas

## ⚙️ Instalación

```bash
npm install
```

## 🔧 Configuración

Configurar archivo `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=tu_password
DB_DATABASE=moldeo_pro
PORT=3000
```

## 🚀 Ejecución

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## 📦 Dependencias instaladas

- `@nestjs/typeorm` - Integración TypeORM
- `typeorm` - ORM para TypeScript
- `mysql2` - Driver MySQL
- `@nestjs/config` - Gestión de variables de entorno
- `class-validator` - Validación de DTOs
- `class-transformer` - Transformación de objetos
- `node-opcua` - Comunicación OPC-UA

## 🔑 Características

- ✅ TypeORM con sincronización automática de esquemas (solo dev)
- ✅ CORS habilitado para React frontend (puerto 5173)
- ✅ Validación global de DTOs
- ✅ Logging de consultas SQL
- ✅ Arquitectura modular (4 módulos principales)
