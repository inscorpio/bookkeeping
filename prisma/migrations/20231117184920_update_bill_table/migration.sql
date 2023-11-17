/*
  Warnings:

  - Added the required column `walletAccountId` to the `Bill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Bill` ADD COLUMN `walletAccountId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Bill` ADD CONSTRAINT `Bill_walletAccountId_fkey` FOREIGN KEY (`walletAccountId`) REFERENCES `WalletAccount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
