import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedSealion7() {
  console.log('Seeding BYD SEALION 7 data...');

  // สร้างข้อมูลพื้นฐานของรถ
  const SEALION7_MODEL = await prisma.carModel.create({
    data: {
      model: "BYD SEALION 7",
      slug: "byd-sealion7",
      tagline: "SUV ไฟฟ้าดีไซน์สปอร์ต สมรรถนะเหนือระดับ",
      description: "SUV ไฟฟ้าขนาดกลาง ดีไซน์สปอร์ตล้ำสมัย พร้อมเทคโนโลยี Cell-to-Body และสมรรถนะที่เร้าใจ",
      basePrice: 1699900,
      imageUrlPromo: "/images/cars/sealion7/sealion7-promo.webp",
      imageUrlModel: "/images/cars/sealion7/sealion7-model.webp",
      imageWidth: 1200,
      imageHeight: 800,
      featuresTitle: "เทคโนโลยีและดีไซน์เพื่ออนาคต",
      promotion: [
        "ประกันภัยชั้น 1 พร้อม พรบ. ระยะเวลา 1 ปี",
        "บริการช่วยเหลือฉุกเฉิน ตลอด 24 ชั่วโมง 8 ปีเต็ม",
        "รับประกันตัวรถ (WARRANTY) 8 ปี หรือ 160,000 กม.",
        "รับประกันแบตเตอรี่ 8 ปี หรือ 160,000 กม.",
        "สายต่อพ่วงอุปกรณ์ไฟฟ้า (V2L)",
        "สายชาร์จเคลื่อนที่ AC Portable Charger",
        "พรมเข้ารูป",
        "กรอบป้ายทะเบียน",
        "ฟิล์มหน้าจอ",
        "ค่าจดทะเบียนรถ",
        "Home Charger พร้อมค่าติดตั้ง (ตามเงื่อนไขบริษัท)"
      ],
      gallery: [
        "/images/cars/sealion7/gallery/1.webp",
        "/images/cars/sealion7/gallery/2.webp",
        "/images/cars/sealion7/gallery/3.webp",
      ],
    }
  });
  console.log('Created BYD SEALION 7 model');

  // เพิ่มสีรถ
  await seedSealion7Colors(SEALION7_MODEL.id);

  // สร้างรุ่นย่อย
  const variants = await seedSealion7Variants(SEALION7_MODEL.id);

  // เพิ่มข้อมูลสเปคทางเทคนิค
  await Promise.all([
    seedSealion7Dimensions(variants),
    seedSealion7Powertrain(variants),
    seedSealion7Performance(variants),
    seedSealion7Battery(variants),
    seedSealion7Suspension(variants),
    seedSealion7Charging(variants),
    seedSealion7Safety(variants),
    seedSealion7Exterior(variants),
    seedSealion7Interior(variants),
    seedSealion7Entertainment(variants),
    seedSealion7Lighting(variants),
    seedSealion7Comfort(variants),
  ]);

  console.log('BYD SEALION 7 data seeded successfully!');
  return SEALION7_MODEL;
}

// ฟังก์ชันเพิ่มสีรถ
async function seedSealion7Colors(carModelId: number) {
  const colors = [
    {
      name: "Aurora White",
      code: "#FFFFFF",
      image: "/images/cars/sealion7/colors/aurora-white.webp",
      gradient: "linear-gradient(180deg, #FFFFFF 0%, #F0F0F0 100%)",
      shadow: "#DEDEDE",
      border: "#EBEBEB",
    },
    {
      name: "Cosmos Black",
      code: "#000000",
      image: "/images/cars/sealion7/colors/cosmos-black.webp",
      gradient: "linear-gradient(180deg, #333333 0%, #000000 100%)",
      shadow: "#000000",
      border: "#222222",
    },
    {
      name: "Azure Blue",
      code: "#2C5C8F",
      image: "/images/cars/sealion7/colors/azure-blue.webp",
      gradient: "linear-gradient(145deg, #2C5C8F, #1D3D5F)",
      shadow: "#18324E",
      border: "#254D76",
    },
    {
      name: "Lunar Grey",
      code: "#808080",
      image: "/images/cars/sealion7/colors/lunar-grey.webp",
      gradient: "linear-gradient(180deg, #8A8A8A 0%, #707070 100%)",
      shadow: "#606060",
      border: "#7A7A7A",
    },
  ];

  const colorPromises = colors.map(color =>
    prisma.carColor.create({ data: { ...color, carModelId } })
  );
  await Promise.all(colorPromises);
  console.log('SEALION 7 colors seeded');
}

