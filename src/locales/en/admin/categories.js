export default {
  page: {
    title: "Equipment Categories",
    subtitle: "Manage all equipment categories and their pricing",
    addButton: "Add Category"
  },
  stats: {
    totalEquipment: "Total Equipment Units",
    activeBookings: "Active Bookings",
    totalRevenue: "Total Revenue"
  },
  categoryCard: {
    equipmentCount: "equipment items",
    dailyRate: "Daily Rate:",
    hourlyRate: "Hourly Rate:",
    securityDeposit: "Security Deposit:",
    more: "more",
    activeBookings: "active bookings"
  },
  modal: {
    add: {
      title: "Add New Category",
      name: "Category Name",
      namePlaceholder: "e.g., Excavators",
      icon: "Icon",
      description: "Description",
      descriptionPlaceholder: "Brief description",
      baseRate: "Base Daily Rate (ETB)",
      baseRatePlaceholder: "e.g., 7500",
      hourlyRate: "Hourly Rate (ETB)",
      hourlyRatePlaceholder: "e.g., 1100",
      deposit: "Security Deposit (ETB)",
      depositPlaceholder: "e.g., 15000",
      submit: "Add Category",
      cancel: "Cancel"
    },
    edit: {
      title: "Edit Category",
      submit: "Save Changes",
      cancel: "Cancel"
    }
  },
  toast: {
    addSuccess: "Category added successfully!",
    updateSuccess: "Category updated successfully!",
    deleteSuccess: "Category deleted successfully!",
    deleteError: "Cannot delete {name} - has {count} equipment items",
    nameRequired: "Please enter category name"
  }
};
