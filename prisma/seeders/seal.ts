import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedSeal() {
  console.log('Seeding BYD SEAL data...');

  // สร้างข้อมูลพื้นฐานของรถ
  const SEAL_MODEL = await prisma.carModel.create({ // Use create
    data: {
      model: "BYD SEAL",
      slug: "byd-seal",
      tagline: "ซีดานไฟฟ้าสมรรถนะสูง ดีไซน์สปอร์ตเร้าใจ", // Updated tagline
      description: "ซีดานไฟฟ้าสมรรถนะสูง พร้อมระยะทางขับขี่ไกลและเทคโนโลยีล้ำสมัย",
      basePrice: 999900, 
      imageUrlPromo: "/images/promotions/seal.webp", // Consistent path
      imageUrlModel:"/images/models/seal/byd-seal-card.webp",
      imageUrlHero: "/images/models/seal/seal-hero.jpg",
      imageUrlReal: "/images/models/seal/seal-real.jpg",
      imageWidth: 1200,
      imageHeight: 800,
      featuresTitle: "ที่สุดแห่งสมรรถนะ และดีไซน์", // Updated title
      // Removed specsOverview
      promotion: [
        "ประกันภัยชั้น 1 พร้อม พรบ. ระยะเวลา 1 ปี",
        "บริการช่วยเหลือฉุกเฉิน ตลอด 24 ชั่วโมง 8 ปีเต็ม",
        "รับประกันตัวรถ (WARRANTY) 8 ปี หรือ 160,000 กม.",
        "รับประกันแบตเตอรี่ 8 ปี หรือ 160,000 กม.",
        "สายต่อพ่วงอุปกรณ์ไฟฟ้า (V2L)", // Simplified V2L
        "สายชาร์จเคลื่อนที่ AC Portable Charger",
        "พรมเข้ารูป", // Simplified
        "กรอบป้ายทะเบียน", // Simplified
        "ฟิล์มหน้าจอ", // Simplified
        "ค่าจดทะเบียนรถ", // Simplified
        "Home Charger พร้อมค่าติดตั้ง (ตามเงื่อนไขบริษัท)" // Added Home Charger
      ],
      gallery: [
        "/images/cars/seal/gallery/1.webp", // Consistent path
        "/images/cars/seal/gallery/2.webp",
        "/images/cars/seal/gallery/3.webp",
      ],
      // Removed inline relations (colors, features, variants, techHighlights)
    },
  });
  console.log('Created BYD SEAL model');

  // เพิ่มสีรถ
  await seedSealColors(SEAL_MODEL.id);

  // สร้างรุ่นย่อย
  const variants = await seedSealVariants(SEAL_MODEL.id);

  // เพิ่มข้อมูลสเปคทางเทคนิค
  await Promise.all([
    seedSealDimensions(variants),
    seedSealPowertrain(variants),
    seedSealPerformance(variants),
    seedSealBattery(variants),
    seedSealSuspension(variants),
    seedSealCharging(variants),
    seedSealSafety(variants),
    seedSealExterior(variants),
    seedSealInterior(variants),
    seedSealEntertainment(variants),
    seedSealLighting(variants),
    seedSealComfort(variants),
  ]);

  console.log('BYD SEAL data seeded successfully!');
  return SEAL_MODEL;
}

