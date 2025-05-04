import { PrismaClient } from '@prisma/client';

export async function seedSealion6dmi(prisma: PrismaClient) {
  console.log('Seeding BYD SEALION 6 DM-i...');

  // 1. สร้าง CarModel สำหรับ BYD SEALION 6 DM-i
  const carModel = await prisma.carModel.upsert({
    where: { slug: "byd-sealion6dmi" },
    update: {}, // ไม่มีการอัปเดตถ้ามีอยู่แล้ว
    create: {
      model: "BYD SEALION 6 DM-i",
      slug: "byd-sealion6dmi",
      description: "SUV Plug-in Hybrid ขับเคลื่อน 4 ล้อ พลังงานสะอาด",
      basePrice: 939900,
      imageUrlPromo: "/images/promotions/sealion6dmi.webp",
      imageUrlModel: "/images/models/sealion6dmi/byd-sealion6dmi-card.webp",
      imageUrlHero: "/images/models/sealion6dmi/sealion6dmi-hero.jpg",
      imageUrlReal: "/images/models/sealion6dmi/sealion6dmi-real.jpg",
      imageWidth: 1200,
      imageHeight: 800,
      featuresTitle: "SUV Plug-in Hybrid สมรรถนะสูง",
      specsOverview: {
        acceleration: "6.9 วินาที",
        range: "200 กิโลเมตร",
        drivetrain: "AWD Premium",
        motor: "มอเตอร์ 320 กิโลวัตต์",
        battery: "18.3 กิโลวัตต์-ชั่วโมง",
        charging: "AC type 2 / DC CCS 2 (18 กิโลวัตต์)",
      },
      promotion: [
        "ประกันภัยชั้น 1 พร้อม พรบ. ระยะเวลา 1 ปี",
        "รับประกันตัวรถ (WARRANTY) 6 ปี หรือ 150,000 กม.",
        "รับประกันแบตเตอรี่ 8 ปี หรือ 160,000 กม.",
        "บริการช่วยเหลือฉุกเฉิน ตลอด 24 ชั่วโมง 8 ปีเต็ม",
        "สายต่อพ่วงอุปกรณ์ไฟฟ้า หรือ V TO L",
        "สายชาร์จเคลื่อนที่ AC PORTABLE CHARGER",
        "พรมเข้ารูป กรอบป้ายทะเบียน ฟิล์มกันรอยหน้าจอ",
        "ค่าจดทะเบียน",
        "ฟรี ฟิล์มกรองแสง XUV-MAX-CERAMIC"
      ],
      colors: {
        create: [
          { name: "Horizon White", code: "#FFFFFF", image: "/images/models/sealion6dmi/sealion6dmi-horizon-white.png" },
          { name: "Quantum Black", code: "#000000", image: "/images/models/sealion6dmi/sealion6dmi-quantum-black.png" },
          { name: "Graphite Grey", code: "#505050", image: "/images/models/sealion6dmi/sealion6dmi-graphite-grey.png" },
        ]
      },
      variants: {
        create: [
          {
            variantId: "sealion6-dynamic",
            name: "Dynamic",
            price: 939900,
            range: "200",
          },
          {
            variantId: "sealion6-premium",
            name: "Premium",
            price: 1039900,
            range: "200",
          },
        ],
      },
    },
  });
  console.log('Created BYD SEALION 6 DM-i model');

  // 2. ค้นหา variants ทั้งหมดของ SEALION 6 DM-i
  const sealion6Variants = await prisma.carVariant.findMany({
    where: {
      carModel: { slug: "byd-sealion6dmi" }
    }
  });
  
  console.log(`Found ${sealion6Variants.length} SEALION 6 DM-i variants`);

  // 3. สร้าง relation ต่างๆ สำหรับแต่ละ variant
  for (const variant of sealion6Variants) {
    console.log(`Creating specifications for ${variant.name} (ID: ${variant.id})`);
    
    const isDynamic = variant.name === "Dynamic";
    const isPremium = variant.name === "Premium";

    // 3.1 สร้าง DimensionsWeight
    await prisma.dimensionsWeight.create({
      data: {
        length: 4775,
        width: 1890,
        height: 1670,
        wheelbase: 2765,
        frontTrack: 1630,
        rearTrack: 1630,
        groundClearance: 180,
        unladenWeight: 1850,
        grossWeight: 2260,
        variantId: variant.id
      }
    });

    // 3.2 สร้าง PowertrainSystem
    await prisma.powertrainSystem.create({
      data: {
        driveType: "ขับเคลื่อนล้อหน้า",
        engineType: "เครื่องยนต์ Xiao Yun ออกแบบเฉพาะลักษณ์ไฮบริด 1.5 ลิตร",
        enginePower: 72,
        engineTorque: 122,
        frontMotorType: "มอเตอร์ซิงโครนัสแม่เหล็กถาวร (PMS)",
        frontMotorPower: 145,
        frontMotorTorque: 300,
        totalSystemPower: 160,
        totalSystemTorque: 300,
        variantId: variant.id
      }
    });

    // 3.3 สร้าง Performance
    await prisma.performance.create({
      data: {
        acceleration0To100: 0,
        range: 425,
        seatingCapacity: 5,
        variantId: variant.id
      }
    });

    // 3.4 สร้าง Battery
    await prisma.battery.create({
      data: {
        type: "BYD Blade Battery",
        capacity: 18.3,
        variantId: variant.id
      }
    });

    // 3.5 สร้าง SuspensionBraking
    await prisma.suspensionBraking.create({
      data: {
        frontSuspension: "แม็คเฟอร์สันสตรัท",
        rearSuspension: "มัลติลิงค์",
        adaptiveSuspension: false,
        frontBrakeType: "ดิสก์เบรกแบบระบายอากาศ",
        rearBrakeType: "ดิสก์เบรกแบบระบายอากาศ",
        regenerativeBraking: true,
        tireSize: "235/50 R19",
        variantId: variant.id
      }
    });

    // 3.6 สร้าง ChargingSystem
    await prisma.chargingSystem.create({
      data: {
        acChargerType: "Type 2",
        acChargerPower: 6.6,
        dcChargerType1: "CCS 2",
        dcChargerPower1: 18,
        v2lSupport: true,
        v2lAdapter: true,
        regenerativeBraking: true,
        variantId: variant.id
      }
    });

    // 3.7 สร้าง SafetyFeatures
    await prisma.safetyFeatures.create({
      data: {
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
        aeb: !isDynamic,
        forwardCollisionWarning: !isDynamic,
        laneKeepAssist: !isDynamic,
        laneDepartureWarning: !isDynamic,
        blindSpotMonitoring: !isDynamic,
        rearCrossTrafficAlert: !isDynamic,
        adaptiveCruiseControl: !isDynamic,
        trafficSignRecognition: !isDynamic,
        driverAttentionMonitor: false,
        frontParkingSensors: true,
        rearParkingSensors: true,
        surroundViewCamera: true,
        automaticHeadlights: true,
        highBeamAssist: !isDynamic,
        rainSensingWipers: false,
        bhsSystem: false,
        doorOpenWarningSystem: !isDynamic,
        intelligentHeadlights: !isDynamic,
        drivingAssistanceSystem: false,
        headsUpDisplay: false,
        intelligentTorqueControl: false,
        rearCollisionWarning: !isDynamic,
        rearCrossTrafficBrake: !isDynamic,
        intelligentCruiseControl: !isDynamic,
        variantId: variant.id
      }
    });

    // 3.8 สร้าง ExteriorFeatures
    await prisma.exteriorFeatures.create({
      data: {
        panoramicGlassRoof: true,
        electricSunroof: false,
        rearWiperWithIntermittentFunction: true,
        electricTailgate: true,
        rearWindowHeatedWithTimer: true,
        powerFoldingMirrors: true,
        autoFoldingMirrors: true, 
        memoryPositionMirrors: true,
        antiPinchWindowsWithOneTouchSystem: true,
        frontRearParkingSensors: true,
        heatedSideView: true,
        variantId: variant.id
      }
    });
    
    // 3.9 สร้าง InteriorFeatures
    await prisma.interiorFeatures.create({
      data: {
        multiColorAmbientLighting: true,
        leatherSyntheticSeats: true,
        leatherSeats: false,
        lcdDisplay10Inch: true,
        centerConsoleStorage: true,
        syntheticLeatherSteeringWheel: true,
        leatherSteeringWheel: false,
        eightWayPowerSeats: isPremium,
        backSeat4WayAdjustment: true,
        frontSeatHeating: false,
        ventilatedSeatsWithACSystem: true,
        electricMemorySeatDrivers: true,
        steeringWheelHeatedAndMemory: false,
        twoWaySunshades: true,
        adjustableRearHeadRests: true,
        rearHeadRests2Way: true,
        automaticDimmingRearviewMirror: true,
        framelessRearviewMirror: false,
        antiBurglaryDoorPillar: false,
        frontIlluminatedVanityMirror: true,
        variantId: variant.id
      }
    });
    
    // 3.10 สร้าง EntertainmentFeatures
    await prisma.entertainmentFeatures.create({
      data: {
        fmRadio: true,
        appleCarPlayAndroid: true,
        bluetoothConnectivity: true,
        touchscreen15Inch: true,
        dynAudio12Speakers: isPremium,
        thaiVoiceControl: true,
        ambientTemperatureDisplay: true, 
        digitalRadio: true,
        frontUsbTypeAC: true,
        rearUsbTypeAC: true,
        otaUpdateSupport: true,
        speakerCount: isPremium ? 10 : 9,
        variantId: variant.id
      }
    });
    
    // 3.11 สร้าง LightingFeatures
    await prisma.lightingFeatures.create({
      data: {
        ledHeadlights: true,
        followMeHomeFunction: isPremium,
        ledDaytimeRunningLights: true,
        ledTaillights: true,
        rearFogLights: isPremium,
        sequentialRearTurnSignals: true,
        thirdBrakeLights: true,
        rgbDynamicMoodLights: isPremium,
        frontReadingLights: true,
        rearReadingLights: true,
        doorSillScuffPlates: true,
        variantId: variant.id
      }
    });
    
    // 3.12 สร้าง ComfortFeatures
    await prisma.comfortFeatures.create({
      data: {
        keylessEntry: true,
        nfcCardKey: true,
        wirelessPhoneChargers: true,
        twelveVoltOutlet: true,
        pm25AirFilter: true,
        cn95AirFilter: false,
        airIonizer: false,
        dualZoneClimateControl: true,
        rearAirVents: true,
        firstAidKit: false,
        emergencyKit: false,
        bydDigitalKey: true,
        variantId: variant.id
      }
    });
    
    console.log(`Seeding completed successfully for ${variant.name}`);
  }

  console.log('Completed seeding BYD SEALION 6 DM-i.');
}
