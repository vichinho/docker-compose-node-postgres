# docker-compose-node-postgres

Proyecto de práctica DevOps: API REST con **Node.js + Express** conectada a **PostgreSQL**, orquestada con **Docker Compose**. Incluye persistencia de datos mediante volúmenes Docker.

---

## Arquitectura

```
┌─────────────────────────────────────────┐
│            Docker Compose               │
│                                         │
│  ┌──────────────┐    ┌───────────────┐  │
│  │   app-dev    │───▶│  postgres-dev │  │
│  │ Node/Express │    │  PostgreSQL16 │  │
│  │  puerto 3000 │    │  puerto 5432  │  │
│  └──────────────┘    └───────┬───────┘  │
│                              │          │
│                         volumen pgdata  │
└─────────────────────────────────────────┘
```

- **app**: servicio Node.js que se conecta a la base de datos y responde en `localhost:3000`
- **db**: servicio PostgreSQL 16 con datos persistidos en el volumen `pgdata`
- **pgdata**: volumen Docker que sobrevive a `docker compose down`

---

## Requisitos

- [Docker](https://docs.docker.com/get-docker/) >= 24
- [Docker Compose](https://docs.docker.com/compose/) >= 2
- Git

---

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

```bash
cp .env.example .env
```

| Variable            | Descripción                        | Ejemplo      |
|---------------------|------------------------------------|--------------|
| `POSTGRES_USER`     | Usuario de PostgreSQL              | `admin`      |
| `POSTGRES_PASSWORD` | Contraseña de PostgreSQL           | `secret`     |
| `POSTGRES_DB`       | Nombre de la base de datos         | `appdb`      |
| `APP_PORT`          | Puerto expuesto en el host         | `3000`       |

> ⚠️ Nunca subas el archivo `.env` al repositorio. Está incluido en `.gitignore`.

---

## Cómo levantar el proyecto

```bash
# 1. Clonar el repositorio
git clone git@github.com:vichinho/docker-compose-node-postgres.git
cd docker-compose-node-postgres

# 2. Configurar variables de entorno
cp .env.example .env
# edita .env con tus valores

# 3. Levantar los servicios
docker compose up --build

# 4. Verificar que la app responde
curl http://localhost:3000
```

Respuesta esperada:
```
Conexión exitosa a PostgreSQL: 2025-01-01T00:00:00.000Z
```

---

## Comandos útiles

```bash
# Levantar en segundo plano
docker compose up -d --build

# Ver logs en tiempo real
docker compose logs -f

# Ver logs solo de la app
docker compose logs -f app

# Detener los servicios (preserva el volumen)
docker compose down

# Detener y eliminar el volumen (borra los datos)
docker compose down -v

# Ver estado de los contenedores
docker compose ps

# Conectarse directamente a PostgreSQL
docker exec -it postgres-dev psql -U $POSTGRES_USER -d $POSTGRES_DB
```

---

## Persistencia de datos

El volumen `pgdata` persiste los datos de PostgreSQL aunque se detenga o elimine el contenedor:

```bash
# Verificar que el volumen existe
docker volume ls | grep pgdata

# Inspeccionar el volumen
docker volume inspect docker-compose-node-postgres_pgdata
```

---

## Estructura del proyecto

```
docker-compose-node-postgres/
├── app/
│   ├── Dockerfile        # imagen de la app Node.js
│   ├── index.js          # servidor Express + conexión a PostgreSQL
│   └── package.json      # dependencias
├── .env.example          # plantilla de variables de entorno
├── .gitignore
├── docker-compose.yml    # orquestación de servicios
└── README.md
```

---

## Tecnologías

| Tecnología     | Versión  | Uso                        |
|----------------|----------|----------------------------|
| Node.js        | 18+      | Runtime de la aplicación   |
| Express        | 4.x      | Framework HTTP             |
| PostgreSQL      | 16       | Base de datos relacional   |
| Docker         | 24+      | Contenedores               |
| Docker Compose | 2.x      | Orquestación local         |

---

## Próximos pasos

- [ ] Agregar healthcheck al servicio `db`
- [ ] Implementar CI con GitHub Actions
- [ ] Agregar rutas REST básicas (CRUD)
- [ ] Despliegue en AWS EC2 o Railway
