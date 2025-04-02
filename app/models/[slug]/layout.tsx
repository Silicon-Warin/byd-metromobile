import { Suspense } from "react";
import { notFound } from "next/navigation";
import { findModelBySlug } from "@/data/carModel";
import ModelPageLoading from "./loading";

export default function ModelLayout({ 
  children,
  params 
}: { 
  children: React.ReactNode;
  params: { slug: string } 
}) {
  // ตรวจสอบว่ามีรถยนต์ที่ตรงกับ slug หรือไม่
  const { slug } = params;
  const carModel = findModelBySlug(slug);

  // ถ้าไม่พบรถยนต์ที่ตรงกับ slug ให้แสดงหน้า not found
  if (!carModel) {
    notFound();
  }

  return (
    <Suspense fallback={<ModelPageLoading />}>
      {children}
    </Suspense>
  );
}
