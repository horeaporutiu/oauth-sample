const model = require('./db');

const findUser = async (id) => {
  try {
    const user = await model.User.find({ _id: id });
    // return first user we find
    console.log(user);
    if (user[0] !== undefined) {
      return user[0];
    }
  } catch (error) {
    console.error(error);
  }
  return false;
};

module.exports = {
  findUser,
};