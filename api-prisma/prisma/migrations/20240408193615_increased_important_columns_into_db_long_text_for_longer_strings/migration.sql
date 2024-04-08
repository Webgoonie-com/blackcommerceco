/*
  Warnings:

  - You are about to alter the column `totalPrice` on the `reservationproperty` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.

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
ALTER TABLE `admin` MODIFY `image` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `business` MODIFY `imageSrc` LONGTEXT NULL,
    MODIFY `imagesMultiSrc` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `businessphoto` MODIFY `imageSrc` LONGTEXT NOT NULL,
    MODIFY `imgUrl` LONGTEXT NOT NULL,
    MODIFY `imgFileOutputDir` LONGTEXT NOT NULL,
    MODIFY `imagesMultiSrc` LONGTEXT NOT NULL,
    MODIFY `imgFilePath` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `property` MODIFY `description` LONGTEXT NOT NULL,
    MODIFY `imageSrc` LONGTEXT NULL,
    MODIFY `imagesMultiSrc` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `propertyphoto` MODIFY `imageSrc` LONGTEXT NOT NULL,
    MODIFY `imgUrl` LONGTEXT NOT NULL,
    MODIFY `imgFileOutputDir` LONGTEXT NOT NULL,
    MODIFY `imgFilePath` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `reservationproperty` MODIFY `totalPrice` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `image` LONGTEXT NULL,
    MODIFY `favoriteBapUuids` LONGTEXT NULL,
    MODIFY `favoriteBbUuids` LONGTEXT NULL;

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
ALTER TABLE `reservationProperty` ADD CONSTRAINT `reservationProperty_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservationProperty` ADD CONSTRAINT `reservationProperty_listingId_fkey` FOREIGN KEY (`listingId`) REFERENCES `Listing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservationProperty` ADD CONSTRAINT `reservationProperty_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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

-- RenameIndex
ALTER TABLE `reservationproperty` RENAME INDEX `ReservationProperty_uuid_key` TO `reservationProperty_uuid_key`;
