import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedSealion6dmi() {
  console.log('Seeding BYD SEALION 6 DM-i data...');

  // สร้างข้อมูลพื้นฐานของรถ
  const SEALION6_MODEL = await prisma.carModel.create({
    data: {
      model: "BYD SEALION 6 DM-i",
      slug: "byd-sealion6dmi",
      tagline: "SUV Plug-in Hybrid ขับเคลื่อนชีวิตอย่างชาญฉลาด", // Updated tagline
      description: "SUV Plug-in Hybrid ขับเคลื่อนล้อหน้า ผสานพลังงานเครื่องยนต์และมอเตอร์ไฟฟ้า ประหยัดและเป็นมิตรต่อสิ่งแวดล้อม", // Updated description
      basePrice: 998900, // Updated base price (Dynamic)
      imageUrlPromo: "/images/cars/sealion6/sealion6-promo.webp", // Consistent path
      imageUrlModel: "/images/cars/sealion6/sealion6-model.webp", // Consistent path
      imageWidth: 1200,
      imageHeight: 800,
      featuresTitle: "SUV Plug-in Hybrid สมรรถนะเหนือชั้น", // Updated title
      // Removed specsOverview
      promotion: [
        "ประกันภัยชั้น 1 พร้อม พรบ. ระยะเวลา 1 ปี",
        "รับประกันตัวรถ (WARRANTY) 8 ปี หรือ 160,000 กม.", // Updated warranty
        "รับประกันแบตเตอรี่ 8 ปี หรือ 160,000 กม.",
        "บริการช่วยเหลือฉุกเฉิน ตลอด 24 ชั่วโมง 8 ปีเต็ม",
        "สายต่อพ่วงอุปกรณ์ไฟฟ้า (V2L)",
        "สายชาร์จเคลื่อนที่ AC Portable Charger",
        "พรมเข้ารูป",
        "กรอบป้ายทะเบียน",
        "ฟิล์มหน้าจอ",
        "ค่าจดทะเบียนรถ",
        "Home Charger ยี่ห้อ AUTEL พร้อมค่าติดตั้ง"
      ],
      gallery: [
          "/images/cars/sealion6/gallery/1.webp",
          "/images/cars/sealion6/gallery/2.webp",
          "/images/cars/sealion6/gallery/3.webp",
      ],
      // Removed inline relations
    },
  });
  console.log('Created BYD SEALION 6 DM-i model');

  // เพิ่มสีรถ
  await seedSealion6dmiColors(SEALION6_MODEL.id);

  // สร้างรุ่นย่อย
  const variants = await seedSealion6dmiVariants(SEALION6_MODEL.id);

  // เพิ่มข้อมูลสเปคทางเทคนิค
  await Promise.all([
    seedSealion6dmiDimensions(variants),
    seedSealion6dmiPowertrain(variants),
    seedSealion6dmiPerformance(variants),
    seedSealion6dmiBattery(variants),
    seedSealion6dmiSuspension(variants),
    seedSealion6dmiCharging(variants),
    seedSealion6dmiSafety(variants),
    seedSealion6dmiExterior(variants),
    seedSealion6dmiInterior(variants),
    seedSealion6dmiEntertainment(variants),
    seedSealion6dmiLighting(variants),
    seedSealion6dmiComfort(variants),
  ]);

  console.log('BYD SEALION 6 DM-i data seeded successfully!');
  return SEALION6_MODEL;
}