// ฟังก์ชันสร้างรุ่นย่อย
async function seedSealion7Variants(carModelId: number) {
  const premiumVariant = await prisma.carVariant.create({
    data: {
      variantId: "SEALION7-PREMIUM",
      name: "Premium RWD",
      price: 1699900,
      range: "550 กม. (CLTC)",
      power: "230 กิโลวัตต์",
      acceleration: "6.7 วินาที",
      carModelId,
    },
  });

  const awdVariant = await prisma.carVariant.create({
    data: {
      variantId: "SEALION7-AWD",
      name: "AWD Performance",
      price: 1899900,
      range: "500 กม. (CLTC)",
      power: "390 กิโลวัตต์ (รวม)",
      acceleration: "4.5 วินาที",
      carModelId,
    },
  });

  console.log('SEALION 7 variants seeded');
  return { premium: premiumVariant, awd: awdVariant };
}

// Helper type for variants
type Seal7Variants = {
  premium: { id: number };
  awd: { id: number };
};

// ฟังก์ชันเพิ่มข้อมูลขนาดและน้ำหนัก
async function seedSealion7Dimensions(variants: Seal7Variants) {
  const dimensionBase = {
    length: 4830,
    width: 1925,
    height: 1620,
    wheelbase: 2930,
    frontTrack: 1660,
    rearTrack: 1660,
    groundClearance: 160,
  };
  const dimensions = [
    { ...dimensionBase, unladenWeight: 2195, variantId: variants.premium.id },
    { ...dimensionBase, unladenWeight: 2310, variantId: variants.awd.id },
  ];
  await Promise.all(dimensions.map(dim => prisma.dimensionsWeight.create({ data: dim })));
  console.log('SEALION 7 dimensions seeded');
}

// ฟังก์ชันเพิ่มข้อมูลระบบขับเคลื่อน
async function seedSealion7Powertrain(variants: Seal7Variants) {
  const powertrainPromises = [
    prisma.powertrainSystem.create({ // Premium RWD
      data: {
        driveType: "RWD",
        rearMotorType: "Permanent Magnet Synchronous Motor",
        rearMotorPower: 230,
        rearMotorTorque: 380,
        totalSystemPower: 230,
        totalSystemTorque: 380,
        variantId: variants.premium.id,
      }
    }),
    prisma.powertrainSystem.create({ // AWD Performance
      data: {
        driveType: "AWD",
        frontMotorType: "Asynchronous Motor", // Or PMSM - confirm spec
        frontMotorPower: 160,
        frontMotorTorque: 310,
        rearMotorType: "Permanent Magnet Synchronous Motor",
        rearMotorPower: 230,
        rearMotorTorque: 380,
        totalSystemPower: 390,
        totalSystemTorque: 690,
        variantId: variants.awd.id,
      }
    }),
  ];
  await Promise.all(powertrainPromises);
  console.log('SEALION 7 powertrain systems seeded');
}

// ฟังก์ชันเพิ่มข้อมูลสมรรถนะ
async function seedSealion7Performance(variants: Seal7Variants) {
  const performanceBase = { seatingCapacity: 5, topSpeed: 180 };
  const performancePromises = [
    prisma.performance.create({ data: { ...performanceBase, acceleration0To100: 6.7, range: 550, variantId: variants.premium.id } }),
    prisma.performance.create({ data: { ...performanceBase, acceleration0To100: 4.5, range: 500, variantId: variants.awd.id } }),
  ];
  await Promise.all(performancePromises);
  console.log('SEALION 7 performance data seeded');
}

// ฟังก์ชันเพิ่มข้อมูลแบตเตอรี่
async function seedSealion7Battery(variants: Seal7Variants) {
  const batteryData = {
    type: "BYD Blade Battery (LFP)",
    capacity: 82.56,
  };
  const batteryPromises = [
    prisma.battery.create({ data: { ...batteryData, variantId: variants.premium.id } }),
    prisma.battery.create({ data: { ...batteryData, variantId: variants.awd.id } }),
  ];
  await Promise.all(batteryPromises);
  console.log('SEALION 7 battery data seeded');
}

