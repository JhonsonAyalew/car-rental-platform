import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

/* ─────────────────────────────────────────────────────
   English translations
───────────────────────────────────────────────────── */
const en = {
  common: {
    appName: 'EquipRent Ethiopia',
    loading: 'Loading…',
    save: 'Save', cancel: 'Cancel', delete: 'Delete',
    edit: 'Edit', view: 'View', back: 'Back',
    confirm: 'Confirm', submit: 'Submit',
    search: 'Search', filter: 'Filter', clear: 'Clear',
    yes: 'Yes', no: 'No',
    success: 'Success', error: 'Error', warning: 'Warning',
    required: 'This field is required',
    welcome: 'Welcome',
    logout: 'Logout',
  },

  publicLayout: {
    nav: { home: 'Home', search: 'Equipment', about: 'About', contact: 'Contact' },
  },

  adminLayout: {
    brand: 'EquipRent',
    nav: {
      dashboard: 'Dashboard', timeController: 'Time Controller',
      equipment: 'Equipment', categories: 'Categories',
      submissions: 'Submissions', bookings: 'Bookings',
      materials: 'Materials', customers: 'Customers',
      owners: 'Owners', reports: 'Reports',
      settings: 'Settings', profile: 'My Profile',
    },
    sections: { main: 'Main', management: 'Management', users: 'Users', reports: 'Reports', settings: 'Settings' },
    logout: 'Logout',
    pageTitle: {
      dashboard: 'Dashboard', timeController: 'Time Controller',
      equipment: 'Equipment', categories: 'Categories',
      submissions: 'Pending Submissions', bookings: 'Bookings',
      materials: 'Materials', customers: 'Customers',
      owners: 'Equipment Owners', reports: 'Reports & Analytics',
      settings: 'Settings', profile: 'My Profile',
    },
    topbar: { subtitle: 'Manage your platform' },
    footer: { copyright: '© 2024 EquipRent Ethiopia. All rights reserved.' },
  },

  carOwnerLayout: {
    nav: {
      dashboard: 'Dashboard', submit: 'Add Equipment',
      submissions: 'My Submissions', calendar: 'Calendar',
      analytics: 'Analytics', profile: 'Profile', settings: 'Settings',
    },
  },

  customerLayout: {
    nav: { dashboard: 'Dashboard', browse: 'Browse', bookings: 'My Bookings', profile: 'Profile' },
  },

  adminDashboard: {
    title: 'Dashboard',
    subtitle: 'Overview of your equipment rental platform',
    kpi: {
      equipment: 'Total Equipment', bookings: 'Active Bookings',
      pending: 'Pending Submissions', revenue: 'Total Revenue',
      users: 'Total Users', owners: 'Equipment Owners',
      slots: 'Active Time Slots', materials: 'Material Requests',
    },
    charts: { revenue: 'Revenue Overview', distribution: 'Equipment Distribution', trends: 'Monthly Trends' },
    tables: { submissions: 'Pending Submissions', bookings: 'Recent Bookings' },
  },

  ownerDashboard: {
    title: 'Owner Dashboard',
    subtitle: 'Manage your equipment and track earnings',
    addEquipment: 'Add Equipment',
    kpi: { equipment: 'My Equipment', active: 'Active Bookings', monthly: 'This Month', rating: 'Avg. Rating' },
    charts: { earnings: 'Monthly Earnings' },
  },

  submitEquipment: {
    title: 'Submit Equipment',
    subtitle: 'List your equipment for rent on the platform',
    steps: {
      basic: 'Basic Info', details: 'Details',
      pricing: 'Pricing', location: 'Location', media: 'Media & Docs',
    },
  },

  mySubmissions: {
    title: 'My Submissions',
    subtitle: 'Track your equipment listings and approvals',
    addNew: 'Add New',
  },

  Home: {
    hero: {
      badge: "Ethiopia's #1 Equipment Rental Platform",
      title: 'Rent Heavy Equipment Across Ethiopia',
      subtitle: 'Connect with verified equipment owners. Book excavators, trucks, cranes and more — fast and affordable.',
      cta: 'Browse Equipment',
      secondary: 'List Your Equipment',
    },
    categories: { title: 'Browse by Category' },
    featured:   { title: 'Featured Equipment' },
    features:   { title: 'Why Choose EquipRent?' },
    cta: {
      title: 'Own Equipment? Earn More.',
      subtitle: 'List your machines on EquipRent and earn passive income. Join 67 active equipment owners today.',
      button: 'Start Listing for Free',
    },
  },
};

