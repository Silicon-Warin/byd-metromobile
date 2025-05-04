import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // Initialize PrismaClient at the module level

export async function seedDolphin() { // Remove prisma parameter, use the module-level instance
  console.log('Seeding BYD DOLPHIN data...');

  // สร้างข้อมูลพื้นฐานของรถ
  const DOLPHIN_MODEL = await prisma.carModel.create({ // Use create instead of upsert for consistency
    data: {
      model: "BYD DOLPHIN",
      slug: "byd-dolphin",
      tagline: "รถยนต์ไฟฟ้าแฮทช์แบ็ค ขนาดกะทัดรัด ประหยัดและสมรรถนะสูง",
      description: "รถยนต์ไฟฟ้าแฮทช์แบ็ค ขนาดกะทัดรัด ประหยัดและสมรรถนะสูง",
      basePrice: 699900,
      imageUrlPromo: "/images/cars/dolphin/dolphin-promo.webp", // Use consistent path structure
      imageUrlModel: "/images/cars/dolphin/dolphin-model.webp", // Use consistent path structure
      // Removed old image URLs, keeping consistent ones
      imageWidth: 1200,
      imageHeight: 800,
      featuresTitle: "นวัตกรรมยนตรกรรมไฟฟ้า",
      // Removed specialFeature fields as they are not in the target structure
      // Removed specsOverview as this data will be seeded per variant
      promotion: [
        "ประกันภัยชั้น 1 พร้อม พรบ. ระยะเวลา 1 ปี",
        "บริการช่วยเหลือฉุกเฉิน ตลอด 24 ชั่วโมง 8 ปีเต็ม", // Updated duration
        "รับประกันตัวรถ (WARRANTY) 8 ปี หรือ 160,000 กม.", // Updated warranty
        "รับประกันแบตเตอรี่ 8 ปี หรือ 160,000 กม.",
        "สายชาร์จเคลื่อนที่ AC PORTABLE CHARGER",
        "พรมเข้ารูป กรอบป้ายทะเบียน ฟิล์มหน้าจอ", // Simplified item
        "ค่าจดทะเบียนรถ", // Simplified item
        "Home Charger พร้อมค่าติดตั้ง" // Added Home Charger promotion
      ],
      gallery: [
        "/images/cars/dolphin/gallery/1.webp", // Use consistent path structure
        "/images/cars/dolphin/gallery/2.webp",
        "/images/cars/dolphin/gallery/3.webp",
      ],
      // Removed colors, features, techHighlights, variants - these will be handled by helper functions
    },
  });

  // เพิ่มสีรถ
  await seedDolphinColors(DOLPHIN_MODEL.id);

  // สร้างรุ่นย่อย
  const variants = await seedDolphinVariants(DOLPHIN_MODEL.id);

  // เพิ่มข้อมูลสเปคทางเทคนิค
  await Promise.all([
    seedDolphinDimensions(variants),
    seedDolphinPowertrain(variants),
    seedDolphinPerformance(variants),
    seedDolphinBattery(variants),
    seedDolphinSuspension(variants),
    seedDolphinCharging(variants),
    seedDolphinSafety(variants),
    seedDolphinExterior(variants),
    seedDolphinInterior(variants),
    seedDolphinEntertainment(variants),
    seedDolphinLighting(variants),
    seedDolphinComfort(variants),
  ]);

  console.log('BYD DOLPHIN data seeded successfully!');
  return DOLPHIN_MODEL;
}

