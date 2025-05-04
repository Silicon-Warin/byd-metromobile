-- CreateTable
CREATE TABLE "CarModel" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "basePrice" INTEGER NOT NULL,
    "imageUrlPromo" TEXT NOT NULL,
    "imageUrlModel" TEXT NOT NULL,
    "imageWidth" INTEGER NOT NULL,
    "imageHeight" INTEGER NOT NULL,
    "featuresTitle" TEXT NOT NULL,
    "slug" TEXT,
    "tagline" TEXT,
    "imageUrlHero" TEXT,
    "imageUrlReal" TEXT,
    "imageUrlDataLeft" TEXT,
    "imageUrlDataRight" TEXT,
    "specialFeature" TEXT,
    "specialFeatureDescription" TEXT,
    "specialFeatureImage" TEXT,
    "specsOverview" JSONB,
    "promotion" TEXT[],
    "gallery" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "techSpecId" INTEGER,

    CONSTRAINT "CarModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarColor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "gradient" TEXT,
    "shadow" TEXT,
    "border" TEXT,
    "carModelId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CarColor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarFeature" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "carModelId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CarFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarVariant" (
    "id" SERIAL NOT NULL,
    "variantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "range" TEXT NOT NULL,
    "power" TEXT,
    "acceleration" TEXT,
    "carModelId" INTEGER NOT NULL,
    "techSpecId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CarVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HighlightSpec" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "carModelId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HighlightSpec_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechSpec" (
    "id" SERIAL NOT NULL,
    "specDetails" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TechSpec_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DimensionsWeight" (
    "id" TEXT NOT NULL,
    "length" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "wheelbase" INTEGER NOT NULL,
    "frontTrack" INTEGER,
    "rearTrack" INTEGER,
    "groundClearance" INTEGER,
    "unladenWeight" INTEGER,
    "grossWeight" INTEGER,
    "variantId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DimensionsWeight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PowertrainSystem" (
    "id" TEXT NOT NULL,
    "driveType" TEXT NOT NULL,
    "engineType" TEXT,
    "enginePower" INTEGER,
    "engineTorque" INTEGER,
    "frontMotorType" TEXT,
    "frontMotorPower" INTEGER,
    "frontMotorTorque" INTEGER,
    "rearMotorType" TEXT,
    "rearMotorPower" INTEGER,
    "rearMotorTorque" INTEGER,
    "totalSystemPower" INTEGER,
    "totalSystemTorque" INTEGER,
    "variantId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PowertrainSystem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Performance" (
    "id" TEXT NOT NULL,
    "acceleration0To100" DOUBLE PRECISION NOT NULL,
    "range" INTEGER NOT NULL,
    "topSpeed" INTEGER,
    "seatingCapacity" INTEGER NOT NULL,
    "variantId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Performance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Battery" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "capacity" DOUBLE PRECISION NOT NULL,
    "variantId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Battery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuspensionBraking" (
    "id" TEXT NOT NULL,
    "frontSuspension" TEXT NOT NULL,
    "rearSuspension" TEXT NOT NULL,
    "adaptiveSuspension" BOOLEAN NOT NULL,
    "frontBrakeType" TEXT NOT NULL,
    "rearBrakeType" TEXT NOT NULL,
    "frontBrakeSize" TEXT,
    "regenerativeBraking" BOOLEAN NOT NULL,
    "tireSize" TEXT NOT NULL,
    "variantId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SuspensionBraking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChargingSystem" (
    "id" TEXT NOT NULL,
    "acChargerType" TEXT,
    "acChargerPower" INTEGER,
    "dcChargerType1" TEXT,
    "dcChargerPower1" INTEGER,
    "dcChargerType2" TEXT,
    "dcChargerPower2" INTEGER,
    "v2lSupport" BOOLEAN NOT NULL,
    "v2lAdapter" BOOLEAN NOT NULL,
    "regenerativeBraking" BOOLEAN NOT NULL,
    "variantId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChargingSystem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SafetyFeatures" (
    "id" TEXT NOT NULL,
    "frontAirbags" BOOLEAN NOT NULL,
    "sideAirbags" BOOLEAN NOT NULL,
    "curtainAirbags" BOOLEAN NOT NULL,
    "kneeBolsterAirbags" BOOLEAN NOT NULL,
    "tirePressureMonitoring" BOOLEAN NOT NULL,
    "abs" BOOLEAN NOT NULL,
    "ebd" BOOLEAN NOT NULL,
    "esc" BOOLEAN NOT NULL,
    "tcs" BOOLEAN NOT NULL,
    "hillHoldControl" BOOLEAN NOT NULL,
    "autoHoldFunction" BOOLEAN NOT NULL,
    "aeb" BOOLEAN NOT NULL,
    "forwardCollisionWarning" BOOLEAN NOT NULL,
    "laneKeepAssist" BOOLEAN NOT NULL,
    "laneDepartureWarning" BOOLEAN NOT NULL,
    "blindSpotMonitoring" BOOLEAN NOT NULL,
    "rearCrossTrafficAlert" BOOLEAN NOT NULL,
    "adaptiveCruiseControl" BOOLEAN NOT NULL,
    "trafficSignRecognition" BOOLEAN NOT NULL,
    "driverAttentionMonitor" BOOLEAN NOT NULL,
    "frontParkingSensors" BOOLEAN NOT NULL,
    "rearParkingSensors" BOOLEAN NOT NULL,
    "surroundViewCamera" BOOLEAN NOT NULL,
    "automaticHeadlights" BOOLEAN NOT NULL,
    "highBeamAssist" BOOLEAN NOT NULL,
    "rainSensingWipers" BOOLEAN NOT NULL,
    "bhsSystem" BOOLEAN NOT NULL,
    "doorOpenWarningSystem" BOOLEAN NOT NULL,
    "intelligentHeadlights" BOOLEAN NOT NULL,
    "drivingAssistanceSystem" BOOLEAN NOT NULL,
    "headsUpDisplay" BOOLEAN NOT NULL,
    "intelligentTorqueControl" BOOLEAN NOT NULL,
    "rearCollisionWarning" BOOLEAN,
    "rearCrossTrafficBrake" BOOLEAN,
    "intelligentCruiseControl" BOOLEAN,
    "brakeDiscWiping" BOOLEAN,
    "curveSpeedControl" BOOLEAN,
    "rolloverMitigation" BOOLEAN,
    "variantId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SafetyFeatures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExteriorFeatures" (
    "id" TEXT NOT NULL,
    "panoramicGlassRoof" BOOLEAN NOT NULL,
    "electricSunroof" BOOLEAN NOT NULL,
    "rearWiperWithIntermittentFunction" BOOLEAN NOT NULL,
    "electricTailgate" BOOLEAN NOT NULL,
    "rearWindowHeatedWithTimer" BOOLEAN NOT NULL,
    "powerFoldingMirrors" BOOLEAN NOT NULL,
    "autoFoldingMirrors" BOOLEAN NOT NULL,
    "memoryPositionMirrors" BOOLEAN NOT NULL,
    "antiPinchWindowsWithOneTouchSystem" BOOLEAN NOT NULL,
    "frontRearParkingSensors" BOOLEAN NOT NULL,
    "heatedSideView" BOOLEAN NOT NULL,
    "roofRails" BOOLEAN,
    "remoteWindowOperation" BOOLEAN,
    "autoDimmingSideMirrors" BOOLEAN,
    "variantId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExteriorFeatures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InteriorFeatures" (
    "id" TEXT NOT NULL,
    "multiColorAmbientLighting" BOOLEAN NOT NULL,
    "leatherSyntheticSeats" BOOLEAN NOT NULL,
    "leatherSeats" BOOLEAN NOT NULL,
    "lcdDisplay10Inch" BOOLEAN NOT NULL,
    "centerConsoleStorage" BOOLEAN NOT NULL,
    "syntheticLeatherSteeringWheel" BOOLEAN NOT NULL,
    "leatherSteeringWheel" BOOLEAN NOT NULL,
    "eightWayPowerSeats" BOOLEAN NOT NULL,
    "backSeat4WayAdjustment" BOOLEAN NOT NULL,
    "frontSeatHeating" BOOLEAN NOT NULL,
    "ventilatedSeatsWithACSystem" BOOLEAN NOT NULL,
    "electricMemorySeatDrivers" BOOLEAN NOT NULL,
    "steeringWheelHeatedAndMemory" BOOLEAN NOT NULL,
    "twoWaySunshades" BOOLEAN NOT NULL,
    "adjustableRearHeadRests" BOOLEAN NOT NULL,
    "rearHeadRests2Way" BOOLEAN NOT NULL,
    "automaticDimmingRearviewMirror" BOOLEAN NOT NULL,
    "framelessRearviewMirror" BOOLEAN NOT NULL,
    "antiBurglaryDoorPillar" BOOLEAN NOT NULL,
    "frontIlluminatedVanityMirror" BOOLEAN NOT NULL,
    "rearArmrest" BOOLEAN,
    "foldableSecondRowSeats" BOOLEAN,
    "foldableThirdRowSeats" BOOLEAN,
    "variantId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InteriorFeatures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntertainmentFeatures" (
    "id" TEXT NOT NULL,
    "fmRadio" BOOLEAN NOT NULL,
    "appleCarPlayAndroid" BOOLEAN NOT NULL,
    "bluetoothConnectivity" BOOLEAN NOT NULL,
    "touchscreen15Inch" BOOLEAN NOT NULL,
    "dynAudio12Speakers" BOOLEAN NOT NULL,
    "thaiVoiceControl" BOOLEAN NOT NULL,
    "ambientTemperatureDisplay" BOOLEAN NOT NULL,
    "digitalRadio" BOOLEAN NOT NULL,
    "frontUsbTypeAC" BOOLEAN NOT NULL,
    "rearUsbTypeAC" BOOLEAN NOT NULL,
    "otaUpdateSupport" BOOLEAN NOT NULL,
    "speakerCount" INTEGER,
    "variantId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EntertainmentFeatures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LightingFeatures" (
    "id" TEXT NOT NULL,
    "ledHeadlights" BOOLEAN NOT NULL,
    "followMeHomeFunction" BOOLEAN NOT NULL,
    "ledDaytimeRunningLights" BOOLEAN NOT NULL,
    "ledTaillights" BOOLEAN NOT NULL,
    "rearFogLights" BOOLEAN NOT NULL,
    "sequentialRearTurnSignals" BOOLEAN NOT NULL,
    "thirdBrakeLights" BOOLEAN NOT NULL,
    "rgbDynamicMoodLights" BOOLEAN NOT NULL,
    "frontReadingLights" BOOLEAN NOT NULL,
    "rearReadingLights" BOOLEAN NOT NULL,
    "doorSillScuffPlates" BOOLEAN NOT NULL,
    "variantId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LightingFeatures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComfortFeatures" (
    "id" TEXT NOT NULL,
    "keylessEntry" BOOLEAN NOT NULL,
    "nfcCardKey" BOOLEAN NOT NULL,
    "wirelessPhoneChargers" BOOLEAN NOT NULL,
    "twelveVoltOutlet" BOOLEAN NOT NULL,
    "pm25AirFilter" BOOLEAN NOT NULL,
    "cn95AirFilter" BOOLEAN NOT NULL,
    "airIonizer" BOOLEAN NOT NULL,
    "dualZoneClimateControl" BOOLEAN NOT NULL,
    "rearAirVents" BOOLEAN NOT NULL,
    "firstAidKit" BOOLEAN NOT NULL,
    "emergencyKit" BOOLEAN NOT NULL,
    "bydDigitalKey" BOOLEAN,
    "rearArmrest" BOOLEAN,
    "foldableSecondRowSeats" BOOLEAN,
    "foldableThirdRowSeats" BOOLEAN,
    "variantId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ComfortFeatures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CarModel_slug_key" ON "CarModel"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "CarVariant_id_key" ON "CarVariant"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DimensionsWeight_variantId_key" ON "DimensionsWeight"("variantId");

-- CreateIndex
CREATE UNIQUE INDEX "PowertrainSystem_variantId_key" ON "PowertrainSystem"("variantId");

-- CreateIndex
CREATE UNIQUE INDEX "Performance_variantId_key" ON "Performance"("variantId");

-- CreateIndex
CREATE UNIQUE INDEX "Battery_variantId_key" ON "Battery"("variantId");

-- CreateIndex
CREATE UNIQUE INDEX "SuspensionBraking_variantId_key" ON "SuspensionBraking"("variantId");

-- CreateIndex
CREATE UNIQUE INDEX "ChargingSystem_variantId_key" ON "ChargingSystem"("variantId");

-- CreateIndex
CREATE UNIQUE INDEX "SafetyFeatures_variantId_key" ON "SafetyFeatures"("variantId");

-- CreateIndex
CREATE UNIQUE INDEX "ExteriorFeatures_variantId_key" ON "ExteriorFeatures"("variantId");

-- CreateIndex
CREATE UNIQUE INDEX "InteriorFeatures_variantId_key" ON "InteriorFeatures"("variantId");

-- CreateIndex
CREATE UNIQUE INDEX "EntertainmentFeatures_variantId_key" ON "EntertainmentFeatures"("variantId");

-- CreateIndex
CREATE UNIQUE INDEX "LightingFeatures_variantId_key" ON "LightingFeatures"("variantId");

-- CreateIndex
CREATE UNIQUE INDEX "ComfortFeatures_variantId_key" ON "ComfortFeatures"("variantId");

-- AddForeignKey
ALTER TABLE "CarModel" ADD CONSTRAINT "CarModel_techSpecId_fkey" FOREIGN KEY ("techSpecId") REFERENCES "TechSpec"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarColor" ADD CONSTRAINT "CarColor_carModelId_fkey" FOREIGN KEY ("carModelId") REFERENCES "CarModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarFeature" ADD CONSTRAINT "CarFeature_carModelId_fkey" FOREIGN KEY ("carModelId") REFERENCES "CarModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarVariant" ADD CONSTRAINT "CarVariant_carModelId_fkey" FOREIGN KEY ("carModelId") REFERENCES "CarModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarVariant" ADD CONSTRAINT "CarVariant_techSpecId_fkey" FOREIGN KEY ("techSpecId") REFERENCES "TechSpec"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HighlightSpec" ADD CONSTRAINT "HighlightSpec_carModelId_fkey" FOREIGN KEY ("carModelId") REFERENCES "CarModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DimensionsWeight" ADD CONSTRAINT "DimensionsWeight_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "CarVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PowertrainSystem" ADD CONSTRAINT "PowertrainSystem_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "CarVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "CarVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Battery" ADD CONSTRAINT "Battery_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "CarVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuspensionBraking" ADD CONSTRAINT "SuspensionBraking_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "CarVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChargingSystem" ADD CONSTRAINT "ChargingSystem_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "CarVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SafetyFeatures" ADD CONSTRAINT "SafetyFeatures_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "CarVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExteriorFeatures" ADD CONSTRAINT "ExteriorFeatures_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "CarVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InteriorFeatures" ADD CONSTRAINT "InteriorFeatures_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "CarVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntertainmentFeatures" ADD CONSTRAINT "EntertainmentFeatures_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "CarVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LightingFeatures" ADD CONSTRAINT "LightingFeatures_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "CarVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComfortFeatures" ADD CONSTRAINT "ComfortFeatures_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "CarVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
