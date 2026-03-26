const getBestTime = (platform) => {
  const bestTimes = {
    telegram: [
      { hour: 9, minute: 0 },
      { hour: 13, minute: 0 },
      { hour: 18, minute: 30 }
    ],
    linkedin: [
      { hour: 8, minute: 30 },
      { hour: 12, minute: 30 },
      { hour: 17, minute: 0 }
    ]
  };

  const options = bestTimes[platform] || bestTimes.telegram;

  return options[Math.floor(Math.random() * options.length)];
};

module.exports = getBestTime;