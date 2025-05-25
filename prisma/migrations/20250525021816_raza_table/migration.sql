-- CreateTable
CREATE TABLE `Raza` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `especieId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Raza_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Raza` ADD CONSTRAINT `Raza_especieId_fkey` FOREIGN KEY (`especieId`) REFERENCES `Especie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
