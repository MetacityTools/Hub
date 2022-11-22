/*
  Warnings:

  - You are about to drop the column `data` on the `Dataset` table. All the data in the column will be lost.
  - Added the required column `storage` to the `Dataset` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Dataset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "cityId" INTEGER NOT NULL,
    "storage" TEXT NOT NULL,
    CONSTRAINT "Dataset_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Dataset" ("cityId", "id", "name") SELECT "cityId", "id", "name" FROM "Dataset";
DROP TABLE "Dataset";
ALTER TABLE "new_Dataset" RENAME TO "Dataset";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
