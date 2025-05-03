import { PrismaClient } from '@prisma/client';

export async function seedDolphin(prisma: PrismaClient) {
  console.log('Seeding BYD DOLPHIN...');
  
  // 1. สร้าง CarModel และ CarVariant
  await prisma.carModel.upsert({
    where: { slug: "byd-dolphin" },
    update: {},
    create: {
      model: "BYD DOLPHIN",
      slug: "byd-dolphin",
      tagline: "รถยนต์ไฟฟ้าแฮทช์แบ็ค ขนาดกะทัดรัด ประหยัดและสมรรถนะสูง",
      description: "รถยนต์ไฟฟ้าแฮทช์แบ็ค ขนาดกะทัดรัด ประหยัดและสมรรถนะสูง",
      basePrice: 699900,
      imageUrlPromo: "/images/promotions/dolphin.webp",
      imageUrlModel: "/images/models/dolphin/byd-dolphin-card.webp",
      imageUrlHero: "/images/models/dolphin/dolphin-hero.jpg",
      imageUrlReal: "/images/models/dolphin/dolphin-real.jpg",
      imageUrlDataLeft: "/images/models/dolphin/overview-img-01.webp",
      imageWidth: 1200,
      imageHeight: 800,
      featuresTitle: "นวัตกรรมยนตรกรรมไฟฟ้า",
      specialFeature: "ขุมพลังใหม่",
      specialFeatureDescription: "รถยนต์ไฟฟ้าแฮทช์แบ็คขนาดกะทัดรัด มาพร้อมกับประสิทธิภาพและเทคโนโลยีล้ำสมัย",
      specialFeatureImage: "/images/models/dolphin/special-feature.webp",
      specsOverview: {
        length: 4290,
        width: 1770,
        height: 1570,
        wheelbase: 2700,
        groundClearance: 155,
        curbWeight: 1520,
        grossWeight: 1930,
        minTurningRadius: 5.25,
        rearTrunk: 345,
        maxRearTrunk: 1310,
      },
      promotion: [
        "ประกันภัยชั้น 1 พร้อม พรบ. ระยะเวลา 1 ปี",
        "บริการช่วยเหลือฉุกเฉิน ตลอด 24 ชั่วโมง 5 ปีเต็ม",
        "รับประกันตัวรถ (WARRANTY) 5 ปี หรือ 150,000 กม.",
        "รับประกันแบตเตอรี่ 8 ปี หรือ 160,000 กม.",
        "สายชาร์จเคลื่อนที่ AC PORTABLE CHARGER",
        "พรมเข้ารูป กรอบป้ายทะเบียน ฟิล์มกันรอยหน้าจอ",
        "ค่าจดทะเบียน"
      ],
      gallery: [
        "/images/dolphin-gallery-1.png",
        "/images/dolphin-gallery-2.png"
      ],
      colors: {
        create: [
          { name: "Frost White", code: "#FFFFFF", image: "/images/models/dolphin/dolphin-frost-white.png" },
          { name: "Graphite Grey", code: "#505050", image: "/images/models/dolphin/dolphin-graphite-grey.png" },
          { name: "Coastal Cream", code: "#E8DCC5", image: "/images/models/dolphin/dolphin-coastal-cream.png" }
        ]
      },
      features: {
        create: [
          { title: "แบตเตอรี่ Blade Battery", description: "แบตเตอรี่ที่ปลอดภัยที่สุดและมีประสิทธิภาพสูง", image: "/images/models/dolphin/dolphin-design-card1.jpg" },
          { title: "ระบบสั่งการด้วยเสียงภาษาไทย", description: "ควบคุมระบบต่างๆ ในรถได้ด้วยการสั่งงานผ่านเสียงภาษาไทย", image: "/images/models/dolphin/dolphin-design-card2.jpg" },
          { title: "ระบบความปลอดภัยครบครัน", description: "ครบครันด้วยระบบความปลอดภัยที่ทันสมัย", image: "/images/models/dolphin/dolphin-design-card3.jpg" }
        ]
      },
      techHighlights: {
        create: [
          { title: "แบตเตอรี่ BYD Blade", description: "เทคโนโลยีแบตเตอรี่ที่ปลอดภัยสูง", image: "" },
          { title: "ระบบมัลติมีเดีย", description: "หน้าจอระบบมัลติมีเดียขนาดใหญ่ 12.8 นิ้ว", image: "" }
        ]
      },
      variants: {
        create: [
          {
            variantId: "dolphin-standard",
            name: "Standard Range",
            price: 699900,
            range: "410",
            power: "70",
            acceleration: "12.5"
          },
          {
            variantId: "dolphin-extended",
            name: "Extended Range",
            price: 799900,
            range: "490",
            power: "150",
            acceleration: "7"
          }
        ]
      }
    }
  });
  console.log('Created BYD Dolphin model');

  // 2. ดึง variants ทั้งหมดของ Dolphin
  const dolphinVariants = await prisma.carVariant.findMany({
    where: {
      carModel: { slug: "byd-dolphin" }
    }
  });

  console.log(`Found ${dolphinVariants.length} Dolphin variants`);

  // 3. สร้าง relation ต่างๆ สำหรับแต่ละ variant ของ Dolphin
  for (const variant of dolphinVariants) {
    console.log(`Creating specifications for ${variant.name} (ID: ${variant.id})`);

    // 3.1 สร้าง TechSpec
    const techSpec = await prisma.techSpec.create({
      data: {
        specDetails: variant.name === "Standard Range" ? {
          length: 4290,
          width: 1770,
          height: 1570,
          wheelbase: 2700,
          curbWeight: 1520,
          grossWeight: 1930,
          minTurningRadius: 5.25,
          rearTrunk: 345,
          maxRearTrunk: 1310,
          driveType: "ล้อหน้า",
          motor: "มอเตอร์ไฟฟ้าซิงโครนัสแม่เหล็กถาวร",
          maxPower: 70,
          maxTorque: 180,
          acceleration: 12.5,
          range: 410,
          battery: 50.25,
          acCharge: 7,
          dcCharge: 60,
          v2l: true,
          regenerativeBraking: true,
          wheel: "16 นิ้ว (205/55 R16)",
        } : {
          length: 4290,
          width: 1770,
          height: 1570,
          wheelbase: 2700,
          curbWeight: 1520,
          grossWeight: 1930,
          minTurningRadius: 5.25,
          rearTrunk: 345,
          maxRearTrunk: 1310,
          driveType: "ล้อหน้า",
          motor: "มอเตอร์ไฟฟ้าซิงโครนัสแม่เหล็กถาวร",
          maxPower: 150,
          maxTorque: 310,
          acceleration: 7,
          range: 490,
          battery: 60.48,
          acCharge: 7,
          dcCharge: 80,
          v2l: true,
          regenerativeBraking: true,
          wheel: "17 นิ้ว (205/50 R17)",
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
        length: 4290,
        width: 1770,
        height: 1570,
        wheelbase: 2700,
        groundClearance: 155,
        unladenWeight: 1520,
        grossWeight: 1930,
        variantId: variant.id
      }
    });

    // 3.3 สร้าง PowertrainSystem
    await prisma.powertrainSystem.create({
      data: variant.name === "Standard Range" ? {
        driveType: "ล้อหน้า",
        frontMotorType: "มอเตอร์ไฟฟ้าซิงโครนัสแม่เหล็กถาวร",
        frontMotorPower: 70,
        frontMotorTorque: 180,
        totalSystemPower: 70,
        totalSystemTorque: 180,
        variantId: variant.id
      } : {
        driveType: "ล้อหน้า",
        frontMotorType: "มอเตอร์ไฟฟ้าซิงโครนัสแม่เหล็กถาวร",
        frontMotorPower: 150,
        frontMotorTorque: 310,
        totalSystemPower: 150,
        totalSystemTorque: 310,
        variantId: variant.id
      }
    });

    // 3.4 สร้าง Performance
    await prisma.performance.create({
      data: {
        acceleration0To100: 12.5,
        range: 410,
        seatingCapacity: 5,
        variantId: variant.id
      }
    });

    // 3.5 สร้าง Battery
    await prisma.battery.create({
      data: {
        type: "BYD Blade Battery",
        capacity: 50.25,
        variantId: variant.id
      }
    });

    // 3.6 สร้าง SuspensionBraking
    await prisma.suspensionBraking.create({
      data: {
        frontSuspension: "แมคเฟอร์สันสตรัท",
        rearSuspension: "ทอร์ชันบีม",
        adaptiveSuspension: false,
        frontBrakeType: "ดิสก์เบรก",
        rearBrakeType: "ดิสก์เบรก",
        regenerativeBraking: true,
        tireSize: "205/55 R16",
        variantId: variant.id
      }
    });

    // 3.7 สร้าง ChargingSystem
    await prisma.chargingSystem.create({
      data: {
        acChargerType: "Type 2",
        acChargerPower: 7,
        dcChargerType1: "CCS2",
        dcChargerPower1: 60,
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
        leatherSyntheticSeats: true,
        leatherSeats: false,
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

  console.log('Completed seeding BYD Dolphin');
} 