// ฟังก์ชันเพิ่มสีรถ
async function seedSealion6dmiColors(carModelId: number) {
  const colors = [
    {
      name: "Arctic White", // Changed name
      code: "#FFFFFF",
      image: "/images/cars/sealion6/colors/arctic-white.webp",
      gradient: "linear-gradient(180deg, #FFFFFF 0%, #F0F0F0 100%)",
      shadow: "#DEDEDE",
      border: "#EBEBEB",
    },
    {
      name: "Azure Black", // Changed name
      code: "#000000",
      image: "/images/cars/sealion6/colors/azure-black.webp",
      gradient: "linear-gradient(180deg, #333333 0%, #000000 100%)",
      shadow: "#000000",
      border: "#222222",
    },
    {
      name: "Moon Grey", // Changed name
      code: "#A9A9A9", // Standard grey code
      image: "/images/cars/sealion6/colors/moon-grey.webp",
      gradient: "linear-gradient(180deg, #A9A9A9 0%, #8C8C8C 100%)",
      shadow: "#7D7D7D",
      border: "#9E9E9E",
    },
  ];

  const colorPromises = colors.map(color =>
    prisma.carColor.create({ data: { ...color, carModelId } })
  );
  await Promise.all(colorPromises);
  console.log('SEALION 6 DM-i colors seeded');
}

// ฟังก์ชันสร้างรุ่นย่อย
async function seedSealion6dmiVariants(carModelId: number) {
  const dynamicVariant = await prisma.carVariant.create({
    data: {
      variantId: "SEALION6-DYNAMIC", // Uppercase model
      name: "Dynamic",
      price: 998900, // Updated price
      range: "92 กม. (EV Range - NEDC)", // Specify EV range
      power: "160 กิโลวัตต์ (รวม)", // Total system power
      acceleration: "8.5 วินาที", // Updated accel
      carModelId,
    },
  });

  const premiumVariant = await prisma.carVariant.create({
    data: {
      variantId: "SEALION6-PREMIUM", // Uppercase model
      name: "Premium",
      price: 1098900, // Updated price
      range: "121 กม. (EV Range - NEDC)", // Specify EV range
      power: "175 กิโลวัตต์ (รวม)", // Total system power
      acceleration: "7.9 วินาที", // Updated accel
      carModelId,
    },
  });

  console.log('SEALION 6 DM-i variants seeded');
  return { dynamic: dynamicVariant, premium: premiumVariant };
}

// Helper type for variants
type Sealion6Variants = {
  dynamic: { id: number };
  premium: { id: number };
};

// ฟังก์ชันเพิ่มข้อมูลขนาดและน้ำหนัก
async function seedSealion6dmiDimensions(variants: Sealion6Variants) {
  const dimensionBase = {
      length: 4775,
      width: 1890,
      height: 1670,
      wheelbase: 2765,
      frontTrack: 1630,
      rearTrack: 1630,
      groundClearance: 180,
  };
  const dimensions = [
    { ...dimensionBase, unladenWeight: 1850, variantId: variants.dynamic.id },
    { ...dimensionBase, unladenWeight: 1885, variantId: variants.premium.id }, // Premium slightly heavier
  ];
  await Promise.all(dimensions.map(dim => prisma.dimensionsWeight.create({ data: dim })));
  console.log('SEALION 6 DM-i dimensions seeded');
}

// ฟังก์ชันเพิ่มข้อมูลระบบขับเคลื่อน (DM-i)
async function seedSealion6dmiPowertrain(variants: Sealion6Variants) {
  const powertrainBase = {
      driveType: "FWD",
      engineType: "1.5L Xiaoyun Plug-in Hybrid Engine", // English
      engineDisplacement: 1498, // cc
      enginePower: 72, // kW @ 6000 rpm
      engineTorque: 122, // Nm @ 4000-4500 rpm
      frontMotorType: "Permanent Magnet Synchronous Motor",
  };

  const powertrainPromises = [
    prisma.powertrainSystem.create({ // Dynamic
      data: {
        ...powertrainBase,
        frontMotorPower: 145,
        frontMotorTorque: 210,
        totalSystemPower: 160,
        totalSystemTorque: 300,
        variantId: variants.dynamic.id,
      }
    }),
    prisma.powertrainSystem.create({ // Premium
      data: {
        ...powertrainBase,
        frontMotorPower: 160,
        frontMotorTorque: 250,
        totalSystemPower: 175,
        totalSystemTorque: 350,
        variantId: variants.premium.id,
      }
    }),
  ];
  await Promise.all(powertrainPromises);
  console.log('SEALION 6 DM-i powertrain systems seeded');
}