// ฟังก์ชันเพิ่มข้อมูลระบบกันสะเทือนและเบรก
async function seedSealion7Suspension(variants: Seal7Variants) {
  const suspensionBase = {
    frontSuspension: "Double Wishbone",
    rearSuspension: "Multi-link",
    frontBrakeType: "Vented Disc",
    rearBrakeType: "Vented Disc",
    regenerativeBraking: true,
    adaptiveSuspension: true, // Assume DiSus-C standard
  };
  const suspensionPromises = [
    prisma.suspensionBraking.create({ data: { ...suspensionBase, tireSize: "235/50 R19", variantId: variants.premium.id } }),
    prisma.suspensionBraking.create({ data: { ...suspensionBase, tireSize: "245/45 R20", variantId: variants.awd.id } }),
  ];
  await Promise.all(suspensionPromises);
  console.log('SEALION 7 suspension and braking data seeded');
}

// ฟังก์ชันเพิ่มข้อมูลระบบชาร์จ
async function seedSealion7Charging(variants: Seal7Variants) {
  const chargingData = {
    acChargerType: "Type 2",
    acChargerPower: 7,
    dcChargerType1: "CCS2",
    dcChargerPower1: 150,
    v2lSupport: true,
    v2lAdapter: true,
    regenerativeBraking: true,
  };
  const chargingPromises = [
    prisma.chargingSystem.create({ data: { ...chargingData, variantId: variants.premium.id } }),
    prisma.chargingSystem.create({ data: { ...chargingData, variantId: variants.awd.id } }),
  ];
  await Promise.all(chargingPromises);
  console.log('SEALION 7 charging systems seeded');
}

// ฟังก์ชันเพิ่มข้อมูลความปลอดภัย
async function seedSealion7Safety(variants: Seal7Variants) {
  const safetyData = {
    frontAirbags: true,
    sideAirbags: true,
    curtainAirbags: true,
    kneeBolsterAirbags: true,
    tirePressureMonitoring: true,
    abs: true,
    ebd: true,
    esc: true,
    tcs: true,
    hillHoldControl: true,
    autoHoldFunction: true,
    aeb: true,
    forwardCollisionWarning: true,
    laneKeepAssist: true,
    laneDepartureWarning: true,
    blindSpotMonitoring: true,
    rearCrossTrafficAlert: true,
    adaptiveCruiseControl: true,
    trafficSignRecognition: true,
    driverAttentionMonitor: true,
    frontParkingSensors: true,
    rearParkingSensors: true,
    surroundViewCamera: true,
    automaticHeadlights: true,
    highBeamAssist: true,
    rainSensingWipers: true,
    bhsSystem: true,
    doorOpenWarningSystem: true,
    intelligentHeadlights: true,
    drivingAssistanceSystem: true,
    headsUpDisplay: true,
    intelligentTorqueControl: true,
    rearCollisionWarning: true,
    rearCrossTrafficBrake: true,
    intelligentCruiseControl: true,
    brakeDiscWiping: true,
    curveSpeedControl: true,
    rolloverMitigation: true,
  };
  const safetyPromises = [
    prisma.safetyFeatures.create({ data: { ...safetyData, variantId: variants.premium.id } }),
    prisma.safetyFeatures.create({ data: { ...safetyData, variantId: variants.awd.id } }),
  ];
  await Promise.all(safetyPromises);
  console.log('SEALION 7 safety features seeded');
}

// ฟังก์ชันเพิ่มอุปกรณ์ภายนอก
async function seedSealion7Exterior(variants: Seal7Variants) {
  const exteriorData = {
    panoramicGlassRoof: true,
    electricSunroof: true,
    rearWiperWithIntermittentFunction: true,
    electricTailgate: true,
    rearWindowHeatedWithTimer: true,
    powerFoldingMirrors: true,
    autoFoldingMirrors: true,
    memoryPositionMirrors: true,
    antiPinchWindowsWithOneTouchSystem: true,
    frontRearParkingSensors: true,
    heatedSideView: true,
    roofRails: true,
    autoDimmingSideMirrors: true,
    remoteWindowOperation: true,
  };
  const exteriorPromises = [
    prisma.exteriorFeatures.create({ data: { ...exteriorData, variantId: variants.premium.id } }),
    prisma.exteriorFeatures.create({ data: { ...exteriorData, variantId: variants.awd.id } }),
  ];
  await Promise.all(exteriorPromises);
  console.log('SEALION 7 exterior features seeded');
}

