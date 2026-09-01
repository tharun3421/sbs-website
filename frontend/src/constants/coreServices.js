export const CORE_SERVICES = [
  { to: '/jobs/free',                  label: 'Software -IT /Careers /Projects/ Internships /OJTs' },
  { to: '/study-abroad',               label: 'Abroad Study' },
  { to: '/online-degrees',             label: 'Online Degrees' },
  { to: '/business-offers',            label: 'Business Offers' },
  { to: '/hotel-management/india',     label: 'Hotel Management (India)' },
  { to: '/hotel-management/mauritius', label: 'Hotel Management (Mauritius)' },
  { to: '/loans',          label: 'Loans Personal /Business /Home/ Plot/Education /Third Party /Reloan/ Takeover/ Private Finance' },
  { to: '/phd-admissions', label: 'Ph. D Admissions \nFullTime/PartTime/Online Ph.D/FullFunded/Research/ Honorary Ph. D' },
  { to: '/other-services', label: 'Other Services' },
  { to: '/trading-course', label: 'Learn & Earn \n Stocks/Gold&Silver/Crypto/ NIFTY/SENSEX' },
  { to: '/fast-track-degrees', label: 'Fast Track Degrees \n BA/BCOM/BBA/BCA/ MA/MCOM/MBA/MCA' },
  { to: '/extra-income',       label: 'Need Extra Income? \n Become Online Tutor/Trainer/ Coach/Mentor' },
]

export const CORE_SERVICE_LABELS = CORE_SERVICES.map(s => s.label)

// Categories shown on the Associate Resources page (uploads: posters, videos,
// social links) and in the admin resource-upload dropdown. This is separate
// from CORE_SERVICE_LABELS so a resource-only category doesn't turn into a
// clickable "service" on the Home / Other Services pages.
export const RESOURCE_CATEGORY_LABELS = [
  ...CORE_SERVICE_LABELS,
  'Freelancer / Work From Home / Extra Income / Business Income',
  'Work Visas/ Visit Visas/PR'
]

export const HOME_EXTRA_SERVICES = [
  { to: '/visas',     label: 'Visas \n Work Visas/ Visit Visas/PR' },
  { to: '/freelance', label: 'Become Associate \n Freelancer /Work From Home / Extra Income/ Business Income' },
  { to: '/tutors',    label: 'Find your Online Tutor/Trainer \n Teacher/Coach/Mentor/Advisor/Counsellor' },
]