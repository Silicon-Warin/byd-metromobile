import { PrismaClient } from '@prisma/client';

export async function seedSeal(prisma: PrismaClient) {
  console.log('Seeding BYD SEAL...');

  // 1. สร้าง CarModel สำหรับ BYD SEAL
  const carModel = await prisma.carModel.upsert({
    where: { slug: "byd-seal" },
    update: {}, // ไม่มีการอัปเดตถ้ามีอยู่แล้ว
    create: {
      model: "BYD SEAL",
      slug: "byd-seal",
      description: "ซีดานไฟฟ้าสมรรถนะสูง พร้อมระยะทางขับขี่ไกลและเทคโนโลยีล้ำสมัย",
      basePrice: 999900,
      imageUrlPromo: "/images/motor-show-promo/seal.jpg",
      imageUrlModel: "/images/models/BYD-seal.webp",
      imageUrlHero: "/images/models/seal/seal-hero.jpg",
      imageUrlReal: "/images/models/seal/seal-real.jpg",
      imageWidth: 1200,
      imageHeight: 800,
      featuresTitle: "ที่สุดแห่งสมรรถนะ",
      specsOverview: {
        acceleration: "3.8 วินาที",
        range: "580 กิโลเมตร",
        drivetrain: "AWD Performance",
        motor: "มอเตอร์ 390 กิโลวัตต์",
        battery: "82.56 กิโลวัตต์-ชั่วโมง",
        charging: "AC type 2 / DC CCS 2 (150 กิโลวัตต์)",
        annotate: "*AWD Performance performance and specifications",
      },
      gallery: [
        "/images/seal-gallery-1.png",
        "/images/seal-gallery-2.png",
        "/images/seal-gallery-3.png",
      ],
      promotion: [
        "ประกันภัยชั้น 1 พร้อม พรบ. ระยะเวลา 1 ปี",
        "บริการช่วยเหลือฉุกเฉิน ตลอด 24 ชั่วโมง 8 ปีเต็ม",
        "รับประกันตัวรถ (WARRANTY) 8 ปี หรือ 160,000 กม.",
      ],
      colors: {
        create: [
          {
            name: "Horizon white",
            code: "#F5F5F5",
            gradient: "linear-gradient(145deg, #FFFFFF, #E6E6E6)",
            shadow: "inset 2px 2px 5px rgba(255, 255, 255, 0.5), inset -2px -2px 5px rgba(0, 0, 0, 0.1)",
            image: "/images/models/seal/seal-horizon-white.png",
          },
          {
            name: "Quantum Black",
            code: "#121212",
            gradient: "linear-gradient(145deg, #222222, #000000)",
            border: "1px solid rgba(255, 255, 255, 0.7)",
            image: "/images/models/seal/seal-quantum-black.png",
          },
          {
            name: "Space Grey",
            code: "#2C5C8F",
            gradient: "linear-gradient(145deg, #2C5C8F, #1D3D5F)",
            shadow: "inset 2px 2px 5px rgba(255, 255, 255, 0.2), inset -2px -2px 5px rgba(0, 0, 0, 0.3)",
            image: "/images/models/seal/seal-space-grey.png",
          },
          {
            name: "Velocity blue",
            code: "#7AA5CD",
            gradient: "linear-gradient(145deg, #7AA5CD, #5585B5)",
            shadow: "inset 2px 2px 5px rgba(255, 255, 255, 0.3), inset -2px -2px 5px rgba(0, 0, 0, 0.2)",
            image: "/images/models/seal/seal-velocity-blue.png",
          },
        ],
      },
      features: {
        create: [
          {
            title: "ระบบกันสะเทือนอัจฉริยะ",
            description: "นุ่มนวลเหนือระดับ มั่นใจทุกโค้ง",
            image: "/images/models/seal/seal-design-card1.jpg",
          },
          {
            title: "ระบบกระจายแรงบิดอัจฉริยะ",
            description: "ควบคุมแม่นยำ ตอบสนองฉับไว",
            image: "/images/models/seal/seal-design-card2.jpg",
          },
          {
            title: "โครงสร้างแบตเตอรี่แนบสนิท",
            description: "แข็งแกร่ง ปลอดภัย มั่นใจทุกเส้นทาง",
            image: "/images/models/seal/seal-design-card3.jpg",
          },
        ],
      },
      variants: {
        create: [
          {
            variantId: "dynamic",
            name: "Dynamic",
            power: "150kW",
            acceleration: "7.5 Sec",
            price: 999900,
            range: "510 km",
          },
          {
            variantId: "premium",
            name: "Premium",
            power: "230kW",
            acceleration: "5.9 Sec",
            price: 1099900,
            range: "650 km",
          },
          {
            variantId: "performance",
            name: "AWD Performance",
            power: "390kW",
            acceleration: "3.8 Sec",
            price: 1199900,
            range: "580 km",
          },
        ],
      },
      techHighlights: {
        create: [
          {
            title: "Advanced Cell-to-Body Technology",
            description: "BYD SEAL เป็นยานพาหนะแรกที่นำเทคโนโลยี Cell-to-Body (CTB) มาใช้ โดยการบูรณาการแบตเตอรี่ BYD Blade เข้ากับโครงสร้างของรถอย่างเต็มรูปแบบ ช่วยเพิ่มความแข็งแรงและความปลอดภัยของโครงสร้างรถ พร้อมทั้งเพิ่มพื้นที่ภายในและปรับสมดุลการกระจายน้ำหนักให้การควบคุมรถมีประสิทธิภาพยิ่งขึ้น",
            image: "/images/models/seal/seal-tech1.jpg",
          },
          {
            title: "BYD SEAL",
            description: "ซีดานไฟฟ้าสมรรถนะสูง พร้อมระยะทางขับขี่ไกลและเทคโนโลยีล้ำสมัย",
            image: "/images/models/seal/seal-tech2.jpg",
          }
        ]
      },
    },
  });
  console.log('Created BYD SEAL model');

  // 2. ค้นหา variant ทั้งหมดของ SEAL เพื่อนำ id ไปใช้สร้าง relation อื่นๆ
  const sealVariants = await prisma.carVariant.findMany({
    where: {
      carModel: { slug: "byd-seal" }
    }
  });
  
  console.log(`Found ${sealVariants.length} SEAL variants`);

  // 3. สร้าง relation ต่างๆ สำหรับแต่ละ variant ของ SEAL
  for (const variant of sealVariants) {
    console.log(`Creating specifications for ${variant.name} (ID: ${variant.id})`);
    
    const isDynamic = variant.name === "Dynamic";
    const isPremium = variant.name === "Premium";
    const isPerformance = variant.name === "AWD Performance";

    // 3.1 สร้าง DimensionsWeight
    await prisma.dimensionsWeight.create({
      data: {
        length: 4800,
        width: 1875,
        height: 1460,
        wheelbase: 2920,
        groundClearance: 120,
        unladenWeight: isDynamic ? 1922 : (isPremium ? 2055 : 2185),
        grossWeight: isDynamic ? 2344 : (isPremium ? 2501 : 2631),
        frontTrack: null,
        rearTrack: null,
        variantId: variant.id
      }
    });

    // 3.2 สร้าง PowertrainSystem
    if (isDynamic || isPremium) {
      await prisma.powertrainSystem.create({
        data: {
          driveType: "RWD",
          rearMotorType: "Permanent Magnet Synchronous Motor",
          rearMotorPower: isDynamic ? 150 : 230,
          rearMotorTorque: isDynamic ? 310 : 360,
          totalSystemPower: isDynamic ? 150 : 230,
          totalSystemTorque: isDynamic ? 310 : 360,
          variantId: variant.id
        }
      });
    } else if (isPerformance) {
      await prisma.powertrainSystem.create({
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
          variantId: variant.id
        }
      });
    }

    // 3.3 สร้าง Performance
    await prisma.performance.create({
      data: {
        acceleration0To100: isDynamic ? 7.5 : (isPremium ? 5.9 : 3.8),
        range: isDynamic ? 510 : (isPremium ? 650 : 580),
        seatingCapacity: 5,
        variantId: variant.id
      }
    });

    // 3.4 สร้าง Battery
    await prisma.battery.create({
      data: {
        type: "BYD Blade Battery",
        capacity: isDynamic ? 61.44 : 82.56,
        variantId: variant.id
      }
    });

    // 3.5 สร้าง SuspensionBraking
    await prisma.suspensionBraking.create({
      data: {
        frontSuspension: "ระบบกันสะเทือนแบบปีกนกคู่ Double Wishbone",
        rearSuspension: "ระบบกันสะเทือนด้านหลังแบบมัลติลิงค์",
        adaptiveSuspension: !isDynamic,
        frontBrakeType: isDynamic ? "ดิสก์เบรกระบายความร้อน" : "แบบคาลิปเปอร์",
        rearBrakeType: "ดิสก์เบรกระบายความร้อน",
        regenerativeBraking: true,
        tireSize: isDynamic ? "225/50 R18" : "235/45 R19",
        variantId: variant.id
      }
    });

    // 3.6 สร้าง ChargingSystem
    await prisma.chargingSystem.create({
      data: {
        acChargerType: "Type 2",
        acChargerPower: 11,
        dcChargerType1: isDynamic ? "CCS 2 (110kW)" : "CCS 2 (150kW)",
        dcChargerPower1: isDynamic ? 110 : 150,
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
        headsUpDisplay: !isDynamic,
        intelligentTorqueControl: isPerformance,
        variantId: variant.id
      }
    });

    // 3.8 สร้าง ExteriorFeatures
    await prisma.exteriorFeatures.create({
      data: {
        panoramicGlassRoof: true,
        electricSunroof: true,
        rearWiperWithIntermittentFunction: true,
        electricTailgate: true,
        rearWindowHeatedWithTimer: true,
        powerFoldingMirrors: true,
        autoFoldingMirrors: !isDynamic,
        memoryPositionMirrors: !isDynamic,
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
        leatherSyntheticSeats: isDynamic,
        leatherSeats: !isDynamic,
        lcdDisplay10Inch: true,
        centerConsoleStorage: true,
        syntheticLeatherSteeringWheel: isDynamic,
        leatherSteeringWheel: !isDynamic,
        eightWayPowerSeats: true,
        backSeat4WayAdjustment: !isDynamic,
        frontSeatHeating: true,
        ventilatedSeatsWithACSystem: true,
        electricMemorySeatDrivers: !isDynamic,
        steeringWheelHeatedAndMemory: !isDynamic,
        twoWaySunshades: true,
        adjustableRearHeadRests: true,
        rearHeadRests2Way: true,
        automaticDimmingRearviewMirror: true,
        framelessRearviewMirror: true,
        antiBurglaryDoorPillar: true,
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
    
    // 3.11 สร้าง LightingFeatures
    await prisma.lightingFeatures.create({
      data: {
        ledHeadlights: true,
        followMeHomeFunction: true,
        ledDaytimeRunningLights: true,
        ledTaillights: true,
        rearFogLights: true,
        sequentialRearTurnSignals: true,
        thirdBrakeLights: true,
        rgbDynamicMoodLights: !isDynamic,
        frontReadingLights: true,
        rearReadingLights: !isDynamic,
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

  console.log('Completed seeding BYD SEAL.');
} 