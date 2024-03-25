/*
  Warnings:

  - You are about to drop the column `cityinfo` on the `business` table. All the data in the column will be lost.
  - You are about to drop the column `localinfo` on the `business` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `business` table. All the data in the column will be lost.
  - You are about to drop the column `newStateCodeInfo` on the `business` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `business` table. All the data in the column will be lost.
  - You are about to alter the column `isAFranchise` on the `business` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.
  - You are about to alter the column `isTheFranchiseParent` on the `business` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.
  - You are about to alter the column `ownsOtherBusinesses` on the `business` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.
  - You are about to drop the column `guestCount` on the `businessphoto` table. All the data in the column will be lost.
  - You are about to drop the column `locationValue` on the `businessphoto` table. All the data in the column will be lost.
  - You are about to drop the column `isoCode` on the `countrycity` table. All the data in the column will be lost.
  - You are about to drop the column `countryCityId` on the `countrystateregion` table. All the data in the column will be lost.
  - You are about to drop the column `timezone` on the `countrytimezone` table. All the data in the column will be lost.
  - You are about to drop the column `bathroomCount` on the `listing` table. All the data in the column will be lost.
  - You are about to drop the column `guestCount` on the `listing` table. All the data in the column will be lost.
  - You are about to drop the column `locationValue` on the `listing` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `listing` table. All the data in the column will be lost.
  - You are about to drop the column `roomCount` on the `listing` table. All the data in the column will be lost.
  - You are about to drop the `reservation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[token]` on the table `Business` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[listingId]` on the table `Business` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `Country` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `CountryCity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `CountryStateRegion` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `countryCityId` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryId` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryStateRegionId` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagesMultiSrc` to the `Businessphoto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgFilePath` to the `Businessphoto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `Businessphoto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flag` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latlng` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phonecode` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryCode` to the `CountryCity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryStateRegionId` to the `CountryCity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `CountryCity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latlng` to the `CountryCity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `CountryCity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `CountryStateRegion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latlng` to the `CountryStateRegion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `CountryStateRegion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryTimezone` to the `CountryTimezone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `Propertyphoto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `UserPhoto` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Account_userId_fkey` ON `account`;

-- DropIndex
DROP INDEX `Business_userId_fkey` ON `business`;

-- DropIndex
DROP INDEX `Businessphoto_businessId_fkey` ON `businessphoto`;

-- DropIndex
DROP INDEX `Businessphoto_listingId_fkey` ON `businessphoto`;

-- DropIndex
DROP INDEX `Businessphoto_userId_fkey` ON `businessphoto`;

-- DropIndex
DROP INDEX `CountryCity_countryId_fkey` ON `countrycity`;

-- DropIndex
DROP INDEX `CountryStateRegion_countryCityId_fkey` ON `countrystateregion`;

-- DropIndex
DROP INDEX `CountryStateRegion_countryId_fkey` ON `countrystateregion`;

-- DropIndex
DROP INDEX `CountryTimezone_countryId_fkey` ON `countrytimezone`;

-- DropIndex
DROP INDEX `Favorite_businessId_fkey` ON `favorite`;

-- DropIndex
DROP INDEX `Favorite_propertyId_fkey` ON `favorite`;

-- DropIndex
DROP INDEX `Favorite_userId_fkey` ON `favorite`;

-- DropIndex
DROP INDEX `Listing_countryCityId_fkey` ON `listing`;

-- DropIndex
DROP INDEX `Listing_countryId_fkey` ON `listing`;

-- DropIndex
DROP INDEX `Listing_countryStateRegionId_fkey` ON `listing`;

-- DropIndex
DROP INDEX `Listing_userId_fkey` ON `listing`;

-- DropIndex
DROP INDEX `Property_countryCityId_fkey` ON `property`;

-- DropIndex
DROP INDEX `Property_countryId_fkey` ON `property`;

-- DropIndex
DROP INDEX `Property_countryStateRegionId_fkey` ON `property`;

-- DropIndex
DROP INDEX `Property_userId_fkey` ON `property`;

-- DropIndex
DROP INDEX `Propertyphoto_listingId_fkey` ON `propertyphoto`;

-- DropIndex
DROP INDEX `Propertyphoto_propertyId_fkey` ON `propertyphoto`;

-- DropIndex
DROP INDEX `Propertyphoto_userId_fkey` ON `propertyphoto`;

-- DropIndex
DROP INDEX `UserPhoto_userId_fkey` ON `userphoto`;

-- AlterTable
ALTER TABLE `business` DROP COLUMN `cityinfo`,
    DROP COLUMN `localinfo`,
    DROP COLUMN `location`,
    DROP COLUMN `newStateCodeInfo`,
    DROP COLUMN `price`,
    ADD COLUMN `countryCityId` INTEGER NOT NULL,
    ADD COLUMN `countryId` INTEGER NOT NULL,
    ADD COLUMN `countryStateRegionId` INTEGER NOT NULL,
    ADD COLUMN `imagesMultiSrc` VARCHAR(1000) NULL,
    ADD COLUMN `listingId` INTEGER NULL,
    ADD COLUMN `sellPrice` VARCHAR(191) NULL,
    ADD COLUMN `streetAddress` VARCHAR(191) NULL,
    ADD COLUMN `streetAddress2` VARCHAR(191) NULL,
    ADD COLUMN `streetCity` VARCHAR(191) NULL,
    ADD COLUMN `streetZipCode` VARCHAR(191) NULL,
    ADD COLUMN `token` VARCHAR(191) NOT NULL,
    MODIFY `isAFranchise` BOOLEAN NOT NULL,
    MODIFY `isTheFranchiseParent` BOOLEAN NOT NULL,
    MODIFY `ownsOtherBusinesses` BOOLEAN NOT NULL,
    MODIFY `locationValue` VARCHAR(191) NULL,
    MODIFY `imageSrc` VARCHAR(1000) NULL;

-- AlterTable
ALTER TABLE `businessphoto` DROP COLUMN `guestCount`,
    DROP COLUMN `locationValue`,
    ADD COLUMN `imagesMultiSrc` VARCHAR(191) NOT NULL,
    ADD COLUMN `imgFilePath` VARCHAR(191) NOT NULL,
    ADD COLUMN `token` VARCHAR(191) NOT NULL,
    MODIFY `imgFileName` VARCHAR(191) NOT NULL,
    MODIFY `imgFileOutputDir` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `country` ADD COLUMN `currency` VARCHAR(191) NOT NULL,
    ADD COLUMN `flag` VARCHAR(191) NOT NULL,
    ADD COLUMN `label` VARCHAR(191) NOT NULL,
    ADD COLUMN `latitude` VARCHAR(191) NOT NULL,
    ADD COLUMN `latlng` VARCHAR(191) NOT NULL,
    ADD COLUMN `longitude` VARCHAR(191) NOT NULL,
    ADD COLUMN `phonecode` VARCHAR(191) NOT NULL,
    ADD COLUMN `region` VARCHAR(191) NOT NULL,
    ADD COLUMN `uuid` VARCHAR(191) NULL,
    ADD COLUMN `value` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `countrycity` DROP COLUMN `isoCode`,
    ADD COLUMN `countryCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `countryStateRegionId` INTEGER NOT NULL,
    ADD COLUMN `label` VARCHAR(191) NOT NULL,
    ADD COLUMN `latlng` VARCHAR(191) NOT NULL,
    ADD COLUMN `uuid` VARCHAR(191) NULL,
    ADD COLUMN `value` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `countrystateregion` DROP COLUMN `countryCityId`,
    ADD COLUMN `label` VARCHAR(191) NOT NULL,
    ADD COLUMN `latlng` VARCHAR(191) NOT NULL,
    ADD COLUMN `uuid` VARCHAR(191) NULL,
    ADD COLUMN `value` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `countrytimezone` DROP COLUMN `timezone`,
    ADD COLUMN `countryTimezone` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `listing` DROP COLUMN `bathroomCount`,
    DROP COLUMN `guestCount`,
    DROP COLUMN `locationValue`,
    DROP COLUMN `price`,
    DROP COLUMN `roomCount`,
    ADD COLUMN `businessId` INTEGER NULL,
    ADD COLUMN `propertyId` INTEGER NULL,
    ADD COLUMN `reservationId` INTEGER NULL,
    ADD COLUMN `token` VARCHAR(191) NOT NULL,
    MODIFY `imageSrc` VARCHAR(191) NULL,
    MODIFY `countryStateRegionId` INTEGER NULL,
    MODIFY `countryCityId` INTEGER NULL;

-- AlterTable
ALTER TABLE `property` ADD COLUMN `imagesMultiSrc` VARCHAR(1000) NULL,
    ADD COLUMN `streetAddress` VARCHAR(191) NULL,
    ADD COLUMN `streetAddress2` VARCHAR(191) NULL,
    ADD COLUMN `streetCity` VARCHAR(191) NULL,
    ADD COLUMN `streetZipCode` VARCHAR(191) NULL,
    ADD COLUMN `token` VARCHAR(191) NOT NULL,
    MODIFY `imageSrc` VARCHAR(1000) NULL;

-- AlterTable
ALTER TABLE `propertyphoto` ADD COLUMN `token` VARCHAR(191) NOT NULL,
    MODIFY `propertyId` INTEGER NULL;

-- AlterTable
ALTER TABLE `userphoto` ADD COLUMN `token` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `reservation`;

-- CreateTable
CREATE TABLE `ReservationBusiness` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `totalPrice` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NOT NULL,
    `listingId` INTEGER NOT NULL,
    `businessId` INTEGER NOT NULL,

    UNIQUE INDEX `ReservationBusiness_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReservationProperty` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `totalPrice` DECIMAL(10, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NOT NULL,
    `listingId` INTEGER NOT NULL,
    `propertyId` INTEGER NOT NULL,

    UNIQUE INDEX `ReservationProperty_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TimeZone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `offset` VARCHAR(191) NOT NULL,
    `abbreviation` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TimeZone_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_BusinessToListing` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_BusinessToListing_AB_unique`(`A`, `B`),
    INDEX `_BusinessToListing_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CountryToListing` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CountryToListing_AB_unique`(`A`, `B`),
    INDEX `_CountryToListing_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CountryStateRegionToListing` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CountryStateRegionToListing_AB_unique`(`A`, `B`),
    INDEX `_CountryStateRegionToListing_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CountryCityToListing` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CountryCityToListing_AB_unique`(`A`, `B`),
    INDEX `_CountryCityToListing_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ListingToProperty` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ListingToProperty_AB_unique`(`A`, `B`),
    INDEX `_ListingToProperty_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Business_token_key` ON `Business`(`token`);

-- CreateIndex
CREATE UNIQUE INDEX `Business_listingId_key` ON `Business`(`listingId`);

-- CreateIndex
CREATE UNIQUE INDEX `Country_uuid_key` ON `Country`(`uuid`);

-- CreateIndex
CREATE UNIQUE INDEX `CountryCity_uuid_key` ON `CountryCity`(`uuid`);

-- CreateIndex
CREATE UNIQUE INDEX `CountryStateRegion_uuid_key` ON `CountryStateRegion`(`uuid`);

-- CreateIndex
CREATE UNIQUE INDEX `Property_token_key` ON `Property`(`token`);

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Business` ADD CONSTRAINT `Business_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Business` ADD CONSTRAINT `Business_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Business` ADD CONSTRAINT `Business_countryStateRegionId_fkey` FOREIGN KEY (`countryStateRegionId`) REFERENCES `CountryStateRegion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Business` ADD CONSTRAINT `Business_countryCityId_fkey` FOREIGN KEY (`countryCityId`) REFERENCES `CountryCity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Businessphoto` ADD CONSTRAINT `Businessphoto_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Businessphoto` ADD CONSTRAINT `Businessphoto_listingId_fkey` FOREIGN KEY (`listingId`) REFERENCES `Listing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Businessphoto` ADD CONSTRAINT `Businessphoto_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CountryStateRegion` ADD CONSTRAINT `CountryStateRegion_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CountryCity` ADD CONSTRAINT `CountryCity_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CountryCity` ADD CONSTRAINT `CountryCity_countryStateRegionId_fkey` FOREIGN KEY (`countryStateRegionId`) REFERENCES `CountryStateRegion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CountryTimezone` ADD CONSTRAINT `CountryTimezone_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservationBusiness` ADD CONSTRAINT `ReservationBusiness_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservationBusiness` ADD CONSTRAINT `ReservationBusiness_listingId_fkey` FOREIGN KEY (`listingId`) REFERENCES `Listing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservationBusiness` ADD CONSTRAINT `ReservationBusiness_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservationProperty` ADD CONSTRAINT `ReservationProperty_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservationProperty` ADD CONSTRAINT `ReservationProperty_listingId_fkey` FOREIGN KEY (`listingId`) REFERENCES `Listing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservationProperty` ADD CONSTRAINT `ReservationProperty_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPhoto` ADD CONSTRAINT `UserPhoto_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Listing` ADD CONSTRAINT `Listing_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Property` ADD CONSTRAINT `Property_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Property` ADD CONSTRAINT `Property_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Property` ADD CONSTRAINT `Property_countryStateRegionId_fkey` FOREIGN KEY (`countryStateRegionId`) REFERENCES `CountryStateRegion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Property` ADD CONSTRAINT `Property_countryCityId_fkey` FOREIGN KEY (`countryCityId`) REFERENCES `CountryCity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Propertyphoto` ADD CONSTRAINT `Propertyphoto_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Propertyphoto` ADD CONSTRAINT `Propertyphoto_listingId_fkey` FOREIGN KEY (`listingId`) REFERENCES `Listing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Propertyphoto` ADD CONSTRAINT `Propertyphoto_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BusinessToListing` ADD CONSTRAINT `_BusinessToListing_A_fkey` FOREIGN KEY (`A`) REFERENCES `Business`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BusinessToListing` ADD CONSTRAINT `_BusinessToListing_B_fkey` FOREIGN KEY (`B`) REFERENCES `Listing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CountryToListing` ADD CONSTRAINT `_CountryToListing_A_fkey` FOREIGN KEY (`A`) REFERENCES `Country`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CountryToListing` ADD CONSTRAINT `_CountryToListing_B_fkey` FOREIGN KEY (`B`) REFERENCES `Listing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CountryStateRegionToListing` ADD CONSTRAINT `_CountryStateRegionToListing_A_fkey` FOREIGN KEY (`A`) REFERENCES `CountryStateRegion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CountryStateRegionToListing` ADD CONSTRAINT `_CountryStateRegionToListing_B_fkey` FOREIGN KEY (`B`) REFERENCES `Listing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CountryCityToListing` ADD CONSTRAINT `_CountryCityToListing_A_fkey` FOREIGN KEY (`A`) REFERENCES `CountryCity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CountryCityToListing` ADD CONSTRAINT `_CountryCityToListing_B_fkey` FOREIGN KEY (`B`) REFERENCES `Listing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FavoriteToListing` ADD CONSTRAINT `_FavoriteToListing_A_fkey` FOREIGN KEY (`A`) REFERENCES `Favorite`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FavoriteToListing` ADD CONSTRAINT `_FavoriteToListing_B_fkey` FOREIGN KEY (`B`) REFERENCES `Listing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ListingToProperty` ADD CONSTRAINT `_ListingToProperty_A_fkey` FOREIGN KEY (`A`) REFERENCES `Listing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ListingToProperty` ADD CONSTRAINT `_ListingToProperty_B_fkey` FOREIGN KEY (`B`) REFERENCES `Property`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
