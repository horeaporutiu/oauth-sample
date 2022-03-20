const sampleCommandCallback = async ({ ack, respond }) => {
  try {
    await ack();
    await respond('Great job, your command works! 🎊🎉🥳🎊🎉🥳🎊🎉🥳🎊🎉🥳');
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sampleCommandCallback }; 
