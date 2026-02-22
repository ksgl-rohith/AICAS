const getDefaultSchedule = (platforms) => {

  if (!platforms || !Array.isArray(platforms)) {
    return {};
  }

  if (platforms.includes("linkedin")) {
    return {
      monday: { hour: 10, minute: 0 },
      tuesday: { hour: 12, minute: 0 },
      wednesday: { hour: 10, minute: 0 },
      thursday: { hour: 12, minute: 0 },
      friday: { hour: 9, minute: 0 },
      saturday: { hour: 11, minute: 0},
      sunday: { hour: 12, minute: 0}
    };
  }

  if (platforms.includes("instagram")) {
    return {
      monday: { hour: 18, minute: 0 },
      wednesday: { hour: 19, minute: 0 },
      friday: { hour: 20, minute: 0 },
      saturday: { hour: 11, minute: 0 },
      sunday: { hour: 11, minute: 0 }
    };
  }

  return {};
};

module.exports = getDefaultSchedule;

