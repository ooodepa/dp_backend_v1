## Start DB

```
cp docker-compose.db-dev.env.example docker-compose.db-dev.env
yarn dev-db
```

Open phpMyAdmin: http://localhost:11112

## Start backend

```
cp dev.env.example dev.env
yarn
yarn dev-start
```

Open backend: http://localhost:11111

## Build

```
yarn
yarn build
```
