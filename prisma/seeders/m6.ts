import { PrismaClient } from '@prisma/client';

export async function seedM6(prisma: PrismaClient) {
  console.log('Seeding BYD M6...');

  // 1. สร้าง CarModel และ CarVariant สำหรับ BYD M6
  const carModel = await prisma.carModel.upsert({
    where: { slug: "byd-m6" },
    update: {}, // ไม่มีการอัปเดตถ้ามีอยู่แล้ว
    create: {
      model: "BYD M6",
      slug: "byd-m6",
      tagline: "MPV ไฟฟ้าสำหรับครอบครัว กว้างขวางและสะดวกสบาย",
      description: "MPV ไฟฟ้า 7 ที่นั่งรุ่นใหม่ล่าสุดจาก BYD ที่มาพร้อมความสะดวกสบายและเทคโนโลยีล้ำสมัย",
      basePrice: 1160000, // ราคาเริ่มต้น (Dynamic 6-seat)
      imageUrlPromo: "/images/promotions/m6.webp",
      imageUrlModel: "/images/models/m6/byd-m6-card.webp",
      imageUrlHero: "/images/models/m6/m6-hero.jpg",
      imageUrlReal: "/images/models/m6/m6-real.jpg",
      // imageUrlDataLeft: "/images/models/m6/overview-img-01.webp", // ถ้ามี
      imageWidth: 1200,
      imageHeight: 800,
      featuresTitle: "ความสะดวกสบายสำหรับทุกคนในครอบครัว",
      specialFeature: "พื้นที่ภายในกว้างขวาง",
      specialFeatureDescription: "ออกแบบมาเพื่อตอบโจทย์ครอบครัวยุคใหม่ ด้วยพื้นที่ใช้สอยที่กว้างขวางและฟังก์ชันที่ครบครัน",
      specialFeatureImage: "/images/models/m6/special-feature.webp", // ถ้ามี
      specsOverview: { // ข้อมูลภาพรวมจากรูปภาพ
        length: 4710,
        width: 1810,
        height: 1690,
        wheelbase: 2800,
        turningRadius: 8.5, // เมตร
        luggageCapacity3Rows: 180, // ลิตร
        luggageCapacity2Rows: 580, // ลิตร
      },
      promotion: [ // ข้อมูลโปรโมชั่นจาก carModel.ts
        "ประกันภัยชั้น 1 พร้อม พรบ. ระยะเวลา 1 ปี",
        "บริการช่วยเหลือฉุกเฉิน ตลอด 24 ชั่วโมง 8 ปีเต็ม",
        "รับประกันตัวรถ (WARRANTY) 8 ปี หรือ 160,000 กม.",
        "รับประกันแบตเตอรี่ 8 ปี หรือ 160,000 กม.",
        "สายต่อพ่วงอุปกรณ์ไฟฟ้า หรือ V TO L",
        "สายชาร์จเคลื่อนที่ AC PORTABLE CHARGER",
        "พรมเข้ารูป กรอบป้ายทะเบียน ฟิล์มกันรอยหน้าจอ",
        "ค่าจดทะเบียน",
        "ฟรี ฟิล์มกรองแสง XUV-MAX-CERAMIC"
      ],
      gallery: [ // ถ้ามีรูปภาพ Gallery
        // "/images/m6-gallery-1.png",
        // "/images/m6-gallery-2.png"
      ],
      colors: {
        create: [
          { name: "Crystal White", code: "#FFFFFF", image: "/images/models/m6/m6-crystal-white.png" }, // ต้องมีรูปภาพสี
          { name: "Quantum Black", code: "#000000", image: "/images/models/m6/m6-quantum-black.png" }, // ต้องมีรูปภาพสี
          { name: "Quartz Blue", code: "#A0B9C6", image: "/images/models/m6/m6-quartz-blue.png" }, // ต้องมีรูปภาพสี (เฉพาะ Extended)
          { name: "Harbour Grey", code: "#808080", image: "/images/models/m6/m6-harbour-grey.png" } // ต้องมีรูปภาพสี (เฉพาะ Extended)
        ]
      },
      features: {
        create: [ // ตัวอย่าง Features ถ้ามี
          // { title: "...", description: "...", image: "/images/models/m6/m6-design-card1.jpg" },
        ]
      },
      techHighlights: {
        create: [ // ตัวอย่าง Tech Highlights ถ้ามี
          // { title: "...", description: "...", image: "" },
        ]
      },
      variants: {
        create: [
          {
            variantId: "m6-dynamic-6seat",
            name: "Dynamic 6-seat",
            price: 1160000,
            range: "420", // km (NEDC)
            power: "120", // kW
            acceleration: null, // ไม่มีข้อมูล
          },
          {
            variantId: "m6-extended-6seat",
            name: "Extended 6-seat",
            price: 1260000,
            range: "530", // km (NEDC)
            power: "150", // kW
            acceleration: "8.5", // วินาที
          },
          {
            variantId: "m6-extended-7seat",
            name: "Extended 7-seat",
            price: 1290000,
            range: "530", // km (NEDC)
            power: "150", // kW
            acceleration: "8.5", // วินาที
          }
        ]
      }
    }
  });
  console.log('Created BYD M6 model');

  // 2. ดึง variants ทั้งหมดของ M6 เพื่อนำ id ไปใช้สร้าง relation อื่นๆ
  const m6Variants = await prisma.carVariant.findMany({
    where: {
      carModel: { slug: "byd-m6" }
    }
  });

  console.log(`Found ${m6Variants.length} M6 variants`);

  // 3. สร้าง relation ต่างๆ สำหรับแต่ละ variant ของ M6
  for (const variant of m6Variants) {
    console.log(`Creating specifications for ${variant.name} (ID: ${variant.id})`);

    const isDynamic = variant.name === "Dynamic 6-seat";
    const isExtended = variant.name.startsWith("Extended");
    const is7Seat = variant.name === "Extended 7-seat";

    // 3.1 สร้าง DimensionsWeight
    await prisma.dimensionsWeight.create({
      data: {
        length: 4710,
        width: 1810,
        height: 1690,
        wheelbase: 2800,
        frontTrack: 1540,
        rearTrack: 1530,
        groundClearance: 140, // ระยะต่ำสุดจากพื้น (ไม่รวมน้ำหนักบรรทุก)
        unladenWeight: isDynamic ? 1780 : (is7Seat ? 1915 : 1895),
        grossWeight: isDynamic ? 2279 : (is7Seat ? 2489 : 2394),
        variantId: variant.id
      }
    });

    // 3.2 สร้าง PowertrainSystem
    await prisma.powertrainSystem.create({
      data: {
        driveType: "ขับเคลื่อนล้อหน้า",
        frontMotorType: "มอเตอร์ซิงโครนัสแม่เหล็กถาวร (PMS)",
        frontMotorPower: isDynamic ? 120 : 150,
        frontMotorTorque: isDynamic ? null : 310, // Dynamic ไม่มีข้อมูล Torque
        totalSystemPower: isDynamic ? 120 : 150,
        totalSystemTorque: isDynamic ? null : 310,
        variantId: variant.id
      }
    });

    // 3.3 สร้าง Performance
    await prisma.performance.create({
      data: {
        acceleration0To100: isExtended ? 8.5 : 9.5, // สำหรับ Dynamic ใส่ค่าประมาณการ
        range: isDynamic ? 420 : 530, // NEDC
        topSpeed: null, // ไม่มีข้อมูล
        seatingCapacity: is7Seat ? 7 : 6,
        variantId: variant.id
      }
    });

    // 3.4 สร้าง Battery
    await prisma.battery.create({
      data: {
        type: "BYD Blade Battery (LFP)",
        capacity: isDynamic ? 55.4 : 71.8, // kWh
        variantId: variant.id
      }
    });

    // 3.5 สร้าง SuspensionBraking
    await prisma.suspensionBraking.create({
      data: {
        frontSuspension: "แมคเฟอร์สันสตรัท",
        rearSuspension: "มัลติลิงก์",
        adaptiveSuspension: false,
        frontBrakeType: "ดิสก์เบรก แบบมีช่องระบายความร้อน",
        rearBrakeType: "ดิสก์เบรก",
        regenerativeBraking: isExtended, // เฉพาะ Extended
        tireSize: "225/55 R17",
        variantId: variant.id
      }
    });

    // 3.6 สร้าง ChargingSystem
    await prisma.chargingSystem.create({
      data: {
        acChargerType: "Type 2",
        acChargerPower: 7, // kW
        dcChargerType1: "CCS 2",
        dcChargerPower1: isDynamic ? 85 : 115, // kW
        v2lSupport: isExtended, // เฉพาะ Extended
        v2lAdapter: isExtended, // เฉพาะ Extended
        regenerativeBraking: isExtended, // เฉพาะ Extended
        variantId: variant.id
      }
    });

    // 3.7 สร้าง SafetyFeatures
    await prisma.safetyFeatures.upsert({
      where: { variantId: variant.id },
      create: {
        frontAirbags: true,
        sideAirbags: true,
        curtainAirbags: true,
        kneeBolsterAirbags: false, // ไม่มีข้อมูล แต่ปกติ BYD ไม่มี
        tirePressureMonitoring: true, // TPMS
        abs: true,
        ebd: true,
        esc: true,
        tcs: true,
        hillHoldControl: true, // HHC
        autoHoldFunction: true, // AVH
        aeb: true,
        forwardCollisionWarning: true, // FCW
        laneKeepAssist: isExtended, // LKA/ELKA (เฉพาะ Extended)
        laneDepartureWarning: true, // LDA
        blindSpotMonitoring: isExtended, // BSD (เฉพาะ Extended)
        rearCrossTrafficAlert: isExtended, // RCTA (เฉพาะ Extended)
        adaptiveCruiseControl: true, // ACC
        trafficSignRecognition: false, // ไม่มีข้อมูล
        driverAttentionMonitor: false, // ไม่มีข้อมูล
        frontParkingSensors: false, // มีแต่ด้านหลัง 4 จุด
        rearParkingSensors: true, // 4 จุด
        surroundViewCamera: true, // กล้อง 360
        automaticHeadlights: true,
        highBeamAssist: isExtended, // IHBC (เฉพาะ Extended)
        rainSensingWipers: false, // ไม่มีข้อมูล
        bhsSystem: true, // Brake Override System (BOS)
        doorOpenWarningSystem: isExtended, // DOW (เฉพาะ Extended)
        intelligentHeadlights: false, // ไม่มีข้อมูล
        drivingAssistanceSystem: true, // รวมๆ ระบบช่วยเหลือ
        headsUpDisplay: false,
        intelligentTorqueControl: false, // ไม่มีข้อมูล
        rearCollisionWarning: isExtended, // RCW (เฉพาะ Extended)
        rearCrossTrafficBrake: isExtended, // RCTB (เฉพาะ Extended)
        intelligentCruiseControl: isExtended, // ICC (เฉพาะ Extended)
        brakeDiscWiping: true, // BDW
        curveSpeedControl: false, // ไม่มีข้อมูล
        rolloverMitigation: true, // CRM
        variantId: variant.id
      },
      update: {}
    });

    // 3.8 สร้าง ExteriorFeatures
    await prisma.exteriorFeatures.create({
      data: {
        panoramicGlassRoof: isExtended, // เฉพาะ Extended
        electricSunroof: false, // ไม่มี Panoramic
        rearWiperWithIntermittentFunction: true,
        electricTailgate: isExtended, // เฉพาะ Extended
        rearWindowHeatedWithTimer: true,
        powerFoldingMirrors: true,
        autoFoldingMirrors: true,
        memoryPositionMirrors: false, // ไม่มีข้อมูล
        antiPinchWindowsWithOneTouchSystem: true, // ทุกบาน
        frontRearParkingSensors: true, // มีด้านหลัง
        heatedSideView: true, // กระจกมองข้างพร้อมระบบไล่ฝ้า
        // เพิ่ม field เฉพาะ M6 ถ้ามีใน schema
        roofRails: isExtended, // ราวหลังคา (เฉพาะ Extended)
        remoteWindowOperation: true, // ระบบควบคุมการเปิด-ปิดกระจกหน้าต่างระยะไกล
        autoDimmingSideMirrors: true, // กระจกมองข้างปรับลดแสงสะท้อนอัตโนมัติ
        variantId: variant.id
      }
    });

    // 3.9 สร้าง InteriorFeatures
    await prisma.interiorFeatures.create({
      data: {
        multiColorAmbientLighting: true, // ไฟสร้างบรรยากาศในห้องโดยสาร
        leatherSyntheticSeats: true, // เบาะหนังสังเคราะห์
        leatherSeats: false,
        lcdDisplay10Inch: true, // หน้าจอเรือนไมล์ LCD ขนาด 5 นิ้ว
        centerConsoleStorage: true, // ที่เก็บของคอนโซลกลาง
        syntheticLeatherSteeringWheel: true, // พวงมาลัยหุ้มหนังสังเคราะห์
        leatherSteeringWheel: false,
        eightWayPowerSeats: isExtended, // เบาะคนขับปรับไฟฟ้า 6 ทิศทาง (เฉพาะ Extended)
        backSeat4WayAdjustment: isExtended, // เบาะผู้โดยสารหน้าปรับไฟฟ้า 4 ทิศทาง (เฉพาะ Extended)
        frontSeatHeating: false, // ไม่มี
        ventilatedSeatsWithACSystem: isExtended, // ระบบระบายอากาศเบาะคู่หน้า (เฉพาะ Extended)
        electricMemorySeatDrivers: false, // ไม่มี
        steeringWheelHeatedAndMemory: false, // ไม่มี
        twoWaySunshades: true, // ที่บังแดดพร้อมกระจกแต่งหน้าและไฟส่องสว่าง
        adjustableRearHeadRests: true, // พนักพิงศีรษะเบาะหลังปรับระดับได้
        rearHeadRests2Way: false, // ไม่มีข้อมูล
        automaticDimmingRearviewMirror: true, // กระจกมองหลังตัดแสงอัตโนมัติ
        framelessRearviewMirror: false,
        antiBurglaryDoorPillar: false, // ไม่มีข้อมูล
        frontIlluminatedVanityMirror: true, // ที่บังแดดด้านหน้าพร้อมกระจกและไฟส่องสว่าง
        // เพิ่ม field เฉพาะ M6 ถ้ามีใน schema
        rearArmrest: isExtended, // ที่เท้าแขนด้านหลัง (เฉพาะ Extended)
        foldableSecondRowSeats: is7Seat, // เบาะแถว 2 พับได้ 60:40 (เฉพาะ 7 ที่นั่ง)
        foldableThirdRowSeats: true, // เบาะแถว 3 พับราบได้
        variantId: variant.id
      }
    });

    // 3.10 สร้าง EntertainmentFeatures
    await prisma.entertainmentFeatures.create({
      data: {
        fmRadio: true,
        appleCarPlayAndroid: true, // รองรับ Apple CarPlay® และ Android Auto™
        bluetoothConnectivity: true,
        touchscreen15Inch: true, // หน้าจอสัมผัสขนาดใหญ่ 12.8 นิ้ว ปรับหมุนได้
        dynAudio12Speakers: false, // ลำโพง 6 ตำแหน่ง
        thaiVoiceControl: true, // ระบบสั่งการด้วยเสียงภาษาไทย
        ambientTemperatureDisplay: true, // แสดงอุณหภูมิภายนอก
        digitalRadio: false, // ไม่มีข้อมูล
        frontUsbTypeAC: true, // ช่อง USB-A และ USB-C อย่างละ 1 ตำแหน่ง สำหรับผู้โดยสารตอนหน้า
        rearUsbTypeAC: true, // ช่อง USB-A และ USB-C อย่างละ 1 ตำแหน่ง สำหรับผู้โดยสารแถวที่ 2
        otaUpdateSupport: true, // รองรับการอัปเดตซอฟต์แวร์ผ่านทาง OTA
        speakerCount: 6,
        variantId: variant.id
      }
    });

    // 3.11 สร้าง LightingFeatures
    await prisma.lightingFeatures.create({
      data: {
        ledHeadlights: true, // ไฟหน้าแบบ LED
        followMeHomeFunction: true, // ฟังก์ชันหน่วงเวลาการปิดไฟหน้า
        ledDaytimeRunningLights: true, // ไฟส่องสว่างสำหรับการขับขี่กลางวันแบบ LED
        ledTaillights: true, // ไฟท้ายแบบ LED
        rearFogLights: false, // ไม่มีข้อมูล
        sequentialRearTurnSignals: true, // ระบบไฟเลี้ยวด้านหลังแบบ Sequential
        thirdBrakeLights: true, // ไฟเบรกดวงที่ 3
        rgbDynamicMoodLights: true, // ไฟสร้างบรรยากาศในห้องโดยสาร
        frontReadingLights: true, // ไฟอ่านแผนที่ด้านหน้าแบบ LED
        rearReadingLights: true, // ไฟส่องสว่างในห้องโดยสารตอนหลังแบบ LED
        doorSillScuffPlates: false, // ไม่มีข้อมูล
        variantId: variant.id
      }
    });

    // 3.12 สร้าง ComfortFeatures
    await prisma.comfortFeatures.create({
      data: {
        keylessEntry: true, // ระบบ Keyless Entry
        nfcCardKey: true, // ระบบกุญแจอิเล็กทรอนิกส์แบบการ์ด NFC
        wirelessPhoneChargers: isExtended, // ที่ชาร์จโทรศัพท์มือถือแบบไร้สาย (เฉพาะ Extended)
        twelveVoltOutlet: true, // ช่องจ่ายไฟ 12V
        pm25AirFilter: isExtended, // ระบบกรองอากาศ PM2.5 (เฉพาะ Extended)
        cn95AirFilter: false, // ไม่มีข้อมูล
        airIonizer: false, // ไม่มีข้อมูล
        dualZoneClimateControl: true, // ระบบปรับอากาศอัตโนมัติ
        rearAirVents: true, // ช่องแอร์สำหรับผู้โดยสารตอนหลัง
        firstAidKit: false, // ไม่มีข้อมูล
        emergencyKit: false, // ไม่มีข้อมูล
        bydDigitalKey: isExtended, // BYD Digital Key (เฉพาะ Extended)
        variantId: variant.id
      }
    });

    console.log(`Seeding completed successfully for ${variant.name}`);
  }

  console.log('Completed seeding BYD M6');
}