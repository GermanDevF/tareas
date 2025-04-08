-- DropForeignKey
ALTER TABLE `groups` DROP FOREIGN KEY `groups_ownerId_fkey`;

-- DropIndex
DROP INDEX `groups_ownerId_fkey` ON `groups`;

-- AlterTable
ALTER TABLE `groups` MODIFY `ownerId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `tipos_de_tarea` MODIFY `color` VARCHAR(191) NOT NULL DEFAULT '#808080';

-- AddForeignKey
ALTER TABLE `groups` ADD CONSTRAINT `groups_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