// ฟังก์ชันเพิ่มข้อมูลสมรรถนะ
async function seedSealion6dmiPerformance(variants: Sealion6Variants) {
  const performanceBase = { seatingCapacity: 5, topSpeed: 180 }; // Assumed top speed
  const performancePromises = [
    prisma.performance.create({ data: { ...performanceBase, acceleration0To100: 8.5, range: 92, variantId: variants.dynamic.id } }), // EV Range NEDC
    prisma.performance.create({ data: { ...performanceBase, acceleration0To100: 7.9, range: 121, variantId: variants.premium.id } }), // EV Range NEDC
  ];
  await Promise.all(performancePromises);
  console.log('SEALION 6 DM-i performance data seeded');
}

// ฟังก์ชันเพิ่มข้อมูลแบตเตอรี่
async function seedSealion6dmiBattery(variants: Sealion6Variants) {
  const batteryBase = { type: "BYD Blade Battery (LFP)" };
  const batteryPromises = [
    prisma.battery.create({ data: { ...batteryBase, capacity: 18.3, variantId: variants.dynamic.id } }),
    prisma.battery.create({ data: { ...batteryBase, capacity: 26.6, variantId: variants.premium.id } }),
  ];
  await Promise.all(batteryPromises);
  console.log('SEALION 6 DM-i battery data seeded');
}

// ฟังก์ชันเพิ่มข้อมูลระบบกันสะเทือนและเบรก
async function seedSealion6dmiSuspension(variants: Sealion6Variants) {
  const suspensionData = {
      frontSuspension: "MacPherson Strut",
      rearSuspension: "Multi-link",
      adaptiveSuspension: false,
      frontBrakeType: "Vented Disc",
      rearBrakeType: "Vented Disc",
      regenerativeBraking: true,
      tireSize: "235/50 R19",
  };
  const suspensionPromises = [
    prisma.suspensionBraking.create({ data: { ...suspensionData, variantId: variants.dynamic.id } }),
    prisma.suspensionBraking.create({ data: { ...suspensionData, variantId: variants.premium.id } }),
  ];
  await Promise.all(suspensionPromises);
  console.log('SEALION 6 DM-i suspension and braking data seeded');
}

// ฟังก์ชันเพิ่มข้อมูลระบบชาร์จ
async function seedSealion6dmiCharging(variants: Sealion6Variants) {
  const chargingBase = {
    acChargerType: "Type 2",
    acChargerPower: 7, // Updated AC power
    dcChargerType1: "CCS2",
    v2lSupport: true,
    v2lAdapter: true,
    regenerativeBraking: true,
  };
  const chargingPromises = [
    prisma.chargingSystem.create({ data: { ...chargingBase, dcChargerPower1: 18, variantId: variants.dynamic.id } }), // kW
    prisma.chargingSystem.create({ data: { ...chargingBase, dcChargerPower1: 18, variantId: variants.premium.id } }), // kW
  ];
  await Promise.all(chargingPromises);
  console.log('SEALION 6 DM-i charging systems seeded');
}

