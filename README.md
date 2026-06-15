# Mi Proyecto DevOps con Docker Compose

Aplicación simple en Node.js + Express conectada a PostgreSQL usando Docker Compose.

## Estructura del proyecto

```bash
mi-proyecto/
├─ app/
│  ├─ Dockerfile
│  ├─ index.js
│  └─ package.json
├─ .env
├─ docker-compose.yml
└─ README.md
```

## Variables de entorno

Archivo `.env`:

```env
POSTGRES_USER=devuser
POSTGRES_PASSWORD=devpass
POSTGRES_DB=devdb
APP_PORT=3000
```

## Levantar el proyecto

Desde la raíz:

```bash
docker compose up --build
```

## Acceso

Abrir en navegador:

```bash
http://localhost:3000
```

## Comandos útiles

Ver estado:

```bash
docker compose ps
```

Ver logs:

```bash
docker compose logs -f
```

Detener servicios:

```bash
docker compose down
```

## Persistencia

La base de datos PostgreSQL usa un volumen nombrado (`pgdata`), por lo que los datos persisten aunque se eliminen los contenedores con `docker compose down`.

## Qué aprende este proyecto

- Crear una app Node.js simple.
- Conectar Node.js con PostgreSQL.
- Construir una imagen con Dockerfile.
- Orquestar servicios con Docker Compose.
- Persistir datos con volúmenes.