// ฟังก์ชันเพิ่มสีรถ
async function seedSealColors(carModelId: number) {
  const colors = [
    {
      name: "Arctic Blue", // Changed name
      code: "#7AA5CD",
      image: "/images/cars/seal/colors/arctic-blue.webp",
      gradient: "linear-gradient(145deg, #7AA5CD, #5585B5)",
      shadow: "#4A79A3",
      border: "#6A95BD",
    },
    {
      name: "Horizon White",
      code: "#F5F5F5",
      image: "/images/cars/seal/colors/horizon-white.webp",
      gradient: "linear-gradient(145deg, #FFFFFF, #E6E6E6)",
      shadow: "#DCDCDC",
      border: "#EEEEEE",
    },
    {
      name: "Quantum Black",
      code: "#121212",
      image: "/images/cars/seal/colors/quantum-black.webp",
      gradient: "linear-gradient(145deg, #222222, #000000)",
      shadow: "#000000",
      border: "#333333",
    },
    {
      name: "Space Grey",
      code: "#808080", // Updated code to standard grey
      image: "/images/cars/seal/colors/space-grey.webp",
      gradient: "linear-gradient(145deg, #8A8A8A, #707070)",
      shadow: "#606060",
      border: "#7A7A7A",
    },
    // Removed Velocity blue (same as Arctic Blue), Space Grey (different code)
  ];

  const colorPromises = colors.map(color =>
    prisma.carColor.create({
      data: {
        ...color,
        carModelId,
      },
    })
  );

  await Promise.all(colorPromises);
  console.log('SEAL colors seeded');
}

// ฟังก์ชันสร้างรุ่นย่อย
async function seedSealVariants(carModelId: number) {
  const dynamicVariant = await prisma.carVariant.create({
    data: {
      variantId: "SEAL-DYNAMIC", // Uppercase model
      name: "Dynamic",
      price: 999900, // Updated price
      range: "510 กม. (NEDC)", // Updated range format
      power: "150 กิโลวัตต์", // Updated power format
      acceleration: "7.5 sec", // Updated accel format
      carModelId,
    },
  });

  const premiumVariant = await prisma.carVariant.create({
    data: {
      variantId: "SEAL-PREMIUM", // Uppercase model
      name: "Premium",
      price: 1449000, // Updated price
      range: "650 กม. (NEDC)", // Updated range format
      power: "230 กิโลวัตต์", // Updated power format
      acceleration: "5.9 วินาที", // Updated accel format
      carModelId,
    },
  });

  const performanceVariant = await prisma.carVariant.create({
    data: {
      variantId: "SEAL-PERFORMANCE", // Uppercase model
      name: "AWD Performance",
      price: 1599000, // Updated price
      range: "580 กม. (NEDC)", // Updated range format
      power: "390 กิโลวัตต์", // Updated power format
      acceleration: "3.8 วินาที", // Updated accel format
      carModelId,
    },
  });

  console.log('SEAL variants seeded');
  return { dynamic: dynamicVariant, premium: premiumVariant, performance: performanceVariant };
}

// Helper type for variants
type SealVariants = {
  dynamic: { id: number };
  premium: { id: number };
  performance: { id: number };
};

// ฟังก์ชันเพิ่มข้อมูลขนาดและน้ำหนัก
async function seedSealDimensions(variants: SealVariants) {
  const dimensionBase = {
      length: 4800,
      width: 1875,
      height: 1460,
      wheelbase: 2920,
      // frontTrack: null, // Schema might not have these
      // rearTrack: null,
      groundClearance: 120,
  };

  const dimensions = [
    { // Dynamic
      ...dimensionBase,
      unladenWeight: 1922,
      // grossWeight: 2344,
      variantId: variants.dynamic.id,
    },
    { // Premium
      ...dimensionBase,
      unladenWeight: 2055,
      // grossWeight: 2501,
      variantId: variants.premium.id,
    },
    { // Performance
      ...dimensionBase,
      unladenWeight: 2185,
      // grossWeight: 2631,
      variantId: variants.performance.id,
    },
  ];

  const dimensionPromises = dimensions.map(dim =>
    prisma.dimensionsWeight.create({ data: dim })
  );

  await Promise.all(dimensionPromises);
  console.log('SEAL dimensions seeded');
}