// ฟังก์ชันเพิ่มข้อมูลความปลอดภัย
async function seedSealion6dmiSafety(variants: Sealion6Variants) {
  const safetyBase = {
    frontAirbags: true,
    sideAirbags: true,
    curtainAirbags: true,
    kneeBolsterAirbags: false, // Assuming no knee airbags
    tirePressureMonitoring: true,
    abs: true,
    ebd: true,
    esc: true,
    tcs: true,
    hillHoldControl: true,
    autoHoldFunction: true,
    frontParkingSensors: true,
    rearParkingSensors: true,
    surroundViewCamera: true,
    automaticHeadlights: true,
    // Defaults for fields that might vary or be missing
    aeb: false,
    forwardCollisionWarning: false,
    laneKeepAssist: false,
    laneDepartureWarning: false,
    blindSpotMonitoring: false,
    rearCrossTrafficAlert: false,
    adaptiveCruiseControl: false,
    trafficSignRecognition: false,
    driverAttentionMonitor: false,
    highBeamAssist: false,
    rainSensingWipers: false,
    bhsSystem: false,
    doorOpenWarningSystem: false,
    intelligentHeadlights: false,
    drivingAssistanceSystem: false,
    headsUpDisplay: false,
    intelligentTorqueControl: false,
    rearCollisionWarning: false,
    rearCrossTrafficBrake: false,
    intelligentCruiseControl: false,
    brakeDiscWiping: false,
    curveSpeedControl: false,
    rolloverMitigation: false,
  };

  const dynamicSafety = { ...safetyBase };
  const premiumSafety = {
    ...safetyBase,
    aeb: true,
    forwardCollisionWarning: true,
    laneKeepAssist: true,
    laneDepartureWarning: true,
    blindSpotMonitoring: true,
    rearCrossTrafficAlert: true,
    adaptiveCruiseControl: true, // ACC Stop & Go
    trafficSignRecognition: true,
    highBeamAssist: true,
    doorOpenWarningSystem: true,
    intelligentHeadlights: true, // Adaptive
    rearCollisionWarning: true,
    rearCrossTrafficBrake: true,
    intelligentCruiseControl: true,
  };

  await Promise.all([
    prisma.safetyFeatures.create({ data: { ...dynamicSafety, variantId: variants.dynamic.id } }),
    prisma.safetyFeatures.create({ data: { ...premiumSafety, variantId: variants.premium.id } }),
  ]);
  console.log('SEALION 6 DM-i safety features seeded');
}

// ฟังก์ชันเพิ่มอุปกรณ์ภายนอก
async function seedSealion6dmiExterior(variants: Sealion6Variants) {
  const exteriorData = {
    panoramicGlassRoof: true,
    electricSunroof: false, // Part of pano roof
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
    // Added schema defaults
    autoDimmingSideMirrors: false,
    remoteWindowOperation: false,
  };
  const exteriorPromises = [
    prisma.exteriorFeatures.create({ data: { ...exteriorData, variantId: variants.dynamic.id } }),
    prisma.exteriorFeatures.create({ data: { ...exteriorData, variantId: variants.premium.id } }),
  ];
  await Promise.all(exteriorPromises);
  console.log('SEALION 6 DM-i exterior features seeded');
}

// ฟังก์ชันเพิ่มอุปกรณ์ภายใน
async function seedSealion6dmiInterior(variants: Sealion6Variants) {
  const interiorBase = {
      multiColorAmbientLighting: true,
      leatherSyntheticSeats: true,
      leatherSeats: false,
      lcdDisplay10Inch: true, // 12.3 inch driver display
      centerConsoleStorage: true,
      syntheticLeatherSteeringWheel: true,
      leatherSteeringWheel: false,
      backSeat4WayAdjustment: true, // Passenger 4-way manual
      ventilatedSeatsWithACSystem: true, // Driver + Passenger
      twoWaySunshades: true,
      adjustableRearHeadRests: true,
      rearHeadRests2Way: true,
      automaticDimmingRearviewMirror: true,
      framelessRearviewMirror: false,
      frontIlluminatedVanityMirror: true,
      rearArmrest: true,
      foldableSecondRowSeats: true, // 60:40
      foldableThirdRowSeats: false,
      // Added schema defaults
      eightWayPowerSeats: false,
      frontSeatHeating: false,
      electricMemorySeatDrivers: false,
      steeringWheelHeatedAndMemory: false,
      antiBurglaryDoorPillar: false,
  };

  const dynamicInterior = {
    ...interiorBase,
    eightWayPowerSeats: true, // Driver 6-way power
    electricMemorySeatDrivers: true, // Driver memory
  };
  const premiumInterior = {
    ...interiorBase,
    eightWayPowerSeats: true, // Driver 8-way power
    backSeat4WayAdjustment: true, // Passenger 4-way power
    electricMemorySeatDrivers: true,
    frontSeatHeating: true, // Added heating for premium
  };

  await Promise.all([
    prisma.interiorFeatures.create({ data: { ...dynamicInterior, variantId: variants.dynamic.id } }),
    prisma.interiorFeatures.create({ data: { ...premiumInterior, variantId: variants.premium.id } }),
  ]);
  console.log('SEALION 6 DM-i interior features seeded');
}

