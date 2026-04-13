export default {
  title: "List Your Heavy Equipment",
  subtitle: "Start earning by listing your construction equipment in Ethiopia",
  
  stepProgress: {
    steps: ["Basic Info", "Equipment Details", "Photos", "Pricing & Location", "Review"]
  },
  
  step1: {
    equipmentTitle: {
      label: "Equipment Title *",
      placeholder: "e.g., CAT 320 Excavator - 2022 Model"
    },
    equipmentType: {
      label: "Equipment Type *",
      placeholder: "Select equipment type"
    },
    brand: {
      label: "Brand *",
      placeholder: "e.g., Caterpillar, Komatsu, Liebherr"
    },
    model: {
      label: "Model *",
      placeholder: "e.g., 320, PC200, LTM 1050"
    },
    year: {
      label: "Year *",
      placeholder: "e.g., 2022"
    },
    color: {
      label: "Color",
      placeholder: "e.g., Yellow, Black, White"
    },
    infoBox: {
      text: "Make sure to provide accurate equipment specifications. This helps contractors find your equipment for their construction projects in Ethiopia."
    }
  },
  
  step2: {
    attachment: {
      label: "Attachment / Bucket Type *",
      placeholder: "Select attachment"
    },
    transmission: {
      label: "Transmission *",
      options: {
        automatic: "Automatic",
        manual: "Manual",
        semiAutomatic: "Semi-Automatic"
      }
    },
    fuelType: {
      label: "Fuel Type *",
      options: {
        diesel: "Diesel",
        petrol: "Petrol",
        electric: "Electric",
        hybrid: "Hybrid"
      }
    },
    operatingWeight: {
      label: "Operating Weight *",
      placeholder: "e.g., 20000 (kg)",
      suffix: "kg"
    },
    enginePower: {
      label: "Engine Power *",
      placeholder: "e.g., 200 HP"
    },
    features: {
      label: "Features & Amenities"
    }
  },
  
  step3: {
    uploader: {
      tips: "Tips for great photos: Take clear, well-lit photos from all angles. Include exterior, interior, cabin, attachment, and any unique features. Photos of the equipment working on site are very effective."
    },
    error: "Please upload at least one photo of your equipment"
  },
  
  step4: {
    pricing: {
      pricePerDay: {
        label: "Price per Day * (ETB)",
        placeholder: "e.g., 8500"
      },
      pricePerHour: {
        label: "Price per Hour * (ETB)",
        placeholder: "e.g., 1200"
      },
      pricePerWeek: {
        label: "Price per Week (Optional)",
        placeholder: "e.g., 50000"
      },
      pricePerMonth: {
        label: "Price per Month (Optional)",
        placeholder: "e.g., 180000"
      },
      securityDeposit: {
        label: "Security Deposit * (ETB)",
        placeholder: "e.g., 50000"
      },
      lateFee: {
        label: "Late Fee per Hour (ETB)",
        placeholder: "e.g., 500"
      }
    },
    
    location: {
      region: {
        label: "Region *",
        placeholder: "Select region"
      },
      city: {
        label: "City *",
        placeholder: "Select city"
      },
      subcity: {
        label: "Subcity / District",
        placeholder: "e.g., Bole, Kazanchis"
      },
      woreda: {
        label: "Woreda / Zone",
        placeholder: "e.g., Woreda 03"
      }
    },
    
    contact: {
      name: {
        label: "Contact Name *",
        placeholder: "Your full name"
      },
      phone: {
        label: "Contact Phone *",
        placeholder: "+251 911 234567"
      },
      instructions: {
        label: "Pickup / Delivery Instructions",
        placeholder: "Provide detailed instructions for equipment pickup or delivery in Ethiopia..."
      }
    },
    
    additionalServices: {
      title: "Additional Services (Optional)",
      operator: "✓ Professional operator available (+ ETB 500/day)",
      delivery: "✓ Delivery service available within Ethiopia (+ ETB 2,000 - 5,000)",
      maintenance: "✓ Regular maintenance included in price"
    }
  },
  
  step5: {
    reviewCards: {
      equipmentInfo: {
        title: "Equipment Information",
        fields: {
          title: "Title:",
          type: "Type:",
          brandModel: "Brand & Model:",
          attachment: "Attachment:",
          transmission: "Transmission:",
          fuelType: "Fuel Type:",
          operatingWeight: "Operating Weight:",
          enginePower: "Engine Power:"
        }
      },
      pricing: {
        title: "Pricing (ETB)",
        fields: {
          perDay: "Price per Day:",
          perHour: "Price per Hour:",
          perWeek: "Price per Week:",
          perMonth: "Price per Month:",
          securityDeposit: "Security Deposit:"
        }
      },
      location: {
        title: "Location & Contact (Ethiopia)",
        fields: {
          region: "Region:",
          city: "City:",
          contact: "Contact:",
          phone: "Phone:"
        }
      },
      features: {
        title: "Features & Amenities"
      },
      additionalServices: {
        title: "Additional Services",
        operator: "✓ Operator Available",
        delivery: "✓ Delivery Available",
        maintenance: "✓ Maintenance Included"
      }
    },
    
    terms: {
      text: "I confirm that all information provided is accurate and I agree to the",
      link: "Terms of Service",
      error: "You must agree to the terms"
    }
  },
  
  buttons: {
    back: "← Back",
    continue: "Continue →",
    submit: "Submit for Review ✓"
  },
  
  trustBadges: {
    freeToList: "Free to list",
    noHiddenFees: "No hidden fees",
    support247: "24/7 support in Ethiopia",
    securePayments: "Secure payments"
  },
  
  validationErrors: {
    brand: "Brand is required",
    model: "Model is required",
    year: "Year is required",
    invalidYear: "Please enter a valid year",
    title: "Equipment title is required",
    equipmentType: "Equipment type is required",
    attachment: "Attachment type is required",
    transmission: "Transmission is required",
    fuelType: "Fuel type is required",
    operatingWeight: "Operating weight is required",
    enginePower: "Engine power is required",
    images: "Please upload at least one photo of your equipment",
    pricePerDay: "Daily price is required",
    pricePerHour: "Hourly price is required",
    minPricePerDay: "Price must be at least ETB 1,000 per day",
    region: "Region is required",
    city: "City is required",
    contactPhone: "Contact phone is required"
  },
  
  equipmentTypes: {
    excavator: "Excavator",
    loader: "Loader",
    bulldozer: "Bulldozer",
    grader: "Motor Grader",
    crane: "Crane",
    waterTruck: "Water Truck",
    dumpTruck: "Dump Truck",
    roller: "Road Roller",
    backhoe: "Backhoe Loader",
    wheeledExcavator: "Wheeled Excavator",
    cargoTruck: "Cargo Truck"
  },
  
  ethiopianRegions: [
    "Addis Ababa", "Afar", "Amhara", "Benishangul-Gumuz", "Dire Dawa",
    "Gambela", "Harari", "Oromia", "Sidama", "Somali", "South West Ethiopia",
    "Southern Nations", "Tigray"
  ],
  
  ethiopianCities: [
    "Addis Ababa", "Adama", "Bahir Dar", "Dire Dawa", "Hawassa",
    "Mekelle", "Gondar", "Jimma", "Harar", "Dessie", "Debre Markos",
    "Arba Minch", "Jijiga", "Shashemene", "Nekemte", "Debre Birhan"
  ],
  
  attachments: {
    excavator: ["Shovel", "Hammer", "Thumb", "Auger", "Grapple"],
    loader: ["Bucket", "Fork", "Pallet Forks", "Snow Blade"],
    bulldozer: ["Straight Blade", "Angle Blade", "Universal Blade", "Ripper"],
    grader: ["Moldboard", "Scarifier", "Snow Wing"],
    crane: ["Hook", "Magnets", "Concrete Bucket", "Personnel Basket"],
    waterTruck: ["Automatic Sprinkler", "Manual Sprinkler", "Water Cannon"],
    dumpTruck: ["Tipper", "Roll-off", "Concrete Mixer"],
    roller: ["Drum", "Padfoot", "Vibratory Drum"],
    backhoe: ["Backhoe Bucket", "Loader Bucket", "Hydraulic Breaker"],
    wheeledExcavator: ["Shovel", "Hammer", "Grapple"],
    cargoTruck: ["Flatbed", "Box", "Refrigerated", "Curtain Side"]
  },
  
  featuresOptions: [
    "Air Conditioning", "GPS Tracking", "Backup Camera", "ROPS Certified",
    "LED Work Lights", "Bluetooth Radio", "Heated Seats", "Hydraulic Quick Coupler",
    "Auxiliary Hydraulics", "Long Reach Boom", "Rubber Tracks", "Steel Tracks",
    "Grade Control System", "Telematics", "Remote Control", "Emergency Stop"
  ]
};