// ฟังก์ชันเพิ่มข้อมูลระบบขับเคลื่อน
async function seedSealPowertrain(variants: SealVariants) {
  const powertrainPromises = [
    prisma.powertrainSystem.create({ // Dynamic
      data: {
        driveType: "RWD",
        rearMotorType: "Permanent Magnet Synchronous Motor",
        rearMotorPower: 150,
        rearMotorTorque: 310,
        totalSystemPower: 150,
        totalSystemTorque: 310,
        variantId: variants.dynamic.id,
      }
    }),
    prisma.powertrainSystem.create({ // Premium
      data: {
        driveType: "RWD",
        rearMotorType: "Permanent Magnet Synchronous Motor",
        rearMotorPower: 230,
        rearMotorTorque: 360,
        totalSystemPower: 230,
        totalSystemTorque: 360,
        variantId: variants.premium.id,
      }
    }),
    prisma.powertrainSystem.create({ // Performance
      data: {
        driveType: "AWD",
        frontMotorType: "Asynchronous Motor",
        frontMotorPower: 160,
        frontMotorTorque: 310,
        rearMotorType: "Permanent Magnet Synchronous Motor",
        rearMotorPower: 230,
        rearMotorTorque: 360,
        totalSystemPower: 390,
        totalSystemTorque: 670,
        variantId: variants.performance.id,
      }
    }),
  ];

  await Promise.all(powertrainPromises);
  console.log('SEAL powertrain systems seeded');
}

// ฟังก์ชันเพิ่มข้อมูลสมรรถนะ
async function seedSealPerformance(variants: SealVariants) {
  const performancePromises = [
    prisma.performance.create({ // Dynamic
      data: {
        acceleration0To100: 7.5,
        range: 510, // NEDC
        topSpeed: 180, // Assumed/Common
        seatingCapacity: 5,
        variantId: variants.dynamic.id,
      }
    }),
    prisma.performance.create({ // Premium
      data: {
        acceleration0To100: 5.9,
        range: 650, // NEDC
        topSpeed: 180, // Assumed/Common
        seatingCapacity: 5,
        variantId: variants.premium.id,
      }
    }),
    prisma.performance.create({ // Performance
      data: {
        acceleration0To100: 3.8,
        range: 580, // NEDC
        topSpeed: 180, // Assumed/Common
        seatingCapacity: 5,
        variantId: variants.performance.id,
      }
    }),
  ];

  await Promise.all(performancePromises);
  console.log('SEAL performance data seeded');
}

// ฟังก์ชันเพิ่มข้อมูลแบตเตอรี่
async function seedSealBattery(variants: SealVariants) {
  const batteryPromises = [
    prisma.battery.create({ // Dynamic
      data: {
        type: "BYD Blade Battery (LFP)",
        capacity: 61.44,
        variantId: variants.dynamic.id,
      }
    }),
    prisma.battery.create({ // Premium
      data: {
        type: "BYD Blade Battery (LFP)",
        capacity: 82.56,
        variantId: variants.premium.id,
      }
    }),
    prisma.battery.create({ // Performance
      data: {
        type: "BYD Blade Battery (LFP)",
        capacity: 82.56,
        variantId: variants.performance.id,
      }
    }),
  ];

  await Promise.all(batteryPromises);
  console.log('SEAL battery data seeded');
}

// ฟังก์ชันเพิ่มข้อมูลระบบกันสะเทือนและเบรก
async function seedSealSuspension(variants: SealVariants) {
   const suspensionBase = {
      frontSuspension: "Double Wishbone", // English
      rearSuspension: "Multi-link", // English
      regenerativeBraking: true,
  };

  const suspensionPromises = [
    prisma.suspensionBraking.create({ // Dynamic
      data: {
        ...suspensionBase,
        adaptiveSuspension: false,
        frontBrakeType: "Vented Disc", // English
        rearBrakeType: "Vented Disc", // English
        tireSize: "225/50 R18",
        variantId: variants.dynamic.id,
      }
    }),
    prisma.suspensionBraking.create({ // Premium
      data: {
        ...suspensionBase,
        adaptiveSuspension: true, // Frequency Selective Damping (FSD)
        frontBrakeType: "Fixed Caliper", // English
        rearBrakeType: "Vented Disc",
        tireSize: "235/45 R19",
        variantId: variants.premium.id,
      }
    }),
    prisma.suspensionBraking.create({ // Performance
      data: {
        ...suspensionBase,
        adaptiveSuspension: true, // Frequency Selective Damping (FSD)
        frontBrakeType: "Fixed Caliper",
        rearBrakeType: "Vented Disc",
        tireSize: "235/45 R19",
        variantId: variants.performance.id,
      }
    }),
  ];

  await Promise.all(suspensionPromises);
  console.log('SEAL suspension and braking data seeded');
}

