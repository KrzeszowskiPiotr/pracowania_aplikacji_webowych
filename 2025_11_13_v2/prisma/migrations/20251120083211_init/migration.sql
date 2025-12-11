-- CreateTable
CREATE TABLE `Wpis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tytul` VARCHAR(191) NOT NULL,
    `tresc` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `kategoriaID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kategoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nazwa` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Kategoria_nazwa_key`(`nazwa`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Komentarz` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tresc` VARCHAR(191) NOT NULL,
    `autor` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `wpisID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Wpis` ADD CONSTRAINT `Wpis_kategoriaID_fkey` FOREIGN KEY (`kategoriaID`) REFERENCES `Kategoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Komentarz` ADD CONSTRAINT `Komentarz_wpisID_fkey` FOREIGN KEY (`wpisID`) REFERENCES `Wpis`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
