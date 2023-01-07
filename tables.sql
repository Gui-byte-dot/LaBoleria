CREATE TABLE cakes (
   “id” serial NOT NULL PRIMARY KEY,
   “name” varchar NOT NULL UNIQUE,
    “price” numeric NOT NULL,
    “image” varchar NOT NULL,
    “description” TEXT NOT NULL

);
CREATE TABLE clients (
   “id” serial NOT NULL  PRIMARY KEY,
   “name” varchar NOT NULL,
   “address” varchar NOT NULL, 
   “phone” varchar NOT NULL
);
CREATE TABLE orders (
	"id" SERIAL PRIMARY KEY,
	"clientId" INTEGER NOT NULL,
 	"cakeId" INTEGER NOT NULL,
	"quantity" INTEGER NOT NULL,
	"createdAt" TIMESTAMP NOT NULL,
	"totalPrice" NUMERIC NOT NULL, 

	CONSTRAINT "FK_CLIENT" FOREIGN KEY ("clientId")
		REFERENCES clients("id")
		ON DELETE CASCADE,
	CONSTRAINT "FK_CAKE" FOREIGN KEY ("cakeId")
		REFERENCES cakes("id")
		ON DELETE CASCADE

);