// ฟังก์ชันเพิ่มข้อมูลระบบชาร์จ
async function seedSealCharging(variants: SealVariants) {
  const chargingBase = {
    acChargerType: "Type 2",
    acChargerPower: 7, // Standard AC charging power
    dcChargerType1: "CCS2",
    v2lSupport: true,
    v2lAdapter: true,
    regenerativeBraking: true,
  };

  const chargingPromises = [
    prisma.chargingSystem.create({ // Dynamic
      data: {
        ...chargingBase,
        dcChargerPower1: 110, // kW
        variantId: variants.dynamic.id,
      }
    }),
    prisma.chargingSystem.create({ // Premium
      data: {
        ...chargingBase,
        dcChargerPower1: 150, // kW
        variantId: variants.premium.id,
      }
    }),
    prisma.chargingSystem.create({ // Performance
      data: {
        ...chargingBase,
        dcChargerPower1: 150, // kW
        variantId: variants.performance.id,
      }
    }),
  ];

  await Promise.all(chargingPromises);
  console.log('SEAL charging systems seeded');
}

// ฟังก์ชันเพิ่มข้อมูลความปลอดภัย
async function seedSealSafety(variants: SealVariants) {
  // Base features common to all variants
  const safetyBase = {
      frontAirbags: true,
      sideAirbags: true,
      curtainAirbags: true,
      kneeBolsterAirbags: true, // Seal has knee airbags
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
      adaptiveCruiseControl: true, // ACC Stop & Go
      trafficSignRecognition: true,
      driverAttentionMonitor: true,
      frontParkingSensors: true,
      rearParkingSensors: true,
      surroundViewCamera: true,
      automaticHeadlights: true,
      highBeamAssist: true,
      rainSensingWipers: true,
      bhsSystem: true, // Brake Override
      doorOpenWarningSystem: true,
      intelligentHeadlights: true, // Adaptive Front Lighting
      drivingAssistanceSystem: true, // DiPilot
      rearCollisionWarning: true,
      rearCrossTrafficBrake: true,
      intelligentCruiseControl: true, // ICC
      brakeDiscWiping: true,
      curveSpeedControl: true,
      rolloverMitigation: true,
      // Specific features that vary
      headsUpDisplay: false,
      intelligentTorqueControl: false,
  };

  const safetyPromises = [
    prisma.safetyFeatures.create({ // Dynamic
      data: {
        ...safetyBase,
        // headsUpDisplay: false, // Dynamic lacks HUD
        // intelligentTorqueControl: false, // Only on Performance
        variantId: variants.dynamic.id,
      }
    }),
    prisma.safetyFeatures.create({ // Premium
      data: {
        ...safetyBase,
        headsUpDisplay: true,
        // intelligentTorqueControl: false,
        variantId: variants.premium.id,
      }
    }),
    prisma.safetyFeatures.create({ // Performance
      data: {
        ...safetyBase,
        headsUpDisplay: true,
        intelligentTorqueControl: true, // iTAC
        variantId: variants.performance.id,
      }
    }),
  ];

  await Promise.all(safetyPromises);
  console.log('SEAL safety features seeded');
}

