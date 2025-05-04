import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedM6() {
  console.log('Seeding BYD M6 data...');

  // สร้างข้อมูลพื้นฐานของรถ
  const M6_MODEL = await prisma.carModel.create({ // Use create
    data: {
      model: "BYD M6",
      slug: "byd-m6",
      tagline: "MPV ไฟฟ้าสำหรับครอบครัว กว้างขวางและสะดวกสบาย",
      description: "MPV ไฟฟ้า 7 ที่นั่งรุ่นใหม่ล่าสุดจาก BYD ที่มาพร้อมความสะดวกสบายและเทคโนโลยีล้ำสมัย",
      basePrice: 1160000, // ราคาเริ่มต้น (Dynamic 6-seat)
      imageUrlPromo: "/images/cars/m6/m6-promo.webp", // Consistent path
      imageUrlModel: "/images/cars/m6/m6-model.webp", // Consistent path
      // Removed old/extra image URLs
      imageWidth: 1200,
      imageHeight: 800,
      featuresTitle: "ความสะดวกสบายสำหรับทุกคนในครอบครัว",
      // Removed specialFeature fields
      // Removed specsOverview
      promotion: [ // ข้อมูลโปรโมชั่นจาก carModel.ts
        "ประกันภัยชั้น 1 พร้อม พรบ. ระยะเวลา 1 ปี",
        "บริการช่วยเหลือฉุกเฉิน ตลอด 24 ชั่วโมง 8 ปีเต็ม",
        "รับประกันตัวรถ (WARRANTY) 8 ปี หรือ 160,000 กม.",
        "รับประกันแบตเตอรี่ 8 ปี หรือ 160,000 กม.",
        "สายต่อพ่วงอุปกรณ์ไฟฟ้า หรือ V TO L", // Kept V2L wording
        "สายชาร์จเคลื่อนที่ AC PORTABLE CHARGER",
        "พรมเข้ารูป กรอบป้ายทะเบียน ฟิล์มหน้าจอ", // Simplified
        "ค่าจดทะเบียนรถ", // Simplified
        "ฟรี ฟิล์มกรองแสง (ยี่ห้อ/รุ่น ตามโปรโมชั่น ณ เวลานั้น)" // Generalized film promo
      ],
      gallery: [
        "/images/cars/m6/gallery/1.webp", // Consistent path
        "/images/cars/m6/gallery/2.webp",
        "/images/cars/m6/gallery/3.webp",
      ],
      // Removed inline relations (colors, features, techHighlights, variants)
    }
  });
  console.log('Created BYD M6 model');

  // เพิ่มสีรถ
  await seedM6Colors(M6_MODEL.id);

  // สร้างรุ่นย่อย
  const variants = await seedM6Variants(M6_MODEL.id);

  // เพิ่มข้อมูลสเปคทางเทคนิค
  await Promise.all([
    seedM6Dimensions(variants),
    seedM6Powertrain(variants),
    seedM6Performance(variants),
    seedM6Battery(variants),
    seedM6Suspension(variants),
    seedM6Charging(variants),
    seedM6Safety(variants),
    seedM6Exterior(variants),
    seedM6Interior(variants),
    seedM6Entertainment(variants),
    seedM6Lighting(variants),
    seedM6Comfort(variants),
  ]);

  console.log('BYD M6 data seeded successfully!');
  return M6_MODEL;
}

