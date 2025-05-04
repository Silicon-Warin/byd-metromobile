import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedAtto3() {
  console.log('Seeding BYD ATTO3 data...');
  
  // สร้างข้อมูลพื้นฐานของรถ
  const ATTO3_MODEL = await prisma.carModel.create({
    data: {
      model: 'BYD ATTO3',
      description: 'รถยนต์ไฟฟ้าอเนกประสงค์ขนาดกะทัดรัด พร้อมเทคโนโลยีล้ำสมัยและดีไซน์โฉบเฉี่ยว',
      basePrice: 1090000,
      imageUrlPromo: '/images/cars/atto3/atto3-promo.webp',
      imageUrlModel: '/images/cars/atto3/atto3-model.webp',
      imageWidth: 1200,
      imageHeight: 800,
      featuresTitle: 'นวัตกรรมแห่งอนาคต',
      slug: 'atto3',
      tagline: 'คุณภาพเหนือระดับ ประสิทธิภาพเกินคาด',
      gallery: [
        '/images/cars/atto3/gallery/1.webp',
        '/images/cars/atto3/gallery/2.webp',
        '/images/cars/atto3/gallery/3.webp',
      ],
      promotion: [
        'รับประกันแบตเตอรี่ 8 ปี หรือ 150,000 กิโลเมตร',
        'บริการช่วยเหลือฉุกเฉิน 24 ชั่วโมง',
        'รับประกันรถยนต์ 6 ปี หรือ 150,000 กิโลเมตร',
      ],
    },
  });

  // เพิ่มสีรถ
  await seedAtto3Colors(ATTO3_MODEL.id);
  
  // สร้างรุ่นย่อย
  const variants = await seedAtto3Variants(ATTO3_MODEL.id);
  
  // เพิ่มข้อมูลสเปคทางเทคนิค
  await Promise.all([
    seedAtto3Dimensions(variants),
    seedAtto3Powertrain(variants),
    seedAtto3Performance(variants),
    seedAtto3Battery(variants),
    seedAtto3Suspension(variants),
    seedAtto3Charging(variants),
    seedAtto3Safety(variants),
    seedAtto3Exterior(variants),
    seedAtto3Interior(variants),
    seedAtto3Entertainment(variants),
    seedAtto3Lighting(variants),
    seedAtto3Comfort(variants),
  ]);

  console.log('BYD ATTO3 data seeded successfully!');
  return ATTO3_MODEL;
}

