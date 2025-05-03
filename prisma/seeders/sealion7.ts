import { PrismaClient } from '@prisma/client';

export async function seedSealion7(prisma: PrismaClient) {
  console.log('Seeding BYD SEALION 7...');
  
  // 1. สร้าง CarModel และ CarVariant
  await prisma.carModel.upsert({
    where: { slug: "byd-sealion7" },
    update: {},
    create: {
      model: "BYD SEALION 7",
      slug: "byd-sealion7",
      tagline: "SUV ไฟฟ้าขนาดใหญ่ ดีไซน์ล้ำสมัย มาพร้อมสมรรถนะสูง",
      description: "SUV ไฟฟ้าขนาดใหญ่ ดีไซน์ล้ำสมัย มาพร้อมสมรรถนะสูง",
      basePrice: 1249900,
      imageUrlPromo: "/images/promotions/sealion7.webp",
      imageUrlModel: "/images/models/sealion7/byd-sealion7-card.webp",
      imageUrlHero: "/images/models/sealion7/sealion7-hero.jpg",
      imageUrlReal: "/images/models/sealion7/sealion7-real.jpg",
      imageUrlDataLeft: "/images/models/sealion7/overview-img-01.webp",
      imageWidth: 1200,
      imageHeight: 800,
      featuresTitle: "",
      specialFeature: "INFOTAINMENT & LIFESTYLE",
      specialFeatureDescription: "ปลุกทุกความตื่นเต้นเร้าใจ ด้วยสุนทรียภาพของการขับขี่ เหนือระดับตลอดการเดินทางด้วยฟังก์ชันการใช้งานที่ล้ำสมัย ตอบโจทย์ไลฟ์สไตล์คนเมืองอย่างแท้จริง",
      specialFeatureImage: "/images/models/sealion7/special-feature.webp",
      specsOverview: {
        length: 4830,
        width: 1925,
        height: 1620,
        wheelbase: 2930,
        rearTrack: "1660/1660",
        curbWeight: 2225,
        grossWeight: 2635,
        minTurningRadius: 5.85,
        frontTrunk: 58,
        rearTrunk: 500,
      },
      promotion: [
        "ประกันภัยชั้น 1 พร้อม พรบ. ระยะเวลา 1 ปี",
        "บริการช่วยเหลือฉุกเฉิน ตลอด 24 ชั่วโมง 8 ปีเต็ม",
        "รับประกันตัวรถ (WARRANTY) 8 ปี หรือ 160,000 กม.",
        "รับประกันแบตเตอรี่ 8 ปี หรือ 160,000 กม.",
        "สายต่อพ่วงอุปกรณ์ไฟฟ้า หรือ V TO L",
        "สายชาร์จเคลื่อนที่ AC PORTABLE CHARGER",
        "พรมเข้ารูป กรอบป้ายทะเบียน ฟิล์มกันรอยหน้าจอ",
        "ค่าจดทะเบียน"
      ],
      gallery: [
        "/images/sealion7-gallery-1.png",
        "/images/sealion7-gallery-2.png"
      ],
      colors: {
        create: [
          { name: "Horizon white", code: "#F5F5F5", image: "/images/models/sealion7/sealion7-horizon-white.png" },
          { name: "Quantum Black", code: "#121212", image: "/images/models/sealion7/sealion7-quantum-black.png" },
          { name: "Space Grey", code: "#2C5C8F", image: "/images/models/sealion7/sealion7-space-grey.png" },
          { name: "Shark Grey", code: "#7AA5CD", image: "/images/models/sealion7/sealion7-shark-grey.png" }
        ]
      },
      features: {
        create: [
          { title: "แบตเตอรี่ที่มีความปลอดภัยสูง", description: "BYD Blade Battery", image: "/images/models/sealion7/sealion7-design-card1.jpg" },
          { title: "ระบบสั่งการด้วยเสียงภาษาไทย", description: "ควบคุมระบบต่างๆ ในรถได้ด้วยการสั่งงานผ่านเสียงภาษาไทย", image: "/images/models/sealion7/sealion7-design-card2.jpg" },
          { title: "ระบบความปลอดภัยครบครัน", description: "ครบครันด้วยระบบความปลอดภัยที่ทันสมัย", image: "/images/models/sealion7/sealion7-design-card3.jpg" }
        ]
      },
      techHighlights: {
        create: [
          { title: "ระบบกันสะเทือนหน้า", description: "ปีกนกคู่", image: "" },
          { title: "ระบบกันสะเทือนหลัง", description: "มัลติลิงก์", image: "" }
        ]
      },
      variants: {
        create: [
          {
            variantId: "sealion7-premium",
            name: "Premium",
            price: 1249900,
            range: "567",
            power: "230",
            acceleration: "6.7"
          },
          {
            variantId: "sealion7-awd",
            name: "AWD Performance",
            price: 1399900,
            range: "542",
            power: "230+160",
            acceleration: "4.5"
          }
        ]
      }
    }
  });
  console.log('Created BYD Sealion 7 model');

  // 2. ดึง variants ทั้งหมดเพื่อนำ id ไปใช้สร้าง relation อื่นๆ
  const sealion7Variants = await prisma.carVariant.findMany({
    where: {
      carModel: { slug: "byd-sealion7" }
    }
  });

  console.log(`Found ${sealion7Variants.length} Sealion 7 variants`);

  // 3. สร้าง relation ต่างๆ สำหรับแต่ละ variant
  for (const variant of sealion7Variants) {
    console.log(`Creating specifications for ${variant.name} (ID: ${variant.id})`);

    // 3.1 สร้าง TechSpec
    const techSpec = await prisma.techSpec.create({
      data: {
        specDetails: variant.name === "Premium" ? {
          length: 4830,
          width: 1925,
          height: 1620,
          wheelbase: 2930,
          curbWeight: 2225,
          grossWeight: 2635,
          minTurningRadius: 5.85,
          frontTrunk: 58,
          rearTrunk: 500,
          driveType: "ขับเคลื่อนล้อหลัง",
          motor: "มอเตอร์ซิงโครนัสแม่เหล็กถาวร",
          maxPower: 230,
          maxTorque: 380,
          acceleration: 6.7,
          range: 567,
          battery: 82.5,
          acCharge: 11,
          dcCharge: 150,
          v2l: true,
          regenerativeBraking: true,
          wheel: "19 นิ้ว (หน้า 235/50 R19, หลัง 255/45 R19)",
        } : {
          length: 4830,
          width: 1925,
          height: 1620,
          wheelbase: 2930,
          curbWeight: 2225,
          grossWeight: 2635,
          minTurningRadius: 5.85,
          frontTrunk: 58,
          rearTrunk: 500,
          driveType: "ขับเคลื่อน 4 ล้อตลอดเวลา",
          motor: "มอเตอร์ซิงโครนัสแม่เหล็กถาวร",
          maxPower: "230+160",
          maxTorque: 690,
          acceleration: 4.5,
          range: 542,
          battery: 82.5,
          acCharge: 11,
          dcCharge: 150,
          v2l: true,
          regenerativeBraking: true,
          wheel: "20 นิ้ว (245/45 R20)",
        }
      }
    });
    
    // อัพเดต variant ให้เชื่อมกับ TechSpec
    await prisma.carVariant.update({
      where: { id: variant.id },
      data: { techSpecId: techSpec.id }
    });

    // 3.2 สร้าง DimensionsWeight
    await prisma.dimensionsWeight.create({
      data: {
        length: 4830,
        width: 1925,
        height: 1620,
        wheelbase: 2930,
        frontTrack: 1660,
        rearTrack: 1660,
        groundClearance: 157,
        unladenWeight: 2225,
        grossWeight: 2635,
        variantId: variant.id
      }
    });

    // 3.3 สร้าง PowertrainSystem
    await prisma.powertrainSystem.create({
      data: variant.name === "Premium" ? {
        driveType: "ขับเคลื่อนล้อหลัง",
        rearMotorType: "PMS",
        rearMotorPower: 230,
        rearMotorTorque: 380,
        totalSystemPower: 230,
        totalSystemTorque: 380,
        variantId: variant.id
      } : {
        driveType: "ขับเคลื่อน 4 ล้อตลอดเวลา",
        frontMotorType: "มอเตอร์ซิงโครนัสแม่เหล็กถาวร",
        frontMotorPower: 160,
        frontMotorTorque: 310,
        totalSystemPower: 390,
        totalSystemTorque: 690,
        variantId: variant.id
      }
    });

    // 3.4 สร้าง Performance
    await prisma.performance.create({
      data: {
        acceleration0To100: 6.7,
        range: 567,
        seatingCapacity: 5,
        variantId: variant.id
      }
    });

    // 3.5 สร้าง Battery
    await prisma.battery.create({
      data: {
        type: "BYD Blade Battery",
        capacity: 82.5,
        variantId: variant.id
      }
    });

    // 3.6 สร้าง SuspensionBraking
    await prisma.suspensionBraking.create({
      data: {
        frontSuspension: "ปีกนกคู่",
        rearSuspension: "มัลติลิงก์",
        adaptiveSuspension: false,
        frontBrakeType: "ดิสก์เบรก",
        rearBrakeType: "ดิสก์เบรก",
        regenerativeBraking: true,
        tireSize: "235/50 R19",
        variantId: variant.id
      }
    });

    // 3.7 สร้าง ChargingSystem
    await prisma.chargingSystem.create({
      data: {
        acChargerType: "Type 2",
        acChargerPower: 11,
        dcChargerType1: "CCS2",
        dcChargerPower1: 150,
        v2lSupport: true,
        v2lAdapter: true,
        regenerativeBraking: true,
        variantId: variant.id
      }
    });

    // 3.8 สร้าง SafetyFeatures
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
        headsUpDisplay: false,
        intelligentTorqueControl: true,
        variantId: variant.id
      }
    });

    // 3.9 สร้าง ExteriorFeatures
    await prisma.exteriorFeatures.create({
      data: {
        panoramicGlassRoof: true,
        electricSunroof: true,
        rearWiperWithIntermittentFunction: true,
        electricTailgate: true,
        rearWindowHeatedWithTimer: true,
        powerFoldingMirrors: true,
        autoFoldingMirrors: true,
        memoryPositionMirrors: false,
        antiPinchWindowsWithOneTouchSystem: true,
        frontRearParkingSensors: true,
        heatedSideView: true,
        variantId: variant.id
      }
    });

    // 3.10 สร้าง InteriorFeatures
    await prisma.interiorFeatures.create({
      data: {
        multiColorAmbientLighting: true,
        leatherSyntheticSeats: false,
        leatherSeats: true,
        lcdDisplay10Inch: true,
        centerConsoleStorage: true,
        syntheticLeatherSteeringWheel: true,
        leatherSteeringWheel: false,
        eightWayPowerSeats: true,
        backSeat4WayAdjustment: true,
        frontSeatHeating: true,
        ventilatedSeatsWithACSystem: true,
        electricMemorySeatDrivers: false,
        steeringWheelHeatedAndMemory: false,
        twoWaySunshades: true,
        adjustableRearHeadRests: true,
        rearHeadRests2Way: true,
        automaticDimmingRearviewMirror: true,
        framelessRearviewMirror: false,
        antiBurglaryDoorPillar: true,
        frontIlluminatedVanityMirror: true,
        variantId: variant.id
      }
    });

    // 3.11 สร้าง EntertainmentFeatures
    await prisma.entertainmentFeatures.create({
      data: {
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
        variantId: variant.id
      }
    });

    // 3.12 สร้าง LightingFeatures
    await prisma.lightingFeatures.create({
      data: {
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
        variantId: variant.id
      }
    });

    // 3.13 สร้าง ComfortFeatures
    await prisma.comfortFeatures.create({
      data: {
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
        variantId: variant.id
      }
    });
    console.log(`Seeding completed successfully for ${variant.name}`);
  }

  console.log('Completed seeding BYD Sealion 7');
}