// ฟังก์ชันเพิ่มอุปกรณ์ภายใน
async function seedSealion7Interior(variants: Seal7Variants) {
  const interiorData = {
    multiColorAmbientLighting: true,
    leatherSyntheticSeats: false,
    leatherSeats: true,
    lcdDisplay10Inch: true,
    centerConsoleStorage: true,
    syntheticLeatherSteeringWheel: false,
    leatherSteeringWheel: true,
    eightWayPowerSeats: true,
    backSeat4WayAdjustment: true,
    frontSeatHeating: true,
    ventilatedSeatsWithACSystem: true,
    electricMemorySeatDrivers: true,
    steeringWheelHeatedAndMemory: true,
    twoWaySunshades: true,
    adjustableRearHeadRests: true,
    rearHeadRests2Way: true,
    automaticDimmingRearviewMirror: true,
    framelessRearviewMirror: true,
    antiBurglaryDoorPillar: true,
    frontIlluminatedVanityMirror: true,
    rearArmrest: true,
    foldableSecondRowSeats: true,
    foldableThirdRowSeats: false,
  };
  const interiorPromises = [
    prisma.interiorFeatures.create({ data: { ...interiorData, variantId: variants.premium.id } }),
    prisma.interiorFeatures.create({ data: { ...interiorData, variantId: variants.awd.id } }),
  ];
  await Promise.all(interiorPromises);
  console.log('SEALION 7 interior features seeded');
}

// ฟังก์ชันเพิ่มระบบความบันเทิง
async function seedSealion7Entertainment(variants: Seal7Variants) {
  const entertainmentData = {
    fmRadio: true,
    appleCarPlayAndroid: true,
    bluetoothConnectivity: true,
    touchscreen15Inch: true,
    dynAudio12Speakers: true,
    thaiVoiceControl: true,
    ambientTemperatureDisplay: true,
    digitalRadio: true,
    frontUsbTypeAC: true,
    rearUsbTypeAC: true,
    otaUpdateSupport: true,
    speakerCount: 12,
  };
  const entertainmentPromises = [
    prisma.entertainmentFeatures.create({ data: { ...entertainmentData, variantId: variants.premium.id } }),
    prisma.entertainmentFeatures.create({ data: { ...entertainmentData, variantId: variants.awd.id } }),
  ];
  await Promise.all(entertainmentPromises);
  console.log('SEALION 7 entertainment features seeded');
}

// ฟังก์ชันเพิ่มระบบไฟ
async function seedSealion7Lighting(variants: Seal7Variants) {
  const lightingData = {
    ledHeadlights: true,
    followMeHomeFunction: true,
    ledDaytimeRunningLights: true,
    ledTaillights: true,
    rearFogLights: true,
    sequentialRearTurnSignals: true,
    thirdBrakeLights: true,
    rgbDynamicMoodLights: true,
    frontReadingLights: true,
    rearReadingLights: true,
    doorSillScuffPlates: true,
  };
  const lightingPromises = [
    prisma.lightingFeatures.create({ data: { ...lightingData, variantId: variants.premium.id } }),
    prisma.lightingFeatures.create({ data: { ...lightingData, variantId: variants.awd.id } }),
  ];
  await Promise.all(lightingPromises);
  console.log('SEALION 7 lighting features seeded');
}

// ฟังก์ชันเพิ่มอุปกรณ์อำนวยความสะดวก
async function seedSealion7Comfort(variants: Seal7Variants) {
  const comfortData = {
    keylessEntry: true,
    nfcCardKey: true,
    wirelessPhoneChargers: true,
    twelveVoltOutlet: true,
    pm25AirFilter: true,
    cn95AirFilter: true,
    airIonizer: true,
    dualZoneClimateControl: true,
    rearAirVents: true,
    bydDigitalKey: true,
    firstAidKit: false,
    emergencyKit: false,
    rearArmrest: true,
    foldableSecondRowSeats: true,
  };
  const comfortPromises = [
    prisma.comfortFeatures.create({ data: { ...comfortData, variantId: variants.premium.id } }),
    prisma.comfortFeatures.create({ data: { ...comfortData, variantId: variants.awd.id } }),
  ];
  await Promise.all(comfortPromises);
  console.log('SEALION 7 comfort features seeded');
}