/*
  Warnings:

  - You are about to drop the column `email` on the `aluno` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `aluno_email_key` ON `aluno`;

-- AlterTable
ALTER TABLE `aluno` DROP COLUMN `email`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