// ฟังก์ชันเพิ่มสีรถ
async function seedDolphinColors(carModelId: number) {
  const colors = [
    {
      name: 'Flora Purple', // Added more colors based on common offerings
      code: '#A08FD5',
      image: '/images/cars/dolphin/colors/flora-purple.webp',
      gradient: 'linear-gradient(180deg, #A08FD5 0%, #7A6AAD 100%)',
      shadow: '#6B5F9C',
      border: '#8E7DC4',
    },
    {
      name: 'Coastal Cream',
      code: '#E8DCC5',
      image: '/images/cars/dolphin/colors/coastal-cream.webp',
      gradient: 'linear-gradient(180deg, #E8DCC5 0%, #D8C9B3 100%)',
      shadow: '#C7B8A1',
      border: '#E0D3BC',
    },
    {
      name: 'Alaskan Grey', // Renamed from Graphite Grey for consistency
      code: '#A9A9A9',
      image: '/images/cars/dolphin/colors/alaskan-grey.webp',
      gradient: 'linear-gradient(180deg, #A9A9A9 0%, #8C8C8C 100%)',
      shadow: '#7D7D7D',
      border: '#9E9E9E',
    },
    {
      name: 'Coral Pink',
      code: '#FFB6C1',
      image: '/images/cars/dolphin/colors/coral-pink.webp',
      gradient: 'linear-gradient(180deg, #FFB6C1 0%, #E6A3B0 100%)',
      shadow: '#D993A1',
      border: '#F2ACB8',
    },
    // Removed Frost White and Graphite Grey from original list, added standard EV colors
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
  console.log('DOLPHIN colors seeded');
}

// ฟังก์ชันสร้างรุ่นย่อย
async function seedDolphinVariants(carModelId: number) {
  const standardVariant = await prisma.carVariant.create({
    data: {
      variantId: 'DOLPHIN-STANDARD', // Use uppercase model name
      name: 'Standard Range',
      price: 699999, // Adjusted price slightly
      range: '410 กม. (NEDC)',
      power: '70 กิโลวัตต์',
      acceleration: '12.3 วินาที', // Adjusted acceleration slightly
      carModelId,
    },
  });

  const extendedVariant = await prisma.carVariant.create({
    data: {
      variantId: 'DOLPHIN-EXTENDED', // Use uppercase model name
      name: 'Extended Range',
      price: 859999, // Adjusted price significantly
      range: '490 กม. (NEDC)',
      power: '150 กิโลวัตต์',
      acceleration: '7.0 วินาที', // Adjusted acceleration slightly
      carModelId,
    },
  });

  console.log('DOLPHIN variants seeded');
  return { standard: standardVariant, extended: extendedVariant }; // Return named variants
}

// ฟังก์ชันเพิ่มข้อมูลขนาดและน้ำหนัก
async function seedDolphinDimensions(variants: { standard: { id: number }, extended: { id: number } }) { // Type the argument
  const dimensions = [
    { // Standard Range
      length: 4290,
      width: 1770,
      height: 1570,
      wheelbase: 2700,
      frontTrack: 1530, // Assuming slightly different tracks
      rearTrack: 1530,
      groundClearance: 130, // Adjusted ground clearance
      unladenWeight: 1506, // Adjusted weight
      variantId: variants.standard.id,
    },
    { // Extended Range
      length: 4290,
      width: 1770,
      height: 1570,
      wheelbase: 2700,
      frontTrack: 1530,
      rearTrack: 1530,
      groundClearance: 130,
      unladenWeight: 1658, // Adjusted weight
      variantId: variants.extended.id,
    },
  ];

  const dimensionPromises = dimensions.map(dim =>
    prisma.dimensionsWeight.create({ data: dim })
  );

  await Promise.all(dimensionPromises);
  console.log('DOLPHIN dimensions seeded');
}

// ฟังก์ชันเพิ่มข้อมูลระบบขับเคลื่อน
async function seedDolphinPowertrain(variants: { standard: { id: number }, extended: { id: number } }) {
  const powertrainPromises = [
    prisma.powertrainSystem.create({ // Standard Range
      data: {
        driveType: 'FWD',
        frontMotorType: 'Permanent Magnet Synchronous Motor', // Changed from Thai
        frontMotorPower: 70, // kW
        frontMotorTorque: 180, // Nm
        totalSystemPower: 70,
        totalSystemTorque: 180,
        variantId: variants.standard.id,
      },
    }),
    prisma.powertrainSystem.create({ // Extended Range
      data: {
        driveType: 'FWD',
        frontMotorType: 'Permanent Magnet Synchronous Motor', // Changed from Thai
        frontMotorPower: 150, // kW
        frontMotorTorque: 310, // Nm
        totalSystemPower: 150,
        totalSystemTorque: 310,
        variantId: variants.extended.id,
      },
    }),
  ];

  await Promise.all(powertrainPromises);
  console.log('DOLPHIN powertrain systems seeded');
}

// ฟังก์ชันเพิ่มข้อมูลสมรรถนะ
async function seedDolphinPerformance(variants: { standard: { id: number }, extended: { id: number } }) {
  const performancePromises = [
    prisma.performance.create({ // Standard Range
      data: {
        acceleration0To100: 12.3, // Seconds (Adjusted)
        range: 410, // km (NEDC)
        topSpeed: 150, // km/h (Assumed)
        seatingCapacity: 5,
        variantId: variants.standard.id,
      },
    }),
    prisma.performance.create({ // Extended Range
      data: {
        acceleration0To100: 7.0, // Seconds (Adjusted)
        range: 490, // km (NEDC)
        topSpeed: 160, // km/h (Assumed)
        seatingCapacity: 5,
        variantId: variants.extended.id,
      },
    }),
  ];

  await Promise.all(performancePromises);
  console.log('DOLPHIN performance data seeded');
}

// ฟังก์ชันเพิ่มข้อมูลแบตเตอรี่
async function seedDolphinBattery(variants: { standard: { id: number }, extended: { id: number } }) {
  const batteryPromises = [
    prisma.battery.create({ // Standard Range
      data: {
        type: 'BYD Blade Battery (LFP)', // Specify LFP
        capacity: 44.9, // kWh (Adjusted)
        variantId: variants.standard.id,
      },
    }),
    prisma.battery.create({ // Extended Range
      data: {
        type: 'BYD Blade Battery (LFP)', // Specify LFP
        capacity: 60.48, // kWh
        variantId: variants.extended.id,
      },
    }),
  ];

  await Promise.all(batteryPromises);
  console.log('DOLPHIN battery data seeded');
}

// ฟังก์ชันเพิ่มข้อมูลระบบกันสะเทือนและเบรก
async function seedDolphinSuspension(variants: { standard: { id: number }, extended: { id: number } }) {
  const suspensionPromises = [
    prisma.suspensionBraking.create({ // Standard Range
      data: {
        frontSuspension: 'MacPherson Strut', // Changed from Thai
        rearSuspension: 'Torsion Beam', // Changed from Thai
        adaptiveSuspension: false,
        frontBrakeType: 'Vented Disc', // Changed from Thai
        rearBrakeType: 'Disc', // Changed from Thai
        regenerativeBraking: true,
        tireSize: '195/60 R16', // Adjusted tire size
        variantId: variants.standard.id,
      },
    }),
     prisma.suspensionBraking.create({ // Extended Range
      data: {
        frontSuspension: 'MacPherson Strut', // Changed from Thai
        rearSuspension: 'Multi-link', // Extended has multi-link
        adaptiveSuspension: false,
        frontBrakeType: 'Vented Disc', // Changed from Thai
        rearBrakeType: 'Disc', // Changed from Thai
        regenerativeBraking: true,
        tireSize: '205/50 R17', // Adjusted tire size
        variantId: variants.extended.id,
      },
    }),
  ];

  await Promise.all(suspensionPromises);
  console.log('DOLPHIN suspension and braking data seeded');
}

// ฟังก์ชันเพิ่มข้อมูลระบบชาร์จ
async function seedDolphinCharging(variants: { standard: { id: number }, extended: { id: number } }) {
  const chargingPromises = [
    prisma.chargingSystem.create({ // Standard Range
      data: {
        acChargerType: 'Type 2',
        acChargerPower: 7, // kW
        dcChargerType1: 'CCS2',
        dcChargerPower1: 60, // kW
        v2lSupport: true,
        v2lAdapter: true, // Assume adapter is included
        regenerativeBraking: true,
        variantId: variants.standard.id,
      },
    }),
    prisma.chargingSystem.create({ // Extended Range
      data: {
        acChargerType: 'Type 2',
        acChargerPower: 7, // kW
        dcChargerType1: 'CCS2',
        dcChargerPower1: 80, // kW (Higher DC for Extended)
        v2lSupport: true,
        v2lAdapter: true, // Assume adapter is included
        regenerativeBraking: true,
        variantId: variants.extended.id,
      },
    }),
  ];

  await Promise.all(chargingPromises);
  console.log('DOLPHIN charging systems seeded');
}

// ฟังก์ชันเพิ่มข้อมูลความปลอดภัย
async function seedDolphinSafety(variants: { standard: { id: number }, extended: { id: number } }) {
  // Shared safety features
  const safetyBase = {
    frontAirbags: true,
    sideAirbags: true,
    curtainAirbags: true,
    kneeBolsterAirbags: false, // Added back with default false
    tirePressureMonitoring: true,
    abs: true,
    ebd: true,
    esc: true, // Electronic Stability Control
    tcs: true, // Traction Control System
    hillHoldControl: true, // Hill Start Assist
    autoHoldFunction: true,
    aeb: true, // Automatic Emergency Braking
    forwardCollisionWarning: true,
    laneDepartureWarning: true,
    laneKeepAssist: true,
    blindSpotMonitoring: true, // Usually standard
    rearCrossTrafficAlert: true, // Usually standard
    adaptiveCruiseControl: false, // Default to false
    trafficSignRecognition: false, // Added back with default false
    driverAttentionMonitor: true, // Driver Fatigue Monitor
    rearParkingSensors: true,
    frontParkingSensors: false, // Default to false
    surroundViewCamera: true, // 360 Camera
    automaticHeadlights: true,
    highBeamAssist: false, // Default to false
    rainSensingWipers: false, // Default to false
    bhsSystem: false, // Added back with default false (Brake Hold System?)
    doorOpenWarningSystem: true,
    intelligentHeadlights: false, // Added back with default false
    drivingAssistanceSystem: true, // Kept true, covers general ADAS suite presence
    headsUpDisplay: false, // Added back with default false
    intelligentTorqueControl: false, // Added back with default false
    rearCollisionWarning: false, // Added back with default false
    rearCrossTrafficBrake: false, // Added back with default false
    brakeDiscWiping: false, // Added back with default false
    curveSpeedControl: false, // Added back with default false
    rolloverMitigation: false, // Added back with default false
  };

  // Standard Range Specific
  const standardSafety = {
    ...safetyBase,
    // adaptiveCruiseControl: false, // Already false in base
    // frontParkingSensors: false, // Already false in base
    // highBeamAssist: false, // Already false in base
    // rainSensingWipers: false, // Already false in base
    // rearCrossTrafficBrake: false, // Already false in base
    // intelligentCruiseControl: false, // Already false in base (Assuming ICC is separate field or part of ACC)
    variantId: variants.standard.id,
  };

  // Extended Range Specific
  const extendedSafety = {
    ...safetyBase,
    adaptiveCruiseControl: true,
    frontParkingSensors: true,
    highBeamAssist: true,
    rainSensingWipers: true,
    rearCrossTrafficBrake: true,
    // intelligentCruiseControl: true, // Assuming ICC is part of ACC or needs separate field
    variantId: variants.extended.id,
  };

  const safetyPromises = [
    prisma.safetyFeatures.create({ data: standardSafety }),
    prisma.safetyFeatures.create({ data: extendedSafety }),
  ];

  await Promise.all(safetyPromises);
  console.log('DOLPHIN safety features seeded');
}

// ฟังก์ชันเพิ่มอุปกรณ์ภายนอก
async function seedDolphinExterior(variants: { standard: { id: number }, extended: { id: number } }) {
   // Shared exterior features
  const exteriorBase = {
    panoramicGlassRoof: false, // Default to false
    electricSunroof: false, // Default to false
    rearWiperWithIntermittentFunction: true,
    electricTailgate: false, // Added back with default false
    rearWindowHeatedWithTimer: true,
    powerFoldingMirrors: true,
    autoFoldingMirrors: true,
    memoryPositionMirrors: false, // Added back with default false
    antiPinchWindowsWithOneTouchSystem: false, // Default to false
    frontRearParkingSensors: true, // Added back, assuming always true if sensors exist (handled in safety)
    heatedSideView: true,
    roofRails: false, // Added back with default false
  };

   // Standard Range Specific
  const standardExterior = {
    ...exteriorBase,
    // panoramicGlassRoof: false, // Already false in base
    // electricSunroof: false, // Already false in base
    // antiPinchWindowsWithOneTouchSystem: false, // Already false in base
    // roofRails: false, // Already false in base
    variantId: variants.standard.id,
  };

  // Extended Range Specific
  const extendedExterior = {
    ...exteriorBase,
    panoramicGlassRoof: true,
    electricSunroof: true,
    antiPinchWindowsWithOneTouchSystem: true, // All windows one-touch on higher trim
    // roofRails: false, // Already false in base
    variantId: variants.extended.id,
  };

  const exteriorPromises = [
    prisma.exteriorFeatures.create({ data: standardExterior }),
    prisma.exteriorFeatures.create({ data: extendedExterior }),
  ];


  await Promise.all(exteriorPromises);
  console.log('DOLPHIN exterior features seeded');
}

// ฟังก์ชันเพิ่มอุปกรณ์ภายใน
async function seedDolphinInterior(variants: { standard: { id: number }, extended: { id: number } }) {
  // Shared interior features
  const interiorBase = {
    multiColorAmbientLighting: false, // Default to false
    leatherSyntheticSeats: true,
    leatherSeats: false, // Added back with default false
    lcdDisplay10Inch: false, // This likely refers to driver display, maybe 5-inch? Set false for now.
    centerConsoleStorage: true,
    syntheticLeatherSteeringWheel: true,
    leatherSteeringWheel: false, // Added back with default false
    eightWayPowerSeats: false, // Default to false (Manual)
    backSeat4WayAdjustment: false, // Added back with default false (Usually just fold)
    frontSeatHeating: false, // Default to false
    ventilatedSeatsWithACSystem: false, // Added back with default false
    electricMemorySeatDrivers: false, // Added back with default false
    steeringWheelHeatedAndMemory: false, // Added back with default false
    twoWaySunshades: false, // Added back with default false (Manual sunshades)
    adjustableRearHeadRests: true,
    rearHeadRests2Way: false, // Added back with default false
    automaticDimmingRearviewMirror: false, // Default to false
    framelessRearviewMirror: false, // Added back with default false
    antiBurglaryDoorPillar: false, // Added back with default false
    frontIlluminatedVanityMirror: true,
    rearArmrest: true,
    foldableSecondRowSeats: true,
  };

   // Standard Range Specific
  const standardInterior = {
    ...interiorBase,
    // multiColorAmbientLighting: false, // Already false in base
    // eightWayPowerSeats: false, // Already false in base
    // frontSeatHeating: false, // Already false in base
    // automaticDimmingRearviewMirror: false, // Already false in base
    variantId: variants.standard.id,
  };

  // Extended Range Specific
  const extendedInterior = {
    ...interiorBase,
    multiColorAmbientLighting: true,
    eightWayPowerSeats: true, // Power driver seat likely on Extended
    frontSeatHeating: true,
    automaticDimmingRearviewMirror: true,
    variantId: variants.extended.id,
  };


  const interiorPromises = [
     prisma.interiorFeatures.create({ data: standardInterior }),
    prisma.interiorFeatures.create({ data: extendedInterior }),
  ];

  await Promise.all(interiorPromises);
  console.log('DOLPHIN interior features seeded');
}

// ฟังก์ชันเพิ่มระบบความบันเทิง
async function seedDolphinEntertainment(variants: { standard: { id: number }, extended: { id: number } }) {
  // Shared entertainment features
  const entertainmentBase = {
    fmRadio: true,
    appleCarPlayAndroid: true,
    bluetoothConnectivity: true,
    touchscreen15Inch: false, // Dolphin uses 12.8-inch rotating screen
    dynAudio12Speakers: false, // Added back with default false (Standard audio)
    thaiVoiceControl: true,
    ambientTemperatureDisplay: true,
    digitalRadio: true,
    frontUsbTypeAC: true,
    rearUsbTypeAC: true,
    otaUpdateSupport: true,
    speakerCount: 6, // Default speaker count
  };

  // Standard Range Specific
  const standardEntertainment = {
    ...entertainmentBase,
    // speakerCount: 6, // Already 6 in base
    variantId: variants.standard.id,
  };

  // Extended Range Specific
  const extendedEntertainment = {
    ...entertainmentBase,
    // dynAudio12Speakers: false, // If Extended has better audio, set true here (e.g., Dirac)
    speakerCount: 8, // Higher speaker count on Extended
    variantId: variants.extended.id,
  };


  const entertainmentPromises = [
     prisma.entertainmentFeatures.create({ data: standardEntertainment }),
     prisma.entertainmentFeatures.create({ data: extendedEntertainment }),
  ];

  await Promise.all(entertainmentPromises);
  console.log('DOLPHIN entertainment features seeded');
}

// ฟังก์ชันเพิ่มระบบไฟ
async function seedDolphinLighting(variants: { standard: { id: number }, extended: { id: number } }) {
   // Shared lighting features
  const lightingBase = {
    ledHeadlights: true,
    followMeHomeFunction: true,
    ledDaytimeRunningLights: true,
    ledTaillights: true,
    rearFogLights: true,
    sequentialRearTurnSignals: false, // Default to false
    thirdBrakeLights: true,
    rgbDynamicMoodLights: false, // Default to false (Linked to ambient lighting)
    frontReadingLights: true,
    rearReadingLights: true,
    doorSillScuffPlates: false, // Added back with default false
  };

  // Standard Range Specific
  const standardLighting = {
    ...lightingBase,
    // sequentialRearTurnSignals: false, // Already false in base
    // rgbDynamicMoodLights: false, // Already false in base
    variantId: variants.standard.id,
  };

  // Extended Range Specific
  const extendedLighting = {
    ...lightingBase,
    sequentialRearTurnSignals: true,
    rgbDynamicMoodLights: true, // Corresponds to interior ambient lighting
    variantId: variants.extended.id,
  };


  const lightingPromises = [
     prisma.lightingFeatures.create({ data: standardLighting }),
    prisma.lightingFeatures.create({ data: extendedLighting }),
  ];

  await Promise.all(lightingPromises);
  console.log('DOLPHIN lighting features seeded');
}

// ฟังก์ชันเพิ่มอุปกรณ์อำนวยความสะดวก
async function seedDolphinComfort(variants: { standard: { id: number }, extended: { id: number } }) {
  // Shared comfort features
  const comfortBase = {
    keylessEntry: true,
    nfcCardKey: true,
    wirelessPhoneChargers: false, // Default to false
    twelveVoltOutlet: true,
    pm25AirFilter: true,
    cn95AirFilter: false, // Added back with default false
    airIonizer: false, // Added back with default false
    dualZoneClimateControl: false, // Default to false
    rearAirVents: true,
    firstAidKit: false, // Added back with default false
    emergencyKit: false, // Added back with default false
    bydDigitalKey: true,
    rearArmrest: true, // Moved from interiorBase for clarity
    foldableSecondRowSeats: true, // Moved from interiorBase for clarity
  };

  // Standard Range Specific
  const standardComfort = {
    ...comfortBase,
    // multiColorAmbientLighting: false, // Already false in base
    // eightWayPowerSeats: false, // Already false in base
    // frontSeatHeating: false, // Already false in base
    // automaticDimmingRearviewMirror: false, // Already false in base
    variantId: variants.standard.id,
  };

  // Extended Range Specific
  const extendedComfort = {
    ...comfortBase,
    // multiColorAmbientLighting: true, // Already true in base
    // eightWayPowerSeats: true, // Already true in base
    // frontSeatHeating: true, // Already true in base
    // automaticDimmingRearviewMirror: true, // Already true in base
    variantId: variants.extended.id,
  };


  const comfortPromises = [
     prisma.comfortFeatures.create({ data: standardComfort }),
     prisma.comfortFeatures.create({ data: extendedComfort }),
  ];

  await Promise.all(comfortPromises);
  console.log('DOLPHIN comfort features seeded');
} 