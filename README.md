# isr-swimming-app

## **Requirements**

- Docker
- npm
- PostgreSQL server

## **Local Deployment**

1. Copy environment variable example file, named env.example in src/config folder, as dev.env to config folder (inside src/config folder: cp env.example dev.env). Alternatively, rename env.example to dev.env.
2. Make sure to change DB connection string in .env file.
3. Execute provided script for init DB:
   - Windows: `win-dev-knex-init.bat`
   - Linux/Mac: `dev-knex-init.sh`
4. `npm i` for installing project dependencies.
5. Start server - `npm start`.
6. Alternatively, build docker image using the following cmd: `docker build -t isr-swimming-app .`
7. Run docker container: `docker run --network="host" -p 8585:8585 isr-swimming-app`

## **Database Architecture**

![alt text](characterization/db-arch.png?raw=true)
