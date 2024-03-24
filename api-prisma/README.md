


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


```sh
    yarn init -y
    yarn add prisma -D
    npx prisma init
```

For Prisma up to date seeder file.
https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding

```sh

    npx prisma db seed
```

set up prisma schema


```sh

    generator client {
        provider = "prisma-client-js"
    }

    datasource db {
        provider = "mysql"
        url      = env("DATABASE_URL")
    }



    model User {  
        id                  Int                     @id @default(autoincrement())
        uuid                String                  @default(uuid()) 
        name                String? 
        email               String                  @unique
        emailVerified       DateTime? 
        image               String? 
        hashedPassword      String? 
        firstName           String? 
        lastName            String?
        updatedAt           DateTime                @default(now()) @updatedAt
        createdAt           DateTime                @default(now())
    }

```

```sh

 npx prisma db push

```

Starting the first migration

```sh

    yarn prisma migrate dev --name init

```

```sh

    yarn prisma migrate dev

```
