const sampleCommandCallback = async ({ ack, respond }) => {
  try {
    console.log('before hitting this callback')
    await ack();
    await respond('Great job, you are crushing it!! 🎊🎉🥳🎊🎉🥳🎊🎉🥳🎊🎉🥳');
    return
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sampleCommandCallback }; 
