export interface BlogPost {
	id: number;
	title: string;
	summary: string;
	imageUrl: string;
	imagesSrc?: string[];
	date: string;
	category: string;
	slug: string;
	content: string;
	tags: string[];
	readTime: string;
}

export const blogPosts: BlogPost[] = [
	{
		id: 1,
		title: "สมเด็จพระเทพฯ เสด็จฯ เยือน BYD สำนักงานใหญ่ ณ เมืองเซินเจิ้น",
		summary:
			"สมเด็จพระกนิษฐาธิราชเจ้า กรมสมเด็จพระเทพรัตนราชสุดาฯ เสด็จฯ เยือนสำนักงานใหญ่ BYD ณ เมืองเซินเจิ้น ทรงทอดพระเนตรเทคโนโลยียานยนต์พลังงานใหม่และส่งเสริมความร่วมมือด้านพลังงานสะอาด",
		imageUrl: "/images/news/18072025/cover-blog.jpg",
		imagesSrc: [
			"/images/news/18072025/gallery-01.jpg",
			"/images/news/18072025/gallery-02.jpg",
			"/images/news/18072025/gallery-03.jpg",
			"/images/news/18072025/gallery-04.jpg",
			"/images/news/18072025/gallery-05.jpg",
			"/images/news/18072025/gallery-06.jpg",
			"/images/news/18072025/gallery-07.jpg",
			"/images/news/18072025/gallery-08.jpg",
			"/images/news/18072025/gallery-09.jpg",
			"/images/news/18072025/gallery-10.jpg",
			"/images/news/18072025/gallery-11.jpg",
			"/images/news/18072025/gallery-12.jpg",
			"/images/news/18072025/gallery-13.jpg",
			"/images/news/18072025/gallery-14.jpg",
			"/images/news/18072025/gallery-15.jpg",
			"/images/news/18072025/gallery-16.jpg",
			"/images/news/18072025/gallery-17.jpg",
			"/images/news/18072025/gallery-18.jpg",
			"/images/news/18072025/gallery-19.jpg",
			"/images/news/18072025/gallery-20.jpg",
		],
		date: "15 กรกฎาคม 2568",
		category: "ข่าวกิจกรรม",
		slug: "princess-sirindhorn-visits-byd-hq",
		readTime: "4 นาที",
		content: `
    <p class="text-lg mb-6">
      เมื่อวันที่ 15 กรกฎาคม พ.ศ. 2568 สมเด็จพระกนิษฐาธิราชเจ้า กรมสมเด็จพระเทพรัตนราชสุดาฯ สยามบรมราชกุมารี ได้เสด็จพระราชดำเนินเยือนสำนักงานใหญ่ BYD ณ เมืองเซินเจิ้น สาธารณรัฐประชาชนจีน เพื่อทรงศึกษาเทคโนโลยียานยนต์พลังงานใหม่และส่งเสริมความร่วมมือด้านพลังงานสะอาดระหว่างสองประเทศ
    </p>
    <h2 class="text-2xl font-bold mb-4 mt-8">ทรงทอดพระเนตรนวัตกรรมยานยนต์ไฟฟ้า</h2>
    <p class="mb-6">
      ในการนี้ พระองค์ได้ทรงทอดพระเนตรนวัตกรรมยานยนต์ไฟฟ้าของ BYD พร้อมทั้งทรงแลกเปลี่ยนความคิดเห็นกับคณะผู้บริหาร BYD ในประเด็นสำคัญ เช่น การพัฒนาอุตสาหกรรมพลังงานใหม่ และเป้าหมายความเป็นกลางทางคาร์บอน
    </p>
    <h3 class="text-xl font-semibold mb-3 mt-6">พระราชดำรัสและความร่วมมือ</h3>
    <p class="mb-6">
      การเสด็จฯ ครั้งนี้ พระองค์ยังได้ทรงอักษรด้วยพู่กันจีนข้อความว่า “科技致远” ซึ่งมีความหมายว่า "เทคโนโลยีขับเคลื่อนอนาคตอันก้าวไกล" สะท้อนถึงพระวิสัยทัศน์ในการสนับสนุนเทคโนโลยีและนวัตกรรมเพื่ออนาคตที่ยั่งยืน
    </p>
    <ul class="list-disc list-inside mb-6 space-y-2">
      <li>ส่งเสริมความร่วมมือด้านพลังงานสะอาดระหว่างไทย-จีน</li>
      <li>เน้นย้ำเป้าหมายความเป็นกลางทางคาร์บอน</li>
      <li>สนับสนุนการพัฒนาเทคโนโลยียานยนต์ไฟฟ้า</li>
    </ul>
    <p class="mb-6">
      BYD รู้สึกเป็นเกียรติอย่างยิ่งที่ได้ถวายการต้อนรับ และยืนยันความมุ่งมั่นในการร่วมมือกับประเทศไทยเพื่อสร้างสรรค์อนาคตที่เป็นมิตรต่อสิ่งแวดล้อมและยั่งยืนยิ่งขึ้น
    </p>
    <p class="mb-6 italic bg-gray-800/30 p-4 rounded-lg border-l-4 border-primary">
      "BYD ขอขอบพระคุณในพระมหากรุณาธิคุณ และพร้อมเดินหน้าสนับสนุนการพัฒนาเทคโนโลยีเพื่ออนาคตที่ยั่งยืนของทั้งสองประเทศ"
    </p>
  `,
		tags: [
			"BYD",
			"สมเด็จพระเทพฯ",
			"เทคโนโลยี",
			"พลังงานสะอาด",
			"รถยนต์ไฟฟ้า",
			"ความร่วมมือไทย-จีน",
		],
	},
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
	return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
	return blogPosts.filter((post) => post.slug !== currentSlug).slice(0, limit);
}