/* ─────────────────────────────────────────────────────
   Amharic translations
───────────────────────────────────────────────────── */
const am = {
  common: {
    appName: 'EquipRent ኢትዮጵያ',
    loading: 'እየጫነ…',
    save: 'አስቀምጥ', cancel: 'ሰርዝ', delete: 'ሰርዝ',
    edit: 'አርትዕ', view: 'ይዩ', back: 'ተመለስ',
    confirm: 'አረጋግጥ', submit: 'አስገባ',
    search: 'ፈልግ', filter: 'አጣራ', clear: 'አጽዳ',
    yes: 'አዎ', no: 'አይ',
    success: 'ተሳካ', error: 'ስህተት', warning: 'ማስጠንቀቂያ',
    required: 'ይህ መስክ ያስፈልጋል',
    welcome: 'እንኳን ደህና መጡ',
    logout: 'ውጣ',
  },

  publicLayout: {
    nav: { home: 'ዋና ገጽ', search: 'መሣሪያዎች', about: 'ስለ እኛ', contact: 'ያግኙን' },
  },

  adminLayout: {
    brand: 'EquipRent',
    nav: {
      dashboard: 'ዳሽቦርድ', timeController: 'ጊዜ መቆጣጠሪያ',
      equipment: 'ዕቃዎች', categories: 'ምድቦች',
      submissions: 'ያቀረቡ', bookings: 'ቦታ ማስያዝ',
      materials: 'ቁሳቁሶች', customers: 'ደንበኞች',
      owners: 'ዕቃ ባለቤቶች', reports: 'ሪፖርቶች',
      settings: 'ቅንብሮች', profile: 'መግቢያ',
    },
    sections: { main: 'ዋና', management: 'አስተዳደር', users: 'ተጠቃሚዎች', reports: 'ሪፖርቶች', settings: 'ቅንብሮች' },
    logout: 'ውጣ',
    pageTitle: {
      dashboard: 'ዳሽቦርድ', timeController: 'ጊዜ መቆጣጠሪያ',
      equipment: 'ዕቃዎች', categories: 'ምድቦች',
      submissions: 'በይደር ያሉ ማቅረቦች', bookings: 'ቦታ ማስያዝ',
      materials: 'ቁሳቁሶች', customers: 'ደንበኞች',
      owners: 'ዕቃ ባለቤቶች', reports: 'ሪፖርቶች እና ትንታኔዎች',
      settings: 'ቅንብሮች', profile: 'የእኔ መገለጫ',
    },
    topbar: { subtitle: 'መድረኩን ያስተዳድሩ' },
    footer: { copyright: '© 2024 EquipRent ኢትዮጵያ። መብቱ በሕግ የተጠበቀ ነው።' },
  },

  carOwnerLayout: {
    nav: {
      dashboard: 'ዳሽቦርድ', submit: 'ዕቃ ያክሉ',
      submissions: 'ያቀረቧቸው', calendar: 'የቀን መቁጠሪያ',
      analytics: 'ትንታኔ', profile: 'መገለጫ', settings: 'ቅንብሮች',
    },
  },

  customerLayout: {
    nav: { dashboard: 'ዳሽቦርድ', browse: 'ፈልግ', bookings: 'ቦታ ማስያዝዬ', profile: 'መገለጫ' },
  },

  adminDashboard: {
    title: 'ዳሽቦርድ',
    subtitle: 'የዕቃ ኪራይ መድረኩ አጠቃላይ እይታ',
    kpi: {
      equipment: 'ጠቅላላ ዕቃዎች', bookings: 'ንቁ ቦታ ማስያዞች',
      pending: 'በይደር ያሉ ማቅረቦች', revenue: 'ጠቅላላ ገቢ',
      users: 'ጠቅላላ ተጠቃሚዎች', owners: 'ዕቃ ባለቤቶች',
      slots: 'ንቁ የጊዜ ክፍሎች', materials: 'የቁሳቁስ ጥያቄዎች',
    },
    charts: { revenue: 'የገቢ አጠቃላይ', distribution: 'የዕቃ ስርጭት', trends: 'ወርሃዊ አዝማሚያዎች' },
    tables: { submissions: 'በይደር ያሉ ማቅረቦች', bookings: 'የቅርብ ቦታ ማስያዞች' },
  },

  ownerDashboard: {
    title: 'የባለቤት ዳሽቦርድ',
    subtitle: 'ዕቃዎቾን ያስተዳድሩ እና ገቢ ይከታተሉ',
    addEquipment: 'ዕቃ ያክሉ',
    kpi: { equipment: 'ዕቃዎቼ', active: 'ንቁ ቦታ ማስያዞች', monthly: 'ይህ ወር', rating: 'አማካይ ደረጃ' },
    charts: { earnings: 'ወርሃዊ ገቢ' },
  },

  submitEquipment: {
    title: 'ዕቃ ያስገቡ',
    subtitle: 'ዕቃዎን ለኪራይ በመድረኩ ላይ ያስዘርዝሩ',
    steps: {
      basic: 'መሰረታዊ መረጃ', details: 'ዝርዝሮች',
      pricing: 'ዋጋ', location: 'ቦታ', media: 'ሚዲያ እና ሰነዶች',
    },
  },

  mySubmissions: {
    title: 'ያቀረቧቸው',
    subtitle: 'ዕቃ ዝርዝሮቾን እና ፈቃዶቾን ይከታተሉ',
    addNew: 'አዲስ ያክሉ',
  },

  Home: {
    hero: {
      badge: 'የኢትዮጵያ ቁጥር 1 የዕቃ ኪራይ መድረክ',
      title: 'ከባድ ዕቃዎችን በኢትዮጵያ ያከራዩ',
      subtitle: 'ከተረጋገጡ ዕቃ ባለቤቶች ጋር ይገናኙ። ቁፋሮዎችን፣ ተሽከርካሪዎችን እና ክሬኖችን ያዙ — ፈጣን እና ተመጣጣኝ።',
      cta: 'ዕቃዎችን ፈልግ',
      secondary: 'ዕቃዎን ዝርዝር ያድርጉ',
    },
    categories: { title: 'በምድብ ፈልግ' },
    featured:   { title: 'ተለዩ ዕቃዎች' },
    features:   { title: 'EquipRentን ለምን ይምረጡ?' },
    cta: {
      title: 'ዕቃ አለዎት? ተጨማሪ ያግኙ።',
      subtitle: 'ዕቃዎን EquipRent ላይ ዝርዝር ያድርጉ እና ተጨማሪ ገቢ ያግኙ። ዛሬ ከ67 ዕቃ ባለቤቶች ጋር ይቀላቀሉ።',
      button: 'ዝርዝር ማድረግ ይጀምሩ',
    },
  },
};

/* ─────────────────────────────────────────────────────
   Build the resources object with all namespaces
───────────────────────────────────────────────────── */
const buildResources = (translations) => {
  const resources = {};
  Object.entries(translations).forEach(([lang, namespaces]) => {
    resources[lang] = {};
    Object.entries(namespaces).forEach(([ns, data]) => {
      resources[lang][ns] = data;
    });
  });
  return resources;
};

const resources = buildResources({ en, am });

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng:      localStorage.getItem('i18nextLng') || 'en',
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: Object.keys(en),
    interpolation: { escapeValue: false },
    debug: false,
  });

export default i18n;
