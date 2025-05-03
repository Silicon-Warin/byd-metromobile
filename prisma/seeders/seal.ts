import { PrismaClient } from '@prisma/client';

export async function seedSeal(prisma: PrismaClient) {
  console.log('Seeding BYD SEAL...');

  // ========== BYD SEAL SEEDING ========== 
  const carModel = await prisma.carModel.upsert({
    where: { slug: "byd-seal" },
    update: {},
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
  console.log('Seeded Car Model:', carModel);

  // ค้นหา variant id เพื่อใช้ในการเพิ่มข้อมูลเทคนิค
  const sealVariants = await prisma.carVariant.findMany({
    where: {
      carModel: { slug: "byd-seal" }
    }
  });

  // เพิ่มข้อมูล DimensionsWeight ของแต่ละรุ่น
  for (const variant of sealVariants) {
    if (variant.name === "Dynamic") {
      await prisma.dimensionsWeight.upsert({
        where: { variantId: variant.id },
        create: {
          length: 4800,
          width: 1875,
          height: 1460,
          wheelbase: 2920,
          unladenWeight: 1922,
          grossWeight: 2344,
          groundClearance: 120,
          frontTrack: null, // ถ้าไม่มีข้อมูลให้เป็น null
          rearTrack: null,
          variantId: variant.id
        },
        update: {}
      });
    } else if (variant.name === "Premium") {
      await prisma.dimensionsWeight.upsert({
        where: { variantId: variant.id },
        create: {
          length: 4800,
          width: 1875,
          height: 1460,
          wheelbase: 2920,
          unladenWeight: 2055,
          grossWeight: 2501,
          groundClearance: 120,
          frontTrack: null,
          rearTrack: null,
          variantId: variant.id
        },
        update: {}
      });
    } else if (variant.name === "AWD Performance") {
      await prisma.dimensionsWeight.upsert({
        where: { variantId: variant.id },
        create: {
          length: 4800,
          width: 1875,
          height: 1460,
          wheelbase: 2920,
          unladenWeight: 2185,
          grossWeight: 2631,
          groundClearance: 120,
          frontTrack: null,
          rearTrack: null,
          variantId: variant.id
        },
        update: {}
      });
    }

    // เพิ่ม PowertrainSystem
    if (variant.name === "Dynamic") {
      await prisma.powertrainSystem.upsert({
        where: { variantId: variant.id },
        create: {
          driveType: "RWD",
          rearMotorType: "Permanent Magnet Synchronous Motor",
          rearMotorPower: 150,
          rearMotorTorque: 310,
          totalSystemPower: 150,
          totalSystemTorque: 310,
          variantId: variant.id
        },
        update: {}
      });
    } else if (variant.name === "Premium") {
      await prisma.powertrainSystem.upsert({
        where: { variantId: variant.id },
        create: {
          driveType: "RWD",
          rearMotorType: "Permanent Magnet Synchronous Motor",
          rearMotorPower: 230,
          rearMotorTorque: 360,
          totalSystemPower: 230,
          totalSystemTorque: 360,
          variantId: variant.id
        },
        update: {}
      });
    } else if (variant.name === "AWD Performance") {
      await prisma.powertrainSystem.upsert({
        where: { variantId: variant.id },
        create: {
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
        },
        update: {}
      });
    }

    // เพิ่ม Performance
    if (variant.name === "Dynamic") {
      await prisma.performance.upsert({
        where: { variantId: variant.id },
        create: {
          acceleration0To100: 7.5,
          range: 510,
          seatingCapacity: 5,
          variantId: variant.id
        },
        update: {}
      });
    } else if (variant.name === "Premium") {
      await prisma.performance.upsert({
        where: { variantId: variant.id },
        create: {
          acceleration0To100: 5.9,
          range: 650,
          seatingCapacity: 5,
          variantId: variant.id
        },
        update: {}
      });
    } else if (variant.name === "AWD Performance") {
      await prisma.performance.upsert({
        where: { variantId: variant.id },
        create: {
          acceleration0To100: 3.8,
          range: 580,
          seatingCapacity: 5,
          variantId: variant.id
        },
        update: {}
      });
    }

    // เพิ่ม Battery
    if (variant.name === "Dynamic") {
      await prisma.battery.upsert({
        where: { variantId: variant.id },
        create: {
          type: "BYD Blade Battery",
          capacity: 61.44,
          variantId: variant.id
        },
        update: {}
      });
    } else {
      await prisma.battery.upsert({
        where: { variantId: variant.id },
        create: {
          type: "BYD Blade Battery",
          capacity: 82.56,
          variantId: variant.id
        },
        update: {}
      });
    }

    // เพิ่ม SuspensionBraking
    if (variant.name === "Dynamic") {
      await prisma.suspensionBraking.upsert({
        where: { variantId: variant.id },
        create: {
          frontSuspension: "ระบบกันสะเทือนแบบปีกนกคู่ Double Wishbone",
          rearSuspension: "ระบบกันสะเทือนด้านหลังแบบมัลติลิงค์",
          adaptiveSuspension: false,
          frontBrakeType: "ดิสก์เบรกระบายความร้อน",
          rearBrakeType: "ดิสก์เบรกระบายความร้อน",
          regenerativeBraking: true,
          tireSize: "225/50 R18",
          variantId: variant.id
        },
        update: {}
      });
    } else {
      await prisma.suspensionBraking.upsert({
        where: { variantId: variant.id },
        create: {
          frontSuspension: "ระบบกันสะเทือนแบบปีกนกคู่ Double Wishbone",
          rearSuspension: "ระบบกันสะเทือนด้านหลังแบบมัลติลิงค์",
          adaptiveSuspension: true,
          frontBrakeType: variant.name === "Premium" ? "แบบคาลิปเปอร์" : "แบบคาลิปเปอร์",
          rearBrakeType: "ดิสก์เบรกระบายความร้อน",
          regenerativeBraking: true,
          tireSize: "235/45 R19",
          variantId: variant.id
        },
        update: {}
      });
    }

    // ระบบชาร์จ ChargingSystem
    await prisma.chargingSystem.upsert({
      where: { variantId: variant.id },
      create: {
        acChargerType: "Type 2",
        acChargerPower: 11,
        dcChargerType1: variant.name === "Dynamic" ? "CCS 2 (110kW)" : "CCS 2 (150kW)",
        dcChargerPower1: variant.name === "Dynamic" ? 110 : 150,
        v2lSupport: true,
        v2lAdapter: true,
        regenerativeBraking: true,
        variantId: variant.id
      },
      update: {}
    });

    // SafetyFeatures
    await prisma.safetyFeatures.upsert({
      where: { variantId: variant.id },
      create: {
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
        headsUpDisplay: variant.name === "Dynamic" ? false : true,
        intelligentTorqueControl: variant.name === "AWD Performance" ? true : false,        
        variantId: variant.id
      },
      update: {}
    });

    // สร้าง Exterior Features
    await prisma.exteriorFeatures.upsert({
      where: { variantId: variant.id },
      update: {},
      create: {
        panoramicGlassRoof: true, // หลังคากระจกพาโนรามิคเคลือบซิลเวอร์
        electricSunroof: true, // มือจับประตูไฟฟ้าแบบซ่อน
        rearWiperWithIntermittentFunction: true, // กระจกหลังแบบซ่อนระบบปรับสัญญาณวิทยุ
        electricTailgate: true, // ฝากระโปรงท้ายไฟฟ้า
        rearWindowHeatedWithTimer: true, // กระจกบองหลังปรับไฟฟ้าแบบมีระบบทำความร้อน ไล่ฝ้า
        powerFoldingMirrors: true, // กระจกมองข้างพับเก็บแบบไฟฟ้า
        autoFoldingMirrors: variant.name === "Dynamic" ? false : true, // กระจกมองข้างปรับองศาอัตโนมัติเมื่อถอยหลัง
        memoryPositionMirrors: variant.name === "Dynamic" ? false : true, // ระบบบันทึกตำแหน่งกระจกมองข้าง
        antiPinchWindowsWithOneTouchSystem: true, // กระจกเปิดปิดอัตโนมัติแบบสัมผัสวิดจิทัลพร้อมระบบป้องกันการหนีบ
        frontRearParkingSensors: true, // กระจกด้านหน้าเก็บเสียงแบบสองชั้น
        heatedSideView: true, // กระจกด้านหลังแบบมีระบบทำความร้อนไล่ฝ้า
        variantId: variant.id
      }
    });
    
    // สร้าง Interior Features
    await prisma.interiorFeatures.upsert({
      where: { variantId: variant.id },
      update: {},
      create: {
        multiColorAmbientLighting: true, // พวงมาลัยแบบมัลติฟังก์ชัน
        leatherSyntheticSeats: variant.name === "Dynamic" ? true : false, // พวงมาลัยแบบหุ้มหนังสังเคราะห์
        leatherSeats: variant.name === "Dynamic" ? false : true, // พวงมาลัยแบบหุ้มหนังแท้
        lcdDisplay10Inch: true, // หน้าจอ LCD เรือนไมล์ ขนาด 10.25 นิ้ว
        centerConsoleStorage: true, // ช่องเก็บของพื้นที่คอนโซลกลาง
        syntheticLeatherSteeringWheel: variant.name === "Dynamic" ? true : false, // เบาะนั่งแบบหุ้มหนังสังเคราะห์
        leatherSteeringWheel: variant.name === "Dynamic" ? false : true, // เบาะนั่งแบบหุ้มหนังแท้
        eightWayPowerSeats: true, // เบาะคนขับปรับไฟฟ้า 8 ทิศทาง
        backSeat4WayAdjustment: variant.name === "Dynamic" ? false : true, // ระบบพนักพิงด้านหลังเบาะคนขับปรับไฟฟ้า 4 ทิศทาง
        frontSeatHeating: true, // เบาะผู้โดยสารคอนหน้าปรับไฟฟ้า 6 ทิศทาง
        ventilatedSeatsWithACSystem: true, // เบาะนั่งคู่หน้าแบบระบายอากาศพร้อมระบบอุ่นเบาะนั่ง
        electricMemorySeatDrivers: variant.name === "Dynamic" ? false : true, // ระบบจดจำตำแหน่งที่นั่งเบาะคนขับ
        steeringWheelHeatedAndMemory: variant.name === "Dynamic" ? false : true, // เบาะนั่งคนขับเลื่อนอัตโนมัติพร้อมสตาร์ทและดับรถยนต์
        twoWaySunshades: true, // แผงบังอัตพร้อมกระจกแก้ว 2 ใบ
        adjustableRearHeadRests: true, // หัวแก้วด้านหน้าแบบปรับระดับได้
        rearHeadRests2Way: true, // ที่พักแขนด้านหลัง (พร้อมที่วางแก้ว 2 ใบ)
        automaticDimmingRearviewMirror: true, // กระจกมองหลังแบบตัดแสงอัตโนมัติ
        framelessRearviewMirror: true, // โบนัสน้ำฝนระบบอัตโนมัติแบบไร้โครงเหล็ก (Frameless)
        antiBurglaryDoorPillar: true, // แผ่นเหล็กป้องกันรอยขีดข่วนรถกันประตู
        frontIlluminatedVanityMirror: true, // ที่บังแดดด้านหน้าพร้อมกระจกและไฟส่องสว่าง
        variantId: variant.id
      }
    });
    
    // สร้าง Entertainment Features
    await prisma.entertainmentFeatures.upsert({
      where: { variantId: variant.id },
      update: {},
      create: {
        fmRadio: true, // วิทยุ FM
        appleCarPlayAndroid: true, // รองรับ Apple CarPlay® (เชื่อมต่อผ่าน USB) และ Android Auto™ (แบบไร้สาย)
        bluetoothConnectivity: true, // รองรับการเชื่อมต่อโทรศัพท์มือถือผ่านบลูทูธ
        touchscreen15Inch: true, // หน้าจอสัมผัสระบบมัลติมีเดียพร้อมระบบหมุนไฟฟ้าขนาด 15.6 นิ้ว
        dynAudio12Speakers: true, // เครื่องเสียง DYNAUDIO ลำโพง 12 ชุด
        thaiVoiceControl: true, // ระบบสั่งการด้วยเสียง-ภาษาไทย
        ambientTemperatureDisplay: true, // ระบบนำทางด้วยดาวเทียม
        digitalRadio: true, // มีดิจิตอลเรดิโอ
        frontUsbTypeAC: true, // USB 2 พอร์ต สำหรับผู้โดยสารคอนหน้า (typeA& typeC)
        rearUsbTypeAC: true, // USB 2 พอร์ต สำหรับผู้โดยสารคอนหลัง (typeA& typeC)
        otaUpdateSupport: true, // รองรับการอัพเดทซอฟต์แวร์ผ่านสัญญาณอินเทอร์เน็ต (OTA)
        variantId: variant.id
      }
    });
    
    // สร้าง Lighting Features
    await prisma.lightingFeatures.upsert({
      where: { variantId: variant.id },
      update: {},
      create: {
        ledHeadlights: true, // ไฟหน้าแบบ LED
        followMeHomeFunction: true, // ฟังก์ชันหน่วงเวลาการปิดไฟหน้า Follow Me Home
        ledDaytimeRunningLights: true, // ไฟส่องสว่างกลางวันแบบ LED
        ledTaillights: true, // ไฟท้ายแบบ LED
        rearFogLights: true, // ไฟตัดหมอกด้านหลัง
        sequentialRearTurnSignals: true, // ระบบไฟเลี้ยวด้านหลังแบบ Sequential
        thirdBrakeLights: true, // ไฟเบรกบน ดวงที่ 3 แบบ LED
        rgbDynamicMoodLights: variant.name === "Dynamic" ? false : true,
        frontReadingLights: true,
        rearReadingLights: variant.name === "Dynamic" ? false : true,
        doorSillScuffPlates: true,
        variantId: variant.id
      }
    });
    
    // สร้าง Comfort Features
    await prisma.comfortFeatures.upsert({
      where: { variantId: variant.id },
      update: {},
      create: {
        keylessEntry: true, // ระบบการเข้ารถ และ สตาร์ทแบบ Keyless
        nfcCardKey: true, // ระบบกุญแจแบบบัตรอิเล็กทรอนิกส์ NFC (NFC Card)
        wirelessPhoneChargers: true, // ที่ชาร์จโทรศัพท์มือถือแบบไร้สาย 2 จุด
        twelveVoltOutlet: true, // ช่องจ่ายไฟ 12V
        pm25AirFilter: true, // ระบบกรองฝุ่น PM2.5
        cn95AirFilter: true, // กรองอากาศ PM2.5 แบบประสิทธิภาพสูง (CN95)
        airIonizer: true, // ระบบกรองอากาศแบบ Ionizer
        dualZoneClimateControl: true, // ระบบปรับอากาศแบบ 2 โซน พร้อมระบบทำความร้อน
        rearAirVents: true, // ช่องระบายอากาศตรงกลางด้านหลัง
        firstAidKit: true, // ชุดประจุฉุกเฉิน
        emergencyKit: true, // ชุดอุปกรณ์ฉุกเฉิน
        variantId: variant.id
      }
    });
  }
  
  console.log('All features have been added to SEAL variants!');

  console.log('Completed seeding BYD SEAL.');
} 