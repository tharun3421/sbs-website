import React from 'react'
import { Palmtree } from 'lucide-react'
import HotelManagement from '../../components/HotelManagement'

export default function HotelManagementMauritius() {
  return (
    <HotelManagement
      country="Mauritius"
      icon={Palmtree}
      accent="#44DD88"
      refTitle="Hotel Management (Mauritius)"
      highlights={[
        'Hotel & hospitality management programs in Mauritius',
        'Guidance on visa, travel, and accommodation',
        'Placement assistance with resorts and hotel chains',
        'Support with admissions and documentation',
      ]}
    />
  )
}