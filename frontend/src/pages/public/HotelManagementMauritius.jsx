import React from 'react'
import { Palmtree } from 'lucide-react'
import HotelManagement from '../../components/HotelManagement'

export default function HotelManagementMauritius() {
  return (
    <HotelManagement
      country="Mauritius"
      icon={Palmtree}
      accent="#44DD88"
    />
  )
}