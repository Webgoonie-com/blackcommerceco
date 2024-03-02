


## API Prisma Setup

```sh
     yarn add express dotenv cors express-validator @prisma/client
```


```sh
    yarn add typescript @types/node @types/node @types/express @types/dotenv @types/cors
```

```sh
    yarn add ts-node-dev -D
```

Set This up on the package.json under scripts.  On package.json

```sh
    "dev": "tsnd --respawn --pretty --transpile-only ./src/index.ts"
```