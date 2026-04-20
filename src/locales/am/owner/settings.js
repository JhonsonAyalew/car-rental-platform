export default {
  title: "Settings",
  subtitle: "Manage your equipment rental business settings",
  
  tabs: {
    general: "General",
    notifications: "Notifications",
    pricing: "Pricing",
    availability: "Availability",
    businessHours: "Business Hours"
  },
  
  general: {
    businessInfo: {
      title: "Business Information",
      businessName: "Business Name",
      businessEmail: "Business Email",
      primaryPhone: "Primary Phone",
      alternativePhone: "Alternative Phone",
      website: "Website"
    },
    regionalSettings: {
      title: "Regional Settings",
      timezone: "Timezone",
      timezoneOptions: {
        addis: "East Africa Time (EAT) - Addis Ababa",
        nairobi: "East Africa Time (EAT) - Nairobi",
        cairo: "Eastern European Time - Cairo"
      },
      language: "Language",
      languageOptions: {
        english: "English Only",
        amharic: "Amharic Only",
        bilingual: "Bilingual (English + Amharic)"
      },
      dateFormat: "Date Format",
      dateFormatOptions: {
        ethiopian: "DD/MM/YYYY (Ethiopian)",
        us: "MM/DD/YYYY (US)",
        iso: "YYYY-MM-DD (ISO)"
      },
      currency: "Currency",
      currencyOptions: {
        etb: "Ethiopian Birr (ETB)",
        usd: "US Dollar (USD)"
      }
    }
  },
  
  notifications: {
    email: {
      title: "Email Notifications",
      newBooking: {
        label: "New Booking Request",
        desc: "Get notified when someone books your equipment"
      },
      cancellation: {
        label: "Booking Cancellation",
        desc: "Get notified when a booking is cancelled"
      },
      payment: {
        label: "Payment Received",
        desc: "Get notified when payment is made"
      },
      reminders: {
        label: "Booking Reminders",
        desc: "Receive reminders before upcoming bookings"
      }
    },
    sms: {
      title: "SMS Notifications",
      newBooking: {
        label: "New Booking SMS",
        desc: "Get SMS for new bookings"
      },
      reminders: {
        label: "Reminder SMS",
        desc: "Get SMS reminders before bookings"
      }
    },
    reports: {
      title: "Reports",
      weekly: {
        label: "Weekly Performance Report",
        desc: "Receive weekly summary of your bookings and earnings"
      },
      monthly: {
        label: "Monthly Analytics Report",
        desc: "Receive detailed monthly analytics"
      }
    }
  },
  
  pricing: {
    rentalRates: {
      title: "Rental Rates (ETB)",
      hourlyRate: "Default Hourly Rate (ETB)",
      dailyRate: "Default Daily Rate (ETB)",
      weeklyDiscount: "Weekly Discount (%)",
      monthlyDiscount: "Monthly Discount (%)"
    },
    depositsFees: {
      title: "Deposits & Fees",
      securityDeposit: "Security Deposit (%)",
      lateFee: "Late Fee (ETB per hour)",
      cancellationFee: "Cancellation Fee (%)",
      operatorFee: "Operator Fee (ETB per day)"
    },
    deliveryFees: {
      title: "Delivery Fees (ETB)",
      withinAddis: "Delivery within Addis Ababa",
      outsideAddis: "Delivery outside Addis Ababa"
    }
  },
  
  availability: {
    defaultAvailability: {
      title: "Default Availability",
      startTime: "Default Start Time",
      endTime: "Default End Time",
      bufferTime: "Buffer Between Bookings (minutes)",
      advanceBooking: "Advance Booking Days",
      minHours: "Minimum Rental Hours",
      minDays: "Minimum Rental Days"
    },
    specialAvailability: {
      title: "Special Availability",
      weekends: {
        label: "Available on Weekends",
        desc: "Enable weekend rentals"
      },
      holidays: {
        label: "Available on Ethiopian Holidays",
        desc: "Enable rentals during holidays (additional fee applies)"
      }
    },
    emergencyContact: {
      title: "Emergency Contact",
      label: "24/7 Emergency Contact Number",
      placeholder: "+251 XXX XXX XXX"
    }
  },
  
  businessHours: {
    title: "Weekly Business Hours",
    days: {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday"
    },
    closed: "Closed",
    to: "to"
  },
  
  actions: {
    reset: "Reset to Default",
    save: "Save All Settings",
    resetConfirm: "Are you sure you want to reset all settings to default?"
  },
  
  toastMessages: {
    saveSuccess: "Settings saved successfully!",
    resetSuccess: "Settings reset to default"
  }
};