// ฟังก์ชันเพิ่มสีรถ
async function seedAtto3Colors(carModelId: number) {
  const colors = [
    {
      name: 'Frost White',
      code: '#FFFFFF',
      image: '/images/cars/atto3/colors/frost-white.webp',
      gradient: 'linear-gradient(180deg, #FFFFFF 0%, #F0F0F0 100%)',
      shadow: '#DEDEDE',
      border: '#EBEBEB',
    },
    {
      name: 'Graphite Grey',
      code: '#555555',
      image: '/images/cars/atto3/colors/graphite-grey.webp',
      gradient: 'linear-gradient(180deg, #555555 0%, #333333 100%)',
      shadow: '#222222',
      border: '#444444',
    },
    {
      name: 'Quantum Black',
      code: '#000000',
      image: '/images/cars/atto3/colors/quantum-black.webp',
      gradient: 'linear-gradient(180deg, #333333 0%, #000000 100%)',
      shadow: '#000000',
      border: '#222222',
    },
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
  console.log('ATTO3 colors seeded');
}

// ฟังก์ชันสร้างรุ่นย่อย
async function seedAtto3Variants(carModelId: number) {
  const premiumVariant = await prisma.carVariant.create({
    data: {
      variantId: 'ATTO3-PREMIUM',
      name: 'Premium',
      price: 1090000,
      range: '410 กม. (NEDC)',
      power: '150 กิโลวัตต์',
      acceleration: '7.9 วินาที',
      carModelId,
    },
  });

  const extendedVariant = await prisma.carVariant.create({
    data: {
      variantId: 'ATTO3-EXTENDED',
      name: 'Extended',
      price: 1190000,
      range: '480 กม. (NEDC)',
      power: '150 กิโลวัตต์',
      acceleration: '7.3 วินาที',
      carModelId,
    },
  });
  
  console.log('ATTO3 variants seeded');
  return { premium: premiumVariant, extended: extendedVariant };
}

// ฟังก์ชันเพิ่มข้อมูลขนาดและน้ำหนัก
async function seedAtto3Dimensions(variants: any) {
  const dimensions = [
    {
      length: 4455,
      width: 1875,
      height: 1615,
      wheelbase: 2720,
      frontTrack: 1575,
      rearTrack: 1580,
      groundClearance: 175,
      unladenWeight: 1680,
      variantId: variants.premium.id,
    },
    {
      length: 4455,
      width: 1875,
      height: 1615,
      wheelbase: 2720,
      frontTrack: 1575,
      rearTrack: 1580,
      groundClearance: 175,
      unladenWeight: 1750,
      variantId: variants.extended.id,
    },
  ];

  const dimensionPromises = dimensions.map(dim => 
    prisma.dimensionsWeight.create({ data: dim })
  );

  await Promise.all(dimensionPromises);
  console.log('ATTO3 dimensions seeded');
}

// ฟังก์ชันเพิ่มข้อมูลระบบขับเคลื่อน
async function seedAtto3Powertrain(variants: any) {
  const powertrainBase = {
    driveType: 'FWD',
    rearMotorType: 'Permanent Magnet Synchronous Motor',
    rearMotorPower: 150,
    rearMotorTorque: 310,
    totalSystemPower: 150,
    totalSystemTorque: 310,
  };

  const powertrainPromises = [
    prisma.powertrainSystem.create({
      data: {
        ...powertrainBase,
        variantId: variants.premium.id,
      },
    }),
    prisma.powertrainSystem.create({
      data: {
        ...powertrainBase,
        variantId: variants.extended.id,
      },
    }),
  ];

  await Promise.all(powertrainPromises);
  console.log('ATTO3 powertrain systems seeded');
}

// ฟังก์ชันเพิ่มข้อมูลสมรรถนะ
async function seedAtto3Performance(variants: any) {
  const performancePromises = [
    prisma.performance.create({
      data: {
        acceleration0To100: 7.9,
        range: 410,
        topSpeed: 160,
        seatingCapacity: 5,
        variantId: variants.premium.id,
      },
    }),
    prisma.performance.create({
      data: {
        acceleration0To100: 7.3,
        range: 480,
        topSpeed: 160,
        seatingCapacity: 5,
        variantId: variants.extended.id,
      },
    }),
  ];

  await Promise.all(performancePromises);
  console.log('ATTO3 performance data seeded');
}

// ฟังก์ชันเพิ่มข้อมูลแบตเตอรี่
async function seedAtto3Battery(variants: any) {
  const batteryPromises = [
    prisma.battery.create({
      data: {
        type: 'BYD Blade Battery',
        capacity: 50.25,
        variantId: variants.premium.id,
      },
    }),
    prisma.battery.create({
      data: {
        type: 'BYD Blade Battery',
        capacity: 60.48,
        variantId: variants.extended.id,
      },
    }),
  ];

  await Promise.all(batteryPromises);
  console.log('ATTO3 battery data seeded');
}

// ฟังก์ชันเพิ่มข้อมูลระบบกันสะเทือนและเบรก
async function seedAtto3Suspension(variants: any) {
  const suspensionBase = {
    frontSuspension: 'แม็คเฟอร์สันสตรัท',
    rearSuspension: 'มัลติลิงค์',
    adaptiveSuspension: false,
    frontBrakeType: 'ดิสก์มีครีบระบายความร้อน',
    rearBrakeType: 'ดิสก์เบรก',
    regenerativeBraking: true,
    tireSize: '235/50 R18',
  };

  const suspensionPromises = [
    prisma.suspensionBraking.create({
      data: {
        ...suspensionBase,
        variantId: variants.premium.id,
      },
    }),
    prisma.suspensionBraking.create({
      data: {
        ...suspensionBase,
        variantId: variants.extended.id,
      },
    }),
  ];

  await Promise.all(suspensionPromises);
  console.log('ATTO3 suspension and braking data seeded');
}

// ฟังก์ชันเพิ่มข้อมูลระบบชาร์จ
async function seedAtto3Charging(variants: any) {
  const chargingPromises = [
    prisma.chargingSystem.create({
      data: {
        acChargerType: 'Type 2',
        acChargerPower: 7,
        dcChargerType1: 'CCS2',
        dcChargerPower1: 70,
        v2lSupport: true,
        v2lAdapter: true,
        regenerativeBraking: true,
        variantId: variants.premium.id,
      },
    }),
    prisma.chargingSystem.create({
      data: {
        acChargerType: 'Type 2',
        acChargerPower: 7,
        dcChargerType1: 'CCS2',
        dcChargerPower1: 88,
        v2lSupport: true,
        v2lAdapter: true,
        regenerativeBraking: true,
        variantId: variants.extended.id,
      },
    }),
  ];

  await Promise.all(chargingPromises);
  console.log('ATTO3 charging systems seeded');
}

// ฟังก์ชันเพิ่มข้อมูลความปลอดภัย
async function seedAtto3Safety(variants: any) {
  // ฟีเจอร์ความปลอดภัยพื้นฐานที่ทั้งสองรุ่นมีเหมือนกัน
  const safetyBase = {
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
    trafficSignRecognition: false,
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
    headsUpDisplay: false,
    intelligentTorqueControl: false,
    rearCollisionWarning: true,
    brakeDiscWiping: true,
    curveSpeedControl: false,
    rolloverMitigation: false,
  };

  // รุ่น Premium
  const premiumSafety = {
    ...safetyBase,
    rearCrossTrafficBrake: false,
    intelligentCruiseControl: false,
    variantId: variants.premium.id,
  };

  // รุ่น Extended
  const extendedSafety = {
    ...safetyBase,
    rearCrossTrafficBrake: true,
    intelligentCruiseControl: true,
    variantId: variants.extended.id,
  };

  const safetyPromises = [
    prisma.safetyFeatures.create({ data: premiumSafety }),
    prisma.safetyFeatures.create({ data: extendedSafety }),
  ];

  await Promise.all(safetyPromises);
  console.log('ATTO3 safety features seeded');
}

// ฟังก์ชันเพิ่มอุปกรณ์ภายนอก
async function seedAtto3Exterior(variants: any) {
  const exteriorBase = {
    panoramicGlassRoof: true,
    electricSunroof: false,
    rearWiperWithIntermittentFunction: true,
    electricTailgate: true,
    rearWindowHeatedWithTimer: true,
    powerFoldingMirrors: true,
    autoFoldingMirrors: true,
    memoryPositionMirrors: false,
    antiPinchWindowsWithOneTouchSystem: true,
    frontRearParkingSensors: true,
    heatedSideView: true,
    roofRails: true,
  };

  const exteriorPromises = [
    prisma.exteriorFeatures.create({
      data: {
        ...exteriorBase,
        variantId: variants.premium.id,
      },
    }),
    prisma.exteriorFeatures.create({
      data: {
        ...exteriorBase,
        variantId: variants.extended.id,
      },
    }),
  ];

  await Promise.all(exteriorPromises);
  console.log('ATTO3 exterior features seeded');
}

// ฟังก์ชันเพิ่มอุปกรณ์ภายใน
async function seedAtto3Interior(variants: any) {
  const interiorBase = {
    multiColorAmbientLighting: true,
    leatherSyntheticSeats: true,
    leatherSeats: false,
    lcdDisplay10Inch: true,
    centerConsoleStorage: true,
    syntheticLeatherSteeringWheel: true,
    leatherSteeringWheel: false,
    eightWayPowerSeats: true,
    backSeat4WayAdjustment: true,
    frontSeatHeating: true,
    ventilatedSeatsWithACSystem: false,
    electricMemorySeatDrivers: true,
    steeringWheelHeatedAndMemory: false,
    twoWaySunshades: true,
    adjustableRearHeadRests: true,
    rearHeadRests2Way: true,
    automaticDimmingRearviewMirror: true,
    framelessRearviewMirror: true,
    antiBurglaryDoorPillar: true,
    frontIlluminatedVanityMirror: true,
    rearArmrest: true,
    foldableSecondRowSeats: true,
  };

  const interiorPromises = [
    prisma.interiorFeatures.create({
      data: {
        ...interiorBase,
        variantId: variants.premium.id,
      },
    }),
    prisma.interiorFeatures.create({
      data: {
        ...interiorBase,
        variantId: variants.extended.id,
      },
    }),
  ];

  await Promise.all(interiorPromises);
  console.log('ATTO3 interior features seeded');
}

// ฟังก์ชันเพิ่มระบบความบันเทิง
async function seedAtto3Entertainment(variants: any) {
  const entertainmentBase = {
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
    speakerCount: 8,
  };

  const entertainmentPromises = [
    prisma.entertainmentFeatures.create({
      data: {
        ...entertainmentBase,
        variantId: variants.premium.id,
      },
    }),
    prisma.entertainmentFeatures.create({
      data: {
        ...entertainmentBase,
        variantId: variants.extended.id,
      },
    }),
  ];

  await Promise.all(entertainmentPromises);
  console.log('ATTO3 entertainment features seeded');
}

// ฟังก์ชันเพิ่มระบบไฟ
async function seedAtto3Lighting(variants: any) {
  const lightingBase = {
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
    prisma.lightingFeatures.create({
      data: {
        ...lightingBase,
        variantId: variants.premium.id,
      },
    }),
    prisma.lightingFeatures.create({
      data: {
        ...lightingBase,
        variantId: variants.extended.id,
      },
    }),
  ];

  await Promise.all(lightingPromises);
  console.log('ATTO3 lighting features seeded');
}

// ฟังก์ชันเพิ่มอุปกรณ์อำนวยความสะดวก
async function seedAtto3Comfort(variants: any) {
  const comfortBase = {
    keylessEntry: true,
    nfcCardKey: true,
    wirelessPhoneChargers: true,
    twelveVoltOutlet: true,
    pm25AirFilter: true,
    cn95AirFilter: true,
    airIonizer: true,
    dualZoneClimateControl: true,
    rearAirVents: true,
    firstAidKit: true,
    emergencyKit: true,
    bydDigitalKey: true,
    rearArmrest: true,
    foldableSecondRowSeats: true,
  };

  const comfortPromises = [
    prisma.comfortFeatures.create({
      data: {
        ...comfortBase, 
        variantId: variants.premium.id,
      },
    }),
    prisma.comfortFeatures.create({
      data: {
        ...comfortBase,
        variantId: variants.extended.id,
      },
    }),
  ];

  await Promise.all(comfortPromises);
  console.log('ATTO3 comfort features seeded');
}
