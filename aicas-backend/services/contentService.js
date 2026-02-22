const generateSubtopic = (topic, day) => {
    return `Day ${day}: Advanced insights on ${topic}`;
};

const generateContent = (topic, subtopic) => {
    return `
    => ${subtopic}

In today's discussion under ${topic}, we explore key concepts, practical implications, and real-world relevance.

Stay tuned for more structured insights as we continue this journey.
`;
};

exports.generateDailyContent = (campaign) => {
    const day = campaign.currentDay;

    const subtopic = generateSubtopic(campaign.topic, day);
    const content = generateContent(campaign.topic, subtopic);

    return { day,subtopic, content};
};