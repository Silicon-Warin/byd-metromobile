import type { CarModel as BaseCarModel, CarColor as BaseCarColor, CarVariant as BaseCarVariant  } from "@/data/carModel"

export interface CarColor extends BaseCarColor {
  gradient?: string
  shadow?: string
  border?: string
}

export interface CarVariant extends BaseCarVariant {
  accelerationData?: {
    value: string
    unit: string
    description: string
  }
}

export interface CarModel extends BaseCarModel {
  colors?: CarColor[]
  variants: CarVariant[]  
  batteryImage?: string
  platformImage?: string
  roofImage?: string
  exteriorImage?: string
}


