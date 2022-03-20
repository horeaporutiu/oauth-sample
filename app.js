const { App, LogLevel } = require("@slack/bolt");
const { registerListeners } = require("./listeners");
const orgInstall = require("./database/auth/store_user_org_install");
const workspaceAuth = require("./database/auth/store_user_workspace_install");
const db = require("./database/db");

console.log(db)

const oauthRedirect = "https://c384-2601-646-4380-66e0-5d3-a834-b8bd-7fc4.ngrok.io/slack/oauth_redirect"

db.connect();
workspaceInstallHtml = `<a href='https://slack.com/oauth/v2/authorize?client_id=${process.env.SLACK_CLIENT_ID}&scope=${process.env.BOT_SCOPE}&redirect_uri=${oauthRedirect}' style='align-items:center;color:#fff;background-color:#4A154B;border:0;border-radius:4px;display:inline-flex;font-family:Lato,sans-serif;font-size:40px;font-weight:600;height:112px;justify-content:center;text-decoration:none;width:552px'><svg xmlns='http://www.w3.org/2000/svg' style='height:48px;width:48px;margin-right:12px' viewBox='0 0 122.8 122.8'><path d='M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z' fill='#e01e5a'></path><path d='M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z' fill='#36c5f0'></path><path d='M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z' fill='#2eb67d'></path><path d='M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z' fill='#ecb22e'></path></svg>Add to Slack</a>`
userScopesInstallHtml = `<a href='https://slack.com/oauth/v2/authorize?client_id=${process.env.SLACK_CLIENT_ID}&scope=&user_scope=${process.env.ADMIN_SCOPE}&redirect_uri=${oauthRedirect}' style='align-items:center;color:#fff;background-color:#4A154B;border:0;border-radius:4px;display:inline-flex;font-family:Lato,sans-serif;font-size:40px;font-weight:600;height:112px;justify-content:center;text-decoration:none;width:552px'><svg xmlns='http://www.w3.org/2000/svg' style='height:48px;width:48px;margin-right:12px' viewBox='0 0 122.8 122.8'><path d='M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z' fill='#e01e5a'></path><path d='M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z' fill='#36c5f0'></path><path d='M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z' fill='#2eb67d'></path><path d='M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z' fill='#ecb22e'></path></svg>Add to Slack</a>`

const customRoutes = [
  {
    path: '/slack/install/workspace',
    method: ['GET'],
    handler: (req, res) => {
      res.writeHead(200);
      res.end(workspaceInstallHtml);
    },
  },
  {
    path: '/slack/install/orgadmin',
    method: ['GET'],
    handler: (req, res) => {
      res.writeHead(200);
      res.end(userScopesInstall);
    },
  },
];

const app = new App({
  logLevel: LogLevel.DEBUG,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: "horea-is-a-human",
  customRoutes: customRoutes,
  installerOptions: {
    stateVerification: false,
  },
  installationStore: {
    storeInstallation: async (installation) => {
      console.log('installation: ')
      console.log(installation)
      if (
        installation.isEnterpriseInstall &&
        installation.enterprise !== undefined
      ) {
        return await orgInstall.saveUserOrgInstall(installation);
      }
      if (installation.team !== undefined) {
        return await workspaceAuth.saveUserWorkspaceInstall(installation);
      }
      throw new Error("Failed saving installation data to installationStore");
    },
    fetchInstallation: async (installQuery) => {
      console.log('installQuery')
      console.log(installQuery)
      if (
        installQuery.isEnterpriseInstall &&
        installQuery.enterpriseId !== undefined
      ) {
        return await db.findUser(installQuery.enterpriseId);
      }
      if (installQuery.teamId !== undefined) {
        return await db.findUser(installQuery.teamId);
      }
      throw new Error("Failed fetching installation");
    },
  },
});

/** Register Listeners */
registerListeners(app);

/** Start Bolt App */
(async () => {
  try {
    await app.start(process.env.PORT || 3000);
    console.log("⚡️ Bolt app is running! ⚡️");
  } catch (error) {
    console.error("Unable to start App", error);
  }
})();