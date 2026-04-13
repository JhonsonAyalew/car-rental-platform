export default {
  page: {
    title: "Platform Setdfghjkhgftings",
    subtitle: "Configure your platform settings and preferences",
    resetButton: "Reset",
    saveButton: "Save Changes"
  },
  tabs: {
    general: "General",
    fees: "Fees & Pricing",
    notifications: "Notifications",
    security: "Security",
    payment: "Payment"
  },
  general: {
    title: "General Settings",
    platformName: "Platform Name",
    supportEmail: "Support Email",
    supportPhone: "Support Phone",
    platformAddress: "Platform Address",
    timezone: "Timezone",
    timezoneOptions: {
      addis: "East Africa Time (EAT) - Addis Ababa",
      nairobi: "East Africa Time (EAT) - Nairobi",
      utc: "UTC"
    },
    defaultLanguage: "Default Language",
    languageOptions: {
      en: "English",
      am: "አማርኛ (Amharic)"
    }
  },
  fees: {
    title: "Fees & Pricing Configuration",
    platformFee: "Platform Fee (%)",
    minRentalDays: "Minimum Rental Days",
    maxRentalDays: "Maximum Rental Days",
    cancellationWindow: "Cancellation Window (hours)",
    securityDeposit: "Default Security Deposit (ETB)",
    lateFee: "Late Fee (per hour)",
    insuranceFee: "Insurance Fee (per day)",
    infoMessage: "Changes to fees will affect all new bookings. Existing bookings will not be affected.",
    suffixHours: "hours"
  },
  notifications: {
    title: "Notification Preferences",
    email: {
      title: "Email Notifications",
      desc: "Receive email updates about your account"
    },
    sms: {
      title: "SMS Notifications",
      desc: "Receive SMS alerts for important updates"
    },
    bookingAlerts: {
      title: "Booking Alerts",
      desc: "Get notified about new bookings"
    },
    paymentAlerts: {
      title: "Payment Alerts",
      desc: "Get notified about payment transactions"
    },
    weeklyDigest: {
      title: "Weekly Digest",
      desc: "Receive weekly summary of platform activity"
    }
  },
  security: {
    title: "Security Settings",
    sessionTimeout: "Session Timeout (minutes)",
    passwordExpiry: "Password Expiry (days)",
    maxLoginAttempts: "Max Login Attempts",
    ipWhitelist: "IP Whitelist (comma separated)",
    ipWhitelistPlaceholder: "192.168.1.1, 10.0.0.1",
    twoFactorAuth: {
      title: "Two-Factor Authentication (2FA)",
      desc: "Require 2FA for admin accounts"
    },
    maintenanceMode: {
      title: "Maintenance Mode",
      desc: "Put the platform in maintenance mode"
    }
  },
  payment: {
    title: "Payment Gateway Configuration",
    gateway: "Payment Gateway",
    gatewayOptions: {
      chapa: "Chapa (Ethiopia)",
      telebirr: "TeleBirr",
      cbebirr: "CBE Birr",
      stripe: "Stripe (International)"
    },
    apiKey: "API Key / Secret",
    bankName: "Bank Name",
    accountNumber: "Account Number",
    accountName: "Account Name",
    settlementDays: "Settlement Days",
    infoMessage: "Test mode is currently enabled. Switch to live mode when ready to accept real payments."
  },
  sidebar: {
    dataManagement: {
      title: "Data Management",
      export: "Export All Data",
      import: "Import Backup",
      print: "Print Settings"
    },
    systemStatus: {
      title: "System Status",
      platformStatus: "Platform Status",
      operational: "Operational",
      lastBackup: "Last Backup",
      version: "Version",
      checkUpdates: "Check for Updates"
    },
    help: {
      title: "Need Help?",
      message: "Having trouble with settings? Contact our support team for assistance.",
      button: "Contact Support"
    }
  },
  toast: {
    saveSuccess: "{section} settings saved successfully!",
    resetSuccess: "Settings reset to default"
  }
};
