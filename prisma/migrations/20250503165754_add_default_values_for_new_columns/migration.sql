/*
 Warnings:
 
 - Added the required column `bydDigitalKey` to the `ComfortFeatures` table without a default value. This is not possible if the table is not empty.
 - Added the required column `rearCollisionWarning` to the `SafetyFeatures` table without a default value. This is not possible if the table is not empty.
 
 */
-- AlterTable
ALTER TABLE "ComfortFeatures"
ADD COLUMN "bydDigitalKey" BOOLEAN NOT NULL DEFAULT false;
-- AlterTable
ALTER TABLE "EntertainmentFeatures"
ADD COLUMN "speakerCount" INTEGER;
-- AlterTable
ALTER TABLE "ExteriorFeatures"
ADD COLUMN "autoDimmingSideMirrors" BOOLEAN,
  ADD COLUMN "remoteWindowOperation" BOOLEAN,
  ADD COLUMN "roofRails" BOOLEAN;
-- AlterTable
ALTER TABLE "SafetyFeatures"
ADD COLUMN "brakeDiscWiping" BOOLEAN,
  ADD COLUMN "curveSpeedControl" BOOLEAN,
  ADD COLUMN "intelligentCruiseControl" BOOLEAN,
  ADD COLUMN "rearCollisionWarning" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "rearCrossTrafficBrake" BOOLEAN,
  ADD COLUMN "rolloverMitigation" BOOLEAN;
