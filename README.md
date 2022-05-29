# 🤖 Slack OAuth Demo 🤖

This project aims to speed up the time to understand & implement multiple OAuth redirects using Slack's Bolt framework. 

<p align="center">

[![Slash Command Demo](https://user-images.githubusercontent.com/10428517/159196639-e5994923-2fcf-4493-a405-70b6a026bb3e.mp4)](https://user-images.githubusercontent.com/10428517/159196639-e5994923-2fcf-4493-a405-70b6a026bb3e.mp4)
</p>

# Steps 
1. [App Configuration](#step-1-app-configuration)
2. [Install the App](#step-2-install-the-app)
8. [Conclusion](#conclusion) 

## Step 1. App Configuration

#### Create a Slack App

> **This demo assumes you will be able to host your app either via [Ngrok](https://ngrok.com/) (recommended), [Glitch](https://glitch.com/), or another service.** You will need to do this set your OAuth redirect URLs as shown in the screenshot below.

With Ngrok, to start your app, first use the `ngrok http 3000` command to start ngrok. From there, copy and paste your 
forwarding address into your manifest file as shown in the screenshots below. Make sure to start the node app with `Node app.js` as well, so that all requests can be fowarded to Ngrok from your app.

1. Open [https://api.slack.com/apps/new](https://api.slack.com/apps/new) and choose "From an app manifest"
2. Choose the workspace you want to install the application to
3. Copy the contents of [manifest.json](./manifest.json) into the text box that says `*Paste your manifest code here*` (within the JSON tab) and click _Next_. Make sure to change the URLs on the `manifest.json` in three
specific places, as shown in the screenshot below.

![changeManifest](https://user-images.githubusercontent.com/10428517/155407272-44a2eaf9-e735-453f-a9c7-18c21004a037.png)

4. Review the configuration and click _Create_
5. Click _Install to Workspace_ and _Allow_ on the screen that follows. You'll then be redirected to the App Configuration dashboard.
6. Click on `Manage Distribution` and then make sure all boxes have 
green check marks. Select `Remove Hard Coded Information`, check the box
and then `Activate Public Distribution`.

![activeDistribution](https://user-images.githubusercontent.com/10428517/155411289-45f63a4f-72dc-40b1-a45e-9fae8d2df673.png)


#### Environment Variables

Before you can run the app, you'll need to store some environment variables.

1. Copy `.env.sample` to `.env`
2. Click _Basic Information_ from the left hand menu. There, in the `App Credentials` you should see your `SLACK_CLIENT_ID`, `SLACK_CLIENT_SECRET`, and `SLACK_SIGNING_SECRET`. Click on `Show` and copy and paste those values into your `.env` file.
3. This app uses (the free version of) MongoDB. You'll need to provide your MongoDB username, password, and database name in the `.env` file: `DB_USERNAME`, `DB_PASSWORD`, and `DB_NAME`. You can 
feel free to leave the DB_NAME as `slack_connect_test`.

Below, you can see a screenshot of my database configuration. The `DB_NAME` is `slack_connect_test` 
and the collection is named `users`. 

![Screen Shot 2022-02-22 at 11 05 10 AM](https://user-images.githubusercontent.com/10428517/155201340-b6b77e0d-e49b-41c9-a26f-f24c1eb419a2.png)

> Don't forget to save your `.env` and then run 
```source .env``` to set your env variables. 

#### Install Dependencies

`npm install`

#### Run Bolt Server

`npm start`

Great job! You're now ready to install the app using Slack's OAuth process. 

## Step 2. Install the App

Watch the video below **(sound on)** to understand how to install the app. Note that the video is showing the install path from a Ngrok URL. 
The base URL will always we different, based on if you are using Ngrok or Glitch, and depending on what your app is named on Glitch / what forwarding address is used in Ngrok.

[![Install App via OAuth](https://user-images.githubusercontent.com/10428517/154159350-3e5ab314-d9f9-4c38-8d8a-122751d1cc51.png)](https://user-images.githubusercontent.com/10428517/155203611-ffa7b69a-9b6d-40d1-a33e-9ba622c0dfcf.mov)


Next, navigate to your install endpoint. Since we are using Bolt, this endpoint is automatically created for us from the Bolt package. 
1. If you are using Glitch (and assuming your app is hosted at `https://bolt-template-slack-connect.glitch.me`), you can navigate to `https://bolt-template-slack-connect.glitch.me/slack/install`
If you are using Ngrok, it should look something like `https://3cb89939.ngrok.io/slack/install`
2. Click on the `Add to Slack` button.
3. Pick a workspace to install the app to from the top-right corner.
4. Click on the green `Allow` button.
5. You will be redirected to the Redirect URL. Click on "Open Slack". 
6. Once you click on "Open Slack" your browser, you will be taken to the messages tab of your new Slack Connect Admin app! 🎉

