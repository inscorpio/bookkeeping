/*
  Warnings:

  - Added the required column `amount` to the `WalletAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `WalletAccount` ADD COLUMN `amount` DECIMAL(65, 30) NOT NULL;
