CREATE TABLE cakes (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL,
        price NUMERIC NOT NULL,
        image VARCHAR NOT NULL,
        description TEXT NOT NULL
);

CREATE TABLE clients (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL,
        address VARCHAR NOT NULL,
        phone VARCHAR NOT NULL
);

CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        "clientId" INTEGER NOT NULL,
        "cakeId" INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    "totalPrice" NUMERIC NOT NULL
);