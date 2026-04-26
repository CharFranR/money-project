-- CreateTable
CREATE TABLE "Moneda" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "codigo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Conversion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "montoOriginal" REAL NOT NULL,
    "montoConvertido" REAL NOT NULL,
    "tasa" REAL NOT NULL,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "monedaOrigenId" INTEGER NOT NULL,
    "monedaDestinoId" INTEGER NOT NULL,
    CONSTRAINT "Conversion_monedaOrigenId_fkey" FOREIGN KEY ("monedaOrigenId") REFERENCES "Moneda" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Conversion_monedaDestinoId_fkey" FOREIGN KEY ("monedaDestinoId") REFERENCES "Moneda" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Moneda_codigo_key" ON "Moneda"("codigo");
