const model = require('../db');

const saveUserOrgInstall = async (installation) => {
  try {
    const resp = await model.User.updateOne(
      { _id: installation.enterprise.id },
      {
        team: 'null',
        enterprise: {
          id: installation.enterprise.id,
          name: installation.enterprise.name,
        },
        user: {
          token: installation.user.token,
          scopes: installation.user.scopes,
          id: installation.user.id,
        },
        tokenType: installation.tokenType,
        isEnterpriseInstall: installation.isEnterpriseInstall,
        appId: installation.appId,
        authVersion: installation.authVersion,
        bot: 'null',
      },
      { upsert: true },
    );
    return resp;
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports = { saveUserOrgInstall };