// ฟังก์ชันเพิ่มอุปกรณ์ภายนอก
async function seedSealExterior(variants: SealVariants) {
  // Base features common to all variants
  const exteriorBase = {
      panoramicGlassRoof: true,
      // electricSunroof: true, // Included in panoramic
      // rearWiperWithIntermittentFunction: false, // Sedan typically doesn't have rear wiper
      electricTailgate: true, // Assume standard
      rearWindowHeatedWithTimer: true,
      powerFoldingMirrors: true,
      antiPinchWindowsWithOneTouchSystem: true,
      frontRearParkingSensors: true, // Handled in safety
      heatedSideView: true,
      roofRails: false, // Sedan
      // Features that vary
      autoFoldingMirrors: false,
      memoryPositionMirrors: false,
       // Added schema fields defaults
       electricSunroof: false, // Assume false unless explicitly true
       rearWiperWithIntermittentFunction: false, // Assume false for sedan
       autoDimmingSideMirrors: false, // Assume false unless explicitly true
       remoteWindowOperation: false, // Assume false unless explicitly true
  };

  const exteriorPromises = [
    prisma.exteriorFeatures.create({ // Dynamic
      data: {
        ...exteriorBase,
        // autoFoldingMirrors: false, // Dynamic lacks this
        // memoryPositionMirrors: false, // Dynamic lacks this
        variantId: variants.dynamic.id,
      }
    }),
    prisma.exteriorFeatures.create({ // Premium
      data: {
        ...exteriorBase,
        autoFoldingMirrors: true,
        memoryPositionMirrors: true,
        variantId: variants.premium.id,
      }
    }),
    prisma.exteriorFeatures.create({ // Performance
      data: {
        ...exteriorBase,
        autoFoldingMirrors: true,
        memoryPositionMirrors: true,
        variantId: variants.performance.id,
      }
    }),
  ];

  await Promise.all(exteriorPromises);
  console.log('SEAL exterior features seeded');
}

// ฟังก์ชันเพิ่มอุปกรณ์ภายใน
async function seedSealInterior(variants: SealVariants) {
   // Base features common to all variants
  const interiorBase = {
      multiColorAmbientLighting: true,
      lcdDisplay10Inch: true, // 10.25-inch driver display
      centerConsoleStorage: true,
      eightWayPowerSeats: true, // Driver 8-way
      frontSeatHeating: true,
      ventilatedSeatsWithACSystem: true,
      twoWaySunshades: true,
      adjustableRearHeadRests: true,
      rearHeadRests2Way: true,
      automaticDimmingRearviewMirror: true,
      framelessRearviewMirror: true,
      // antiBurglaryDoorPillar: true, // Unsure about this specific feature
      frontIlluminatedVanityMirror: true,
      rearArmrest: true,
      foldableSecondRowSeats: true, // 60:40 split
      foldableThirdRowSeats: false, // Sedan
      // Features that vary
      leatherSyntheticSeats: false,
      leatherSeats: false,
      syntheticLeatherSteeringWheel: false,
      leatherSteeringWheel: false,
      backSeat4WayAdjustment: false,
      electricMemorySeatDrivers: false,
      steeringWheelHeatedAndMemory: false,
       // Added schema fields defaults
       antiBurglaryDoorPillar: false,
  };

  const interiorPromises = [
    prisma.interiorFeatures.create({ // Dynamic
      data: {
        ...interiorBase,
        leatherSyntheticSeats: true,
        syntheticLeatherSteeringWheel: true,
        // backSeat4WayAdjustment: false, // Passenger manual
        // electricMemorySeatDrivers: false,
        // steeringWheelHeatedAndMemory: false,
        variantId: variants.dynamic.id,
      }
    }),
    prisma.interiorFeatures.create({ // Premium
      data: {
        ...interiorBase,
        leatherSeats: true, // Genuine Leather
        leatherSteeringWheel: true,
        backSeat4WayAdjustment: true, // Passenger 4-way power
        electricMemorySeatDrivers: true,
        steeringWheelHeatedAndMemory: true, // Position memory linked
        variantId: variants.premium.id,
      }
    }),
    prisma.interiorFeatures.create({ // Performance
      data: {
        ...interiorBase,
        leatherSeats: true,
        leatherSteeringWheel: true,
        backSeat4WayAdjustment: true,
        electricMemorySeatDrivers: true,
        steeringWheelHeatedAndMemory: true,
        variantId: variants.performance.id,
      }
    }),
  ];

  await Promise.all(interiorPromises);
  console.log('SEAL interior features seeded');
}