// ฟังก์ชันเพิ่มสีรถ
async function seedM6Colors(carModelId: number) {
  const colors = [
    {
      name: "Emperor Black", // Changed name slightly
      code: "#000000",
      image: "/images/cars/m6/colors/emperor-black.webp", // Consistent path
      gradient: "linear-gradient(180deg, #333333 0%, #000000 100%)",
      shadow: "#000000",
      border: "#222222",
    },
    {
      name: "Alpine White", // Changed name slightly
      code: "#FFFFFF",
      image: "/images/cars/m6/colors/alpine-white.webp", // Consistent path
      gradient: "linear-gradient(180deg, #FFFFFF 0%, #F0F0F0 100%)",
      shadow: "#DEDEDE",
      border: "#EBEBEB",
    },
    {
      name: "Stone Grey", // Added a common grey
      code: "#808080",
      image: "/images/cars/m6/colors/stone-grey.webp", // Consistent path
      gradient: "linear-gradient(180deg, #808080 0%, #666666 100%)",
      shadow: "#555555",
      border: "#777777",
    },
    // Removed Quartz Blue, Harbour Grey - simplified color choices
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
  console.log('M6 colors seeded');
}

// ฟังก์ชันสร้างรุ่นย่อย
async function seedM6Variants(carModelId: number) {
  const dynamic6Seat = await prisma.carVariant.create({
    data: {
      variantId: "M6-DYNAMIC-6SEAT", // Uppercase model
      name: "Dynamic 6-seat",
      price: 1160000,
      range: "420 กม. (NEDC)",
      power: "120 กิโลวัตต์",
      acceleration: "9.5 วินาที (โดยประมาณ)", // Provided estimate
      carModelId,
    },
  });

  const extended6Seat = await prisma.carVariant.create({
    data: {
      variantId: "M6-EXTENDED-6SEAT", // Uppercase model
      name: "Extended 6-seat",
      price: 1260000,
      range: "530 กม. (NEDC)",
      power: "150 กิโลวัตต์",
      acceleration: "8.5 วินาที",
      carModelId,
    },
  });

  const extended7Seat = await prisma.carVariant.create({
    data: {
      variantId: "M6-EXTENDED-7SEAT", // Uppercase model
      name: "Extended 7-seat",
      price: 1290000,
      range: "530 กม. (NEDC)",
      power: "150 กิโลวัตต์",
      acceleration: "8.5 วินาที",
      carModelId,
    },
  });

  console.log('M6 variants seeded');
  return { dynamic6Seat, extended6Seat, extended7Seat };
}

// Helper type for variants
type M6Variants = {
  dynamic6Seat: { id: number };
  extended6Seat: { id: number };
  extended7Seat: { id: number };
};

// ฟังก์ชันเพิ่มข้อมูลขนาดและน้ำหนัก
async function seedM6Dimensions(variants: M6Variants) {
  const dimensions = [
    { // Dynamic 6-seat
      length: 4710,
      width: 1810,
      height: 1690,
      wheelbase: 2800,
      frontTrack: 1540,
      rearTrack: 1530,
      groundClearance: 140,
      unladenWeight: 1780,
      // grossWeight: 2279, // Schema might not have this
      variantId: variants.dynamic6Seat.id,
    },
    { // Extended 6-seat
      length: 4710,
      width: 1810,
      height: 1690,
      wheelbase: 2800,
      frontTrack: 1540,
      rearTrack: 1530,
      groundClearance: 140,
      unladenWeight: 1895,
      // grossWeight: 2394,
      variantId: variants.extended6Seat.id,
    },
    { // Extended 7-seat
      length: 4710,
      width: 1810,
      height: 1690,
      wheelbase: 2800,
      frontTrack: 1540,
      rearTrack: 1530,
      groundClearance: 140,
      unladenWeight: 1915,
      // grossWeight: 2489,
      variantId: variants.extended7Seat.id,
    },
  ];

  const dimensionPromises = dimensions.map(dim =>
    prisma.dimensionsWeight.create({ data: dim })
  );

  await Promise.all(dimensionPromises);
  console.log('M6 dimensions seeded');
}

// ฟังก์ชันเพิ่มข้อมูลระบบขับเคลื่อน
async function seedM6Powertrain(variants: M6Variants) {
  const powertrainPromises = [
    prisma.powertrainSystem.create({ // Dynamic 6-seat
      data: {
        driveType: 'FWD',
        frontMotorType: 'Permanent Magnet Synchronous Motor (PMSM)', // Abbreviated
        frontMotorPower: 120,
        frontMotorTorque: 220, // Estimated Torque for Dynamic
        totalSystemPower: 120,
        totalSystemTorque: 220, // Estimated
        variantId: variants.dynamic6Seat.id,
      },
    }),
    prisma.powertrainSystem.create({ // Extended 6-seat
      data: {
        driveType: 'FWD',
        frontMotorType: 'Permanent Magnet Synchronous Motor (PMSM)',
        frontMotorPower: 150,
        frontMotorTorque: 310,
        totalSystemPower: 150,
        totalSystemTorque: 310,
        variantId: variants.extended6Seat.id,
      },
    }),
    prisma.powertrainSystem.create({ // Extended 7-seat
      data: {
        driveType: 'FWD',
        frontMotorType: 'Permanent Magnet Synchronous Motor (PMSM)',
        frontMotorPower: 150,
        frontMotorTorque: 310,
        totalSystemPower: 150,
        totalSystemTorque: 310,
        variantId: variants.extended7Seat.id,
      },
    }),
  ];

  await Promise.all(powertrainPromises);
  console.log('M6 powertrain systems seeded');
}

// ฟังก์ชันเพิ่มข้อมูลสมรรถนะ
async function seedM6Performance(variants: M6Variants) {
  const performancePromises = [
    prisma.performance.create({ // Dynamic 6-seat
      data: {
        acceleration0To100: 9.5, // Estimated
        range: 420, // NEDC
        topSpeed: 150, // Estimated
        seatingCapacity: 6,
        variantId: variants.dynamic6Seat.id,
      },
    }),
    prisma.performance.create({ // Extended 6-seat
      data: {
        acceleration0To100: 8.5,
        range: 530, // NEDC
        topSpeed: 160, // Estimated
        seatingCapacity: 6,
        variantId: variants.extended6Seat.id,
      },
    }),
    prisma.performance.create({ // Extended 7-seat
      data: {
        acceleration0To100: 8.5,
        range: 530, // NEDC
        topSpeed: 160, // Estimated
        seatingCapacity: 7,
        variantId: variants.extended7Seat.id,
      },
    }),
  ];

  await Promise.all(performancePromises);
  console.log('M6 performance data seeded');
}

// ฟังก์ชันเพิ่มข้อมูลแบตเตอรี่
async function seedM6Battery(variants: M6Variants) {
  const batteryPromises = [
    prisma.battery.create({ // Dynamic 6-seat
      data: {
        type: 'BYD Blade Battery (LFP)',
        capacity: 55.4, // kWh
        variantId: variants.dynamic6Seat.id,
      },
    }),
    prisma.battery.create({ // Extended 6-seat
      data: {
        type: 'BYD Blade Battery (LFP)',
        capacity: 71.8, // kWh
        variantId: variants.extended6Seat.id,
      },
    }),
    prisma.battery.create({ // Extended 7-seat
      data: {
        type: 'BYD Blade Battery (LFP)',
        capacity: 71.8, // kWh
        variantId: variants.extended7Seat.id,
      },
    }),
  ];

  await Promise.all(batteryPromises);
  console.log('M6 battery data seeded');
}

// ฟังก์ชันเพิ่มข้อมูลระบบกันสะเทือนและเบรก
async function seedM6Suspension(variants: M6Variants) {
  const suspensionBase = {
      frontSuspension: 'MacPherson Strut', // English
      rearSuspension: 'Multi-link', // English
      adaptiveSuspension: false,
      frontBrakeType: 'Vented Disc', // English
      rearBrakeType: 'Disc', // English
      tireSize: '225/55 R17',
  };

  const suspensionPromises = [
    prisma.suspensionBraking.create({ // Dynamic 6-seat
      data: {
        ...suspensionBase,
        regenerativeBraking: false, // Dynamic might lack it
        variantId: variants.dynamic6Seat.id,
      },
    }),
    prisma.suspensionBraking.create({ // Extended 6-seat
      data: {
        ...suspensionBase,
        regenerativeBraking: true,
        variantId: variants.extended6Seat.id,
      },
    }),
    prisma.suspensionBraking.create({ // Extended 7-seat
      data: {
        ...suspensionBase,
        regenerativeBraking: true,
        variantId: variants.extended7Seat.id,
      },
    }),
  ];

  await Promise.all(suspensionPromises);
  console.log('M6 suspension and braking data seeded');
}

// ฟังก์ชันเพิ่มข้อมูลระบบชาร์จ
async function seedM6Charging(variants: M6Variants) {
  const chargingBase = {
    acChargerType: 'Type 2',
    acChargerPower: 7, // kW
    dcChargerType1: 'CCS2', // Consistent naming
  };

  const chargingPromises = [
    prisma.chargingSystem.create({ // Dynamic 6-seat
      data: {
        ...chargingBase,
        dcChargerPower1: 85, // kW
        v2lSupport: false,
        v2lAdapter: false,
        regenerativeBraking: false, // Match suspension data
        variantId: variants.dynamic6Seat.id,
      },
    }),
    prisma.chargingSystem.create({ // Extended 6-seat
      data: {
        ...chargingBase,
        dcChargerPower1: 115, // kW
        v2lSupport: true,
        v2lAdapter: true,
        regenerativeBraking: true, // Match suspension data
        variantId: variants.extended6Seat.id,
      },
    }),
    prisma.chargingSystem.create({ // Extended 7-seat
      data: {
        ...chargingBase,
        dcChargerPower1: 115, // kW
        v2lSupport: true,
        v2lAdapter: true,
        regenerativeBraking: true, // Match suspension data
        variantId: variants.extended7Seat.id,
      },
    }),
  ];

  await Promise.all(chargingPromises);
  console.log('M6 charging systems seeded');
}

// ฟังก์ชันเพิ่มข้อมูลความปลอดภัย
async function seedM6Safety(variants: M6Variants) {
  // Base features common to all or most
  const safetyBase = {
    frontAirbags: true,
    sideAirbags: true,
    curtainAirbags: true,
    kneeBolsterAirbags: false,
    tirePressureMonitoring: true, // TPMS
    abs: true,
    ebd: true,
    esc: true,
    tcs: true,
    hillHoldControl: true, // HHC
    autoHoldFunction: true, // AVH
    aeb: true,
    forwardCollisionWarning: true, // FCW
    laneDepartureWarning: true, // LDA
    adaptiveCruiseControl: true, // ACC
    rearParkingSensors: true, // 4 จุด
    surroundViewCamera: true, // กล้อง 360
    automaticHeadlights: true,
    bhsSystem: true, // Brake Override System (BOS)
    drivingAssistanceSystem: true, // General ADAS flag
    brakeDiscWiping: true, // BDW
    rolloverMitigation: true, // CRM
    // Fields likely only on Extended or not present
    laneKeepAssist: false,
    blindSpotMonitoring: false,
    rearCrossTrafficAlert: false,
    trafficSignRecognition: false,
    driverAttentionMonitor: false,
    frontParkingSensors: false,
    highBeamAssist: false,
    rainSensingWipers: false,
    doorOpenWarningSystem: false,
    intelligentHeadlights: false,
    headsUpDisplay: false,
    intelligentTorqueControl: false,
    rearCollisionWarning: false,
    rearCrossTrafficBrake: false,
    intelligentCruiseControl: false,
    curveSpeedControl: false,
  };

  // Dynamic Specific
  const dynamicSafety = {
    ...safetyBase,
    variantId: variants.dynamic6Seat.id,
    // Dynamic might lack some features present in base for Extended
  };

  // Extended Specific (6 and 7 seat share these)
  const extendedSafetyData = {
    ...safetyBase,
    laneKeepAssist: true, // LKA/ELKA
    blindSpotMonitoring: true, // BSD
    rearCrossTrafficAlert: true, // RCTA
    highBeamAssist: true, // IHBC
    doorOpenWarningSystem: true, // DOW
    rearCollisionWarning: true, // RCW
    rearCrossTrafficBrake: true, // RCTB
    intelligentCruiseControl: true, // ICC
    // frontParkingSensors: true, // Assuming Extended adds front sensors
  };

  const safetyPromises = [
    prisma.safetyFeatures.create({ data: dynamicSafety }),
    prisma.safetyFeatures.create({ data: { ...extendedSafetyData, variantId: variants.extended6Seat.id } }),
    prisma.safetyFeatures.create({ data: { ...extendedSafetyData, variantId: variants.extended7Seat.id } }),
  ];

  await Promise.all(safetyPromises);
  console.log('M6 safety features seeded');
}

// ฟังก์ชันเพิ่มอุปกรณ์ภายนอก
async function seedM6Exterior(variants: M6Variants) {
  const exteriorBase = {
      electricSunroof: false, // M6 uses Panoramic
      rearWiperWithIntermittentFunction: true,
      rearWindowHeatedWithTimer: true,
      powerFoldingMirrors: true,
      autoFoldingMirrors: true,
      memoryPositionMirrors: false,
      antiPinchWindowsWithOneTouchSystem: true, // ทุกบาน
      frontRearParkingSensors: true, // Presence handled in safety
      heatedSideView: true, // กระจกมองข้างพร้อมระบบไล่ฝ้า
      // Add fields required by schema but potentially variant-specific
      panoramicGlassRoof: false,
      electricTailgate: false,
      roofRails: false,
      // Fields specific to M6 (already in original data)
      remoteWindowOperation: true, // ระบบควบคุมการเปิด-ปิดกระจกหน้าต่างระยะไกล
      autoDimmingSideMirrors: true, // กระจกมองข้างปรับลดแสงสะท้อนอัตโนมัติ
  };

  const exteriorPromises = [
    prisma.exteriorFeatures.create({ // Dynamic 6-seat
      data: {
        ...exteriorBase,
        variantId: variants.dynamic6Seat.id,
      },
    }),
    prisma.exteriorFeatures.create({ // Extended 6-seat
      data: {
        ...exteriorBase,
        panoramicGlassRoof: true,
        electricTailgate: true,
        roofRails: true,
        variantId: variants.extended6Seat.id,
      },
    }),
    prisma.exteriorFeatures.create({ // Extended 7-seat
      data: {
        ...exteriorBase,
        panoramicGlassRoof: true,
        electricTailgate: true,
        roofRails: true,
        variantId: variants.extended7Seat.id,
      },
    }),
  ];

  await Promise.all(exteriorPromises);
  console.log('M6 exterior features seeded');
}

// ฟังก์ชันเพิ่มอุปกรณ์ภายใน
async function seedM6Interior(variants: M6Variants) {
  const interiorBase = {
      multiColorAmbientLighting: true, // ไฟสร้างบรรยากาศในห้องโดยสาร
      leatherSyntheticSeats: true, // เบาะหนังสังเคราะห์
      leatherSeats: false,
      lcdDisplay10Inch: true, // หน้าจอเรือนไมล์ LCD ขนาด 5 นิ้ว (Schema name is misleading)
      centerConsoleStorage: true, // ที่เก็บของคอนโซลกลาง
      syntheticLeatherSteeringWheel: true, // พวงมาลัยหุ้มหนังสังเคราะห์
      leatherSteeringWheel: false,
      frontSeatHeating: false,
      electricMemorySeatDrivers: false,
      steeringWheelHeatedAndMemory: false,
      twoWaySunshades: true, // ที่บังแดดพร้อมกระจกแต่งหน้าและไฟส่องสว่าง
      adjustableRearHeadRests: true, // พนักพิงศีรษะเบาะหลังปรับระดับได้
      rearHeadRests2Way: false,
      automaticDimmingRearviewMirror: true, // กระจกมองหลังตัดแสงอัตโนมัติ
      framelessRearviewMirror: false,
      antiBurglaryDoorPillar: false,
      frontIlluminatedVanityMirror: true, // ที่บังแดดด้านหน้าพร้อมกระจกและไฟส่องสว่าง
      foldableThirdRowSeats: true, // เบาะแถว 3 พับราบได้
      // Add fields required by schema but potentially variant-specific
      eightWayPowerSeats: false,
      backSeat4WayAdjustment: false,
      ventilatedSeatsWithACSystem: false,
      rearArmrest: false,
      foldableSecondRowSeats: false,
  };

  const interiorPromises = [
    prisma.interiorFeatures.create({ // Dynamic 6-seat
      data: {
        ...interiorBase,
        variantId: variants.dynamic6Seat.id,
      },
    }),
    prisma.interiorFeatures.create({ // Extended 6-seat
      data: {
        ...interiorBase,
        eightWayPowerSeats: true, // คนขับ 6 ทิศทาง
        backSeat4WayAdjustment: true, // ผู้โดยสารหน้า 4 ทิศทาง
        ventilatedSeatsWithACSystem: true,
        rearArmrest: true,
        // foldableSecondRowSeats: false, // 6 seat doesn't fold 60:40
        variantId: variants.extended6Seat.id,
      },
    }),
    prisma.interiorFeatures.create({ // Extended 7-seat
      data: {
        ...interiorBase,
        eightWayPowerSeats: true,
        backSeat4WayAdjustment: true,
        ventilatedSeatsWithACSystem: true,
        rearArmrest: true,
        foldableSecondRowSeats: true, // 7 seat folds 60:40
        variantId: variants.extended7Seat.id,
      },
    }),
  ];

  await Promise.all(interiorPromises);
  console.log('M6 interior features seeded');
}

// ฟังก์ชันเพิ่มระบบความบันเทิง
async function seedM6Entertainment(variants: M6Variants) {
  // All variants share the same entertainment features based on original data
  const entertainmentData = {
      fmRadio: true,
      appleCarPlayAndroid: true, // รองรับ Apple CarPlay® และ Android Auto™
      bluetoothConnectivity: true,
      touchscreen15Inch: true, // หน้าจอสัมผัสขนาดใหญ่ 12.8 นิ้ว ปรับหมุนได้
      dynAudio12Speakers: false, // ลำโพง 6 ตำแหน่ง
      thaiVoiceControl: true, // ระบบสั่งการด้วยเสียงภาษาไทย
      ambientTemperatureDisplay: true, // แสดงอุณหภูมิภายนอก
      digitalRadio: false,
      frontUsbTypeAC: true, // ช่อง USB-A และ USB-C อย่างละ 1 ตำแหน่ง สำหรับผู้โดยสารตอนหน้า
      rearUsbTypeAC: true, // ช่อง USB-A และ USB-C อย่างละ 1 ตำแหน่ง สำหรับผู้โดยสารแถวที่ 2
      otaUpdateSupport: true, // รองรับการอัปเดตซอฟต์แวร์ผ่านทาง OTA
      speakerCount: 6,
  };

  const entertainmentPromises = [
    prisma.entertainmentFeatures.create({ data: { ...entertainmentData, variantId: variants.dynamic6Seat.id } }),
    prisma.entertainmentFeatures.create({ data: { ...entertainmentData, variantId: variants.extended6Seat.id } }),
    prisma.entertainmentFeatures.create({ data: { ...entertainmentData, variantId: variants.extended7Seat.id } }),
  ];

  await Promise.all(entertainmentPromises);
  console.log('M6 entertainment features seeded');
}

// ฟังก์ชันเพิ่มระบบไฟ
async function seedM6Lighting(variants: M6Variants) {
  // All variants share the same lighting features based on original data
  const lightingData = {
      ledHeadlights: true, // ไฟหน้าแบบ LED
      followMeHomeFunction: true, // ฟังก์ชันหน่วงเวลาการปิดไฟหน้า
      ledDaytimeRunningLights: true, // ไฟส่องสว่างสำหรับการขับขี่กลางวันแบบ LED
      ledTaillights: true, // ไฟท้ายแบบ LED
      rearFogLights: false,
      sequentialRearTurnSignals: true, // ระบบไฟเลี้ยวด้านหลังแบบ Sequential
      thirdBrakeLights: true, // ไฟเบรกดวงที่ 3
      rgbDynamicMoodLights: true, // ไฟสร้างบรรยากาศในห้องโดยสาร
      frontReadingLights: true, // ไฟอ่านแผนที่ด้านหน้าแบบ LED
      rearReadingLights: true, // ไฟส่องสว่างในห้องโดยสารตอนหลังแบบ LED
      doorSillScuffPlates: false,
  };

  const lightingPromises = [
    prisma.lightingFeatures.create({ data: { ...lightingData, variantId: variants.dynamic6Seat.id } }),
    prisma.lightingFeatures.create({ data: { ...lightingData, variantId: variants.extended6Seat.id } }),
    prisma.lightingFeatures.create({ data: { ...lightingData, variantId: variants.extended7Seat.id } }),
  ];

  await Promise.all(lightingPromises);
  console.log('M6 lighting features seeded');
}

// ฟังก์ชันเพิ่มอุปกรณ์อำนวยความสะดวก
async function seedM6Comfort(variants: M6Variants) {
  const comfortBase = {
      keylessEntry: true, // ระบบ Keyless Entry
      nfcCardKey: true, // ระบบกุญแจอิเล็กทรอนิกส์แบบการ์ด NFC
      twelveVoltOutlet: true, // ช่องจ่ายไฟ 12V
      dualZoneClimateControl: true, // ระบบปรับอากาศอัตโนมัติ
      rearAirVents: true, // ช่องแอร์สำหรับผู้โดยสารตอนหลัง
      // Add fields required by schema but potentially variant-specific or not present
      wirelessPhoneChargers: false,
      pm25AirFilter: false,
      cn95AirFilter: false,
      airIonizer: false,
      firstAidKit: false,
      emergencyKit: false,
      bydDigitalKey: false,
      // Fields moved from interior
      rearArmrest: false, // Default false, set true for extended in interior seeding
      foldableSecondRowSeats: false, // Default false, set true for 7seat in interior seeding
  };

  const comfortPromises = [
    prisma.comfortFeatures.create({ // Dynamic 6-seat
      data: {
        ...comfortBase,
        variantId: variants.dynamic6Seat.id,
      },
    }),
    prisma.comfortFeatures.create({ // Extended 6-seat
      data: {
        ...comfortBase,
        wirelessPhoneChargers: true,
        pm25AirFilter: true,
        bydDigitalKey: true,
        variantId: variants.extended6Seat.id,
      },
    }),
    prisma.comfortFeatures.create({ // Extended 7-seat
      data: {
        ...comfortBase,
        wirelessPhoneChargers: true,
        pm25AirFilter: true,
        bydDigitalKey: true,
        variantId: variants.extended7Seat.id,
      },
    }),
  ];

  await Promise.all(comfortPromises);
  console.log('M6 comfort features seeded');
}