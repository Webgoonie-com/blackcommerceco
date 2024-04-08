/*
  Warnings:

  - You are about to drop the column `reservationId` on the `listing` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Account_userId_fkey` ON `account`;

-- DropIndex
DROP INDEX `Business_countryCityId_fkey` ON `business`;

-- DropIndex
DROP INDEX `Business_countryId_fkey` ON `business`;

-- DropIndex
DROP INDEX `Business_countryStateRegionId_fkey` ON `business`;

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
DROP INDEX `CountryCity_countryStateRegionId_fkey` ON `countrycity`;

-- DropIndex
DROP INDEX `CountryStateRegion_countryId_fkey` ON `countrystateregion`;

-- DropIndex
DROP INDEX `CountryTimezone_countryId_fkey` ON `countrytimezone`;

-- DropIndex
DROP INDEX `Favorite_listingId_fkey` ON `favorite`;

-- DropIndex
DROP INDEX `Favorite_userId_fkey` ON `favorite`;

-- DropIndex
DROP INDEX `Listing_userId_fkey` ON `listing`;

-- DropIndex
DROP INDEX `Property_countryCityId_fkey` ON `property`;

-- DropIndex
DROP INDEX `Property_countryId_fkey` ON `property`;

-- DropIndex
DROP INDEX `Property_countryStateRegionId_fkey` ON `property`;

-- DropIndex
DROP INDEX `Property_favoriteId_fkey` ON `property`;

-- DropIndex
DROP INDEX `Property_userId_fkey` ON `property`;

-- DropIndex
DROP INDEX `Propertyphoto_listingId_fkey` ON `propertyphoto`;

-- DropIndex
DROP INDEX `Propertyphoto_propertyId_fkey` ON `propertyphoto`;

-- DropIndex
DROP INDEX `Propertyphoto_userId_fkey` ON `propertyphoto`;

-- DropIndex
DROP INDEX `ReservationBusiness_businessId_fkey` ON `reservationbusiness`;

-- DropIndex
DROP INDEX `ReservationBusiness_listingId_fkey` ON `reservationbusiness`;

-- DropIndex
DROP INDEX `ReservationBusiness_userId_fkey` ON `reservationbusiness`;

-- DropIndex
DROP INDEX `ReservationProperty_listingId_fkey` ON `reservationproperty`;

-- DropIndex
DROP INDEX `ReservationProperty_propertyId_fkey` ON `reservationproperty`;

-- DropIndex
DROP INDEX `ReservationProperty_userId_fkey` ON `reservationproperty`;

-- DropIndex
DROP INDEX `UserPhoto_userId_fkey` ON `userphoto`;

-- AlterTable
ALTER TABLE `listing` DROP COLUMN `reservationId`;

-- CreateTable
CREATE TABLE `EmailSubscriber` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NULL,
    `emailsub` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `EmailSubscriber_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_listingId_fkey` FOREIGN KEY (`listingId`) REFERENCES `Listing`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservationBusiness` ADD CONSTRAINT `ReservationBusiness_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservationBusiness` ADD CONSTRAINT `ReservationBusiness_listingId_fkey` FOREIGN KEY (`listingId`) REFERENCES `Listing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservationBusiness` ADD CONSTRAINT `ReservationBusiness_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Listing` ADD CONSTRAINT `Listing_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Property` ADD CONSTRAINT `Property_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Property` ADD CONSTRAINT `Property_favoriteId_fkey` FOREIGN KEY (`favoriteId`) REFERENCES `Favorite`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE `ReservationProperty` ADD CONSTRAINT `ReservationProperty_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservationProperty` ADD CONSTRAINT `ReservationProperty_listingId_fkey` FOREIGN KEY (`listingId`) REFERENCES `Listing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservationProperty` ADD CONSTRAINT `ReservationProperty_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPhoto` ADD CONSTRAINT `UserPhoto_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BusinessToFavorite` ADD CONSTRAINT `_BusinessToFavorite_A_fkey` FOREIGN KEY (`A`) REFERENCES `Business`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BusinessToFavorite` ADD CONSTRAINT `_BusinessToFavorite_B_fkey` FOREIGN KEY (`B`) REFERENCES `Favorite`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE `_ListingToProperty` ADD CONSTRAINT `_ListingToProperty_A_fkey` FOREIGN KEY (`A`) REFERENCES `Listing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ListingToProperty` ADD CONSTRAINT `_ListingToProperty_B_fkey` FOREIGN KEY (`B`) REFERENCES `Property`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