// ฟังก์ชันเพิ่มระบบความบันเทิง
async function seedSealEntertainment(variants: SealVariants) {
  // Base features common to all variants
  const entertainmentBase = {
      fmRadio: true,
      appleCarPlayAndroid: true, // Wired/Wireless
      bluetoothConnectivity: true,
      touchscreen15Inch: true, // 15.6-inch rotating
      dynAudio12Speakers: true, // Dynaudio 12 speakers
      thaiVoiceControl: true,
      ambientTemperatureDisplay: true,
      digitalRadio: true, // DAB
      frontUsbTypeAC: true, // Front A+C
      rearUsbTypeAC: true, // Rear A+C
      otaUpdateSupport: true,
      speakerCount: 12, // Dynaudio
  };

  const entertainmentPromises = [
    prisma.entertainmentFeatures.create({ data: { ...entertainmentBase, variantId: variants.dynamic.id } }),
    prisma.entertainmentFeatures.create({ data: { ...entertainmentBase, variantId: variants.premium.id } }),
    prisma.entertainmentFeatures.create({ data: { ...entertainmentBase, variantId: variants.performance.id } }),
  ];

  await Promise.all(entertainmentPromises);
  console.log('SEAL entertainment features seeded');
}

// ฟังก์ชันเพิ่มระบบไฟ
async function seedSealLighting(variants: SealVariants) {
   // Base features common to all variants
  const lightingBase = {
      ledHeadlights: true,
      followMeHomeFunction: true,
      ledDaytimeRunningLights: true,
      ledTaillights: true, // Full-width LED
      rearFogLights: true,
      sequentialRearTurnSignals: true,
      thirdBrakeLights: true,
      frontReadingLights: true,
      doorSillScuffPlates: true,
      // Features that vary
      rgbDynamicMoodLights: false,
      rearReadingLights: false,
  };

  const lightingPromises = [
    prisma.lightingFeatures.create({ // Dynamic
      data: {
        ...lightingBase,
        // rgbDynamicMoodLights: false, // Dynamic lacks this
        // rearReadingLights: false, // Dynamic lacks this
        variantId: variants.dynamic.id,
      }
    }),
    prisma.lightingFeatures.create({ // Premium
      data: {
        ...lightingBase,
        rgbDynamicMoodLights: true,
        rearReadingLights: true,
        variantId: variants.premium.id,
      }
    }),
    prisma.lightingFeatures.create({ // Performance
      data: {
        ...lightingBase,
        rgbDynamicMoodLights: true,
        rearReadingLights: true,
        variantId: variants.performance.id,
      }
    }),
  ];

  await Promise.all(lightingPromises);
  console.log('SEAL lighting features seeded');
}

// ฟังก์ชันเพิ่มอุปกรณ์อำนวยความสะดวก
async function seedSealComfort(variants: SealVariants) {
  // Base features common to all variants
  const comfortBase = {
      keylessEntry: true,
      nfcCardKey: true,
      wirelessPhoneChargers: true, // Dual wireless chargers
      twelveVoltOutlet: true,
      pm25AirFilter: true,
      cn95AirFilter: true,
      airIonizer: true, // Negative ion generator
      dualZoneClimateControl: true,
      rearAirVents: true,
      bydDigitalKey: true,
       // Added schema fields defaults
       firstAidKit: false,
       emergencyKit: false,
       rearArmrest: true, // Already covered in interior
       foldableSecondRowSeats: true, // Already covered in interior
  };

  const comfortPromises = [
    prisma.comfortFeatures.create({ data: { ...comfortBase, variantId: variants.dynamic.id } }),
    prisma.comfortFeatures.create({ data: { ...comfortBase, variantId: variants.premium.id } }),
    prisma.comfortFeatures.create({ data: { ...comfortBase, variantId: variants.performance.id } }),
  ];

  await Promise.all(comfortPromises);
  console.log('SEAL comfort features seeded');
} 