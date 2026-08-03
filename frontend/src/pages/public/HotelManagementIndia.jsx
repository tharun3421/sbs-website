import React from 'react'
import { Building2 } from 'lucide-react'
import HotelManagement from '../../components/HotelManagement'

export default function HotelManagementIndia() {
  return (
    <HotelManagement
      country="India"
      icon={Building2}
      accent="#4FC3F7"
    />
  )
}