/*
  Warnings:

  - You are about to drop the column `dataDir` on the `City` table. All the data in the column will be lost.
  - Added the required column `storage` to the `City` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_City" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "storage" TEXT NOT NULL
);
INSERT INTO "new_City" ("id", "name") SELECT "id", "name" FROM "City";
DROP TABLE "City";
ALTER TABLE "new_City" RENAME TO "City";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