// ฟังก์ชันเพิ่มระบบความบันเทิง
async function seedSealion6dmiEntertainment(variants: Sealion6Variants) {
  const entertainmentBase = {
      fmRadio: true,
      appleCarPlayAndroid: true, // Wired & Wireless
      bluetoothConnectivity: true,
      touchscreen15Inch: true, // 15.6 inch rotating
      thaiVoiceControl: true,
      ambientTemperatureDisplay: true,
      digitalRadio: true,
      frontUsbTypeAC: true, // A+C
      rearUsbTypeAC: true, // A+C
      otaUpdateSupport: true,
      // Added schema default
      dynAudio12Speakers: false,
  };
  const dynamicEntertainment = { ...entertainmentBase, speakerCount: 8 };
  const premiumEntertainment = { ...entertainmentBase, speakerCount: 10, dynAudio12Speakers: true }; // Infinity speakers

  await Promise.all([
    prisma.entertainmentFeatures.create({ data: { ...dynamicEntertainment, variantId: variants.dynamic.id } }),
    prisma.entertainmentFeatures.create({ data: { ...premiumEntertainment, variantId: variants.premium.id } }),
  ]);
  console.log('SEALION 6 DM-i entertainment features seeded');
}

// ฟังก์ชันเพิ่มระบบไฟ
async function seedSealion6dmiLighting(variants: Sealion6Variants) {
  const lightingBase = {
      ledHeadlights: true,
      ledDaytimeRunningLights: true,
      ledTaillights: true,
      sequentialRearTurnSignals: true,
      thirdBrakeLights: true,
      frontReadingLights: true,
      rearReadingLights: true,
      doorSillScuffPlates: true,
      // Added schema defaults
      followMeHomeFunction: false,
      rearFogLights: false,
      rgbDynamicMoodLights: false,
  };
  const dynamicLighting = { ...lightingBase };
  const premiumLighting = {
      ...lightingBase,
      followMeHomeFunction: true,
      rearFogLights: true,
      rgbDynamicMoodLights: true, // Multi-color
  };
  await Promise.all([
    prisma.lightingFeatures.create({ data: { ...dynamicLighting, variantId: variants.dynamic.id } }),
    prisma.lightingFeatures.create({ data: { ...premiumLighting, variantId: variants.premium.id } }),
  ]);
  console.log('SEALION 6 DM-i lighting features seeded');
}

// ฟังก์ชันเพิ่มอุปกรณ์อำนวยความสะดวก
async function seedSealion6dmiComfort(variants: Sealion6Variants) {
  const comfortData = {
      keylessEntry: true,
      nfcCardKey: true,
      wirelessPhoneChargers: true,
      twelveVoltOutlet: true,
      pm25AirFilter: true,
      cn95AirFilter: false, // Assuming PM2.5 only
      airIonizer: false, // Assuming PM2.5 only
      dualZoneClimateControl: true,
      rearAirVents: true,
      bydDigitalKey: true,
      // Added schema defaults
      firstAidKit: false,
      emergencyKit: false,
      rearArmrest: true, // Covered in interior
      foldableSecondRowSeats: true, // Covered in interior
  };
  const comfortPromises = [
    prisma.comfortFeatures.create({ data: { ...comfortData, variantId: variants.dynamic.id } }),
    prisma.comfortFeatures.create({ data: { ...comfortData, variantId: variants.premium.id } }),
  ];
  await Promise.all(comfortPromises);
  console.log('SEALION 6 DM-i comfort features seeded');
}
