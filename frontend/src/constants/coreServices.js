// Single source of truth for the site's core services.
// Home.jsx renders this list, and AssociateResources / AdminResources use
// it to drive the exact set of categories a resource can belong to, so a
// resource category always maps 1:1 to a real service.
export const CORE_SERVICES = [
  { to: '/jobs/free',                  label: 'Free Jobs' },
  { to: '/jobs/tally',                 label: 'Tally Jobs' },
  { to: '/study-abroad',               label: 'Abroad Study – Visit – PR' },
  { to: '/online-degrees',             label: 'Online Degrees' },
  { to: '/business-offers',            label: 'Business Offers' },
  { to: '/hotel-management/india',     label: 'Hotel Management (India)' },
  { to: '/hotel-management/mauritius', label: 'Hotel Management (Mauritius)' }, 
  { to: '/loans',          label: 'Loans' },
  { to: '/other-services', label: 'Other Services' },
]

export const CORE_SERVICE_LABELS = CORE_SERVICES.map(s => s.label)