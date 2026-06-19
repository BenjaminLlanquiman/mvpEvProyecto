# InnovaTech — MVP

Sistema de visibilidad en tiempo real para equipos distribuidos de Innovatech Solutions.
Desarrollado como MVP de la **Opción C (Implementación Híbrida)** — GPY1101 Evaluación Parcial N°3.

---

## Requisito único

Solo necesitas tener instalado **Docker Desktop**.

- Descarga: https://www.docker.com/products/docker-desktop
- Versión mínima recomendada: Docker 24+
- Compatible con Windows, macOS y Linux

No necesitas instalar Node.js, Java, Maven ni ninguna otra herramienta. Docker trae todo incluido.

---

## Estructura del proyecto

```
Backendinnovatech/
├── ms-recursos/        → Microservicio de gestión de recursos (Spring Boot · puerto 8081)
├── ms-tareas/          → Microservicio de gestión de tareas (Spring Boot · puerto 8082)
├── ms-dashboard/       → Microservicio agregador de datos (Spring Boot · puerto 8083)
├── mvp/                → Frontend React + TypeScript (Vite · Nginx · puerto 8080)
└── docker-compose.yml  → Orquesta los 4 servicios con un solo comando
```

---

## Cómo correr el proyecto

### 1. Abre Docker Desktop y espera a que esté corriendo

El ícono de la ballena en la barra de tareas debe estar quieto (no girando).

### 2. Abre una terminal en la carpeta raíz del proyecto

```bash
cd ruta/a/Backendinnovatech
```

### 3. Levanta todos los servicios

```bash
docker compose up --build
```

La primera vez puede tardar entre 3 y 5 minutos porque descarga las imágenes base de Node, Nginx y Java. Las veces siguientes es mucho más rápido.

### 4. Abre el sistema en el navegador

```
http://localhost:8080
```

El indicador **"En vivo"** en la esquina superior derecha confirma que el frontend está conectado al backend.

---

## Puertos utilizados

| Servicio | Puerto | URL |
|---|---|---|
| Frontend (React + Nginx) | 8080 | http://localhost:8080 |
| ms-recursos | 8081 | http://localhost:8081/api/recursos |
| ms-tareas | 8082 | http://localhost:8082/api/tareas |
| ms-dashboard | 8083 | http://localhost:8083/api/dashboard |

---

## Comandos útiles

**Levantar sin reconstruir (más rápido):**
```bash
docker compose up
```

**Detener todos los servicios:**
```bash
docker compose down
```

**Ver logs de un servicio específico:**
```bash
docker logs ms-dashboard
docker logs ms-recursos
docker logs ms-tareas
```

**Reconstruir solo el frontend:**
```bash
docker compose up --build frontend
```

**Reconstruir solo un microservicio:**
```bash
docker compose up --build ms-tareas
```

---

## Tecnologías utilizadas

### Frontend
| Tecnología | Versión | Uso |
|---|---|---|
| React | 18 | Framework de UI |
| TypeScript | 5 | Tipado estático |
| Vite | 5 | Bundler y servidor de desarrollo |
| Recharts | 2 | Gráficos (línea, barras, torta) |
| Nginx | Alpine | Servidor de producción y proxy inverso |

### Backend (microservicios)
| Tecnología | Versión | Uso |
|---|---|---|
| Spring Boot | 4.1.0 | Framework REST API |
| Java | 21 | Lenguaje de programación |
| Maven | 3.9.6 | Gestión de dependencias |
| Spring Data JPA | — | Capa de persistencia |
| H2 Database | — | Base de datos embebida (en memoria) |

### Infraestructura
| Tecnología | Uso |
|---|---|
| Docker | Contenedorización de cada servicio |
| Docker Compose | Orquestación de los 4 contenedores |

---

## Nota sobre la base de datos

El sistema usa **H2 (base de datos en memoria)**. Esto significa que los datos se reinician cada vez que se detienen los contenedores (`docker compose down`). Si vuelves a levantar con `docker compose up` sin bajar los contenedores, los datos se mantienen.

Esta decisión fue intencional para el MVP — no requiere instalar ni configurar un servidor de base de datos externo, lo que facilita la demostración. La arquitectura está preparada para migrar a PostgreSQL en una fase futura cambiando solo la configuración en `application.yaml` de cada microservicio.

---

## Funcionalidades del MVP

- **Dashboard** — KPIs en tiempo real (tareas completadas, recursos, carga laboral), alertas automáticas de sobrecarga, gráfico de evolución y carga por región
- **Recursos** — Agregar y eliminar integrantes del equipo con rol y región
- **Proyectos** — Tablero Kanban por proyecto cliente (Gestión de Pacientes, Banca Móvil, E-Learning) con drag & drop entre columnas
