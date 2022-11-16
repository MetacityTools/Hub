/*
  Warnings:

  - Added the required column `dataDir` to the `City` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "role" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_City" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "dataDir" TEXT NOT NULL
);
INSERT INTO "new_City" ("country", "id", "name") SELECT "country", "id", "name" FROM "City";
DROP TABLE "City";
ALTER TABLE "new_City" RENAME TO "City";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
