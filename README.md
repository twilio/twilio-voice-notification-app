<a  href="https://www.twilio.com">
<img  src="https://static0.twilio.com/marketing/bundles/marketing/img/logos/wordmark-red.svg"  alt="Twilio"  width="250"  />
</a>

# Voice Notifications powered by Twilio

[![twilio](https://circleci.com/gh/twilio/twilio-voice-notification-app.svg?style=shield&circle-token=e3810d25f5fcb423ef9ec6828490c2759956cb9b)](https://app.circleci.com/pipelines/github/twilio/twilio-voice-notification-app)

## About

This web-based reference app built in ReactJS and demonstrates how to leverage [Twilio Programmable Voice](https://www.twilio.com/voice) and [Twilio SDKs](https://www.twilio.com/docs/libraries) to create a voice notification system to make calls to your customers to deliver time-sensitive messages. This reference app can be used as a starting point, whether you are building a voice notification solution for Emergency Alerts, Appointment Reminders, or Sales & Marketing use cases.

Access to the source code should help you understand how to use the Twilio platform “building blocks” and Programmable Voice APIs to build an application for your own notification use case and accelerate your development.

### How it works

This fully functional reference app allows you to send voice notifications to hundreds of recipients. All you need to do is specify a notification name for reference, write down the message, and upload a list of the recipients’ phone numbers in a .txt file. That’s it!

Once you broadcast the voice notification, the application will start placing outbound calls to deliver your message and listen for call updates in real-time using Twilio Voice Webhooks. Changes in call status are received asynchronously in the form of status callbacks and results are stored in the database as soon as they occur. The application is polling data from the database every 5 seconds to display progress and call updates in the UI.

For a more detailed exploration of the technology involved, please refer to the [Technical Overview](https://github.com/twilio/twilio-voice-notification-app/wiki/Voice-Notifications-powered-by-Twilio:-Technical-Overview).

### Technology stack

- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Material UI](https://material-ui.com/)
- [NestJS](https://nestjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Features

- Send voice notifications to up to 500 recipients (configurable)
- Read message to recipients by using the text-to-speech capabilities
- Make a phone call to test the notification before sending to the complete list of recipients
- Automatically detect invalid and duplicated recipients phone numbers
- Track delivery progress of outbound calls in real-time
- Performance reports available for download in JSON format

<img src="https://user-images.githubusercontent.com/63280641/85837805-dc783980-b798-11ea-9cd1-f5915db9ca9b.png" width="600" />

Please note that using the application will incur in charges for [Programmable Voice minutes](https://www.twilio.com/voice/pricing).

## Setup

### Requirements

- [Node.js v10+](https://nodejs.org/en/download/)
- NPM v6+ (comes installed with newer Node versions)
- A PostgreSQL server (local or cloud)

### Twilio Account Settings

| Variable     | Description                                                                                                                                          |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| Account Sid  | Twilio Account Sid. This information can be found on your Account Dashboard in the [Twilio Console](https://www.twilio.com/console/project/settings) |
| Auth Token   | Twilio Auth Token. This information can be found on your Account Dashboard in the [Twilio Console](https://www.twilio.com/console/project/settings)  |
| Phone Number | A Twilio phone number. You can buy one on your Account Dashboard in the [Twilio Console](https://www.twilio.com/console/phone-numbers)               |

### Application Settings

| Variable | Description                                                                                   |
| :------- | :-------------------------------------------------------------------------------------------- |
| Passcode | Passcode to protect your Voice Notification App. This will be required to use the application |

### Local Development

#### 1. Clone the repository

`$ git clone git@github.com:twilio/twilio-voice-notification-app.git`

#### 2. Install Dependencies

`$ npm install`

This application uses Twilio credentials to create the [Call resources](https://www.twilio.com/docs/voice/api/call-resource). It also requires a PostgreSQL database for storing the notifications and related call data. Add the following parameters to your `.env` file (use `.env.example` as a reference):

```
PASSCODE=XXXXXX
DATABASE_URL=postgres://username:password@hostname:port/dbname
ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXX
AUTH_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXX
```

Please note that you may need to install [PostgreSQL](https://www.postgresql.org/download/) and start it up or leverage some DBaaS provider to create a free cloud database (such as https://www.elephantsql.com)

#### 3. Install Dependencies

`$ npm start`

The first time you run the app, it will create the database schemas, tables and relationships. In addition, this command will run the NodeJS server and will expose the ReactJS application via [ngrok](https://ngrok.com/). An ngrok server is required so that Twilio can locate your server and invoke the webhooks on every call status update.

Alternatively, you can start UI and Server separately for a more granular development experience:

`$ npm run start:ui`
`$ npm run start:server`

### Tests

Run unit tests locally with the following command
`$ npm test`

## Cloud deployment

Additionally to trying out this application locally, you can deploy it to a host service. Here you have some 1-click deploy alternatives.
| Service | |
|:------------|:------------------------------------------------------------|
| [Heroku](https://www.heroku.com) | <a href="https://heroku.com/deploy?template=https://github.com/twilio/twilio-voice-notification-app"><img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy"></a> |

Please notice that some free plans might have limitations. We encourage you to research about the hosting services and plans before using them.

## Development considerations

### Twilio

- Twilio imposes rate restrictions for outbound calls. The application will place calls using your Twilio account Calls Per Second rate (CPS). By default accounts currently have a 1 call per second rate. You can contact Sales or Support to increase your CPS rate.
- Twilio has API concurrency limits. If you send too many concurrent calls, Twilio might respond to your requests with [Error 429 - Too many requests](https://www.twilio.com/docs/api/errors/20429). Refer to this guide for [best practices for avoiding Error 429 responses](https://support.twilio.com/hc/en-us/articles/360044308153-Twilio-API-response-Error-429-Too-Many-Requests).
- Twilio protects your account from fraud and abuse with [Voice Dialing Geo Permissions](https://support.twilio.com/hc/en-us/articles/223180228-International-Voice-Dialing-Geographic-Permissions-Geo-Permissions-and-How-They-Work) to allow only legitimate calls. Voice Dialing Geographic Permissions control which countries and subsets of phone numbers you are able to dial out to from your Twilio project. Please note that the destinations you need to call should be enabled. You can manage call destinations from Twilio Console [Voice Geographic Permission](https://www.twilio.com/console/voice/calls/geo-permissions).

### Cloud

#### Heroku free account

- This reference app can be deployed to Heroku in minutes. Please note that the [Heroku free tier account](https://devcenter.heroku.com/articles/heroku-postgres-plans#hobby-tier) has limits and is not suited for processing and storing large volumes of data. Before using Heroku for production purposes, consider upgrading to one of their paid plans.
- Heroku provides a PostgreSQL database for free which has a limit of 10,000 database row insertions. After this limit is reached, the DB is made read-only. This means you won’t be able to send new notifications, but you will still be able to access the application and review your voice notification history. To continue sending more notifications under the same deployed application, you will need to upgrade the plan. Alternatively, if you have a PostgreSQL database server hosted somewhere and want to use it instead of the one provided by Heroku, you can edit the `DATABASE_URL` variable in Heroku application settings and set your own PostgreSQL database connection.

### Security

This reference app requires a passcode to control the access to the application. Please note that this represents very basic protection and you should replace it with an authentication mechanism of your choice (OAuth, JWT, etc).

### Other

- For local development the application uses an [ngrok server](https://ngrok.com/). Without it, Twilio cannot invoke the call-status-update webhook that runs from your local server. Ngrok [enforces a limit of 40 connections per minute](https://ngrok.com/pricing#:~:text=Per%20user%20limits%3A,-5%20reserved%20domains&text=2%20online%20ngrok%20processes,120%20connections%2Fminute) so be mindful about this limitation.

## Resources

- [Technical Overview](https://github.com/twilio/twilio-voice-notification-app/wiki/Voice-Notifications-powered-by-Twilio:-Technical-Overview)

## Open Contribution

This project is open source and welcomes contributions. All contributions are subject to our [Code of Conduct](https://github.com/twilio/twilio-voice-notification-app/blob/master/.github/CODE_OF_CONDUCT.md).

## License

[Apache 2.0](https://opensource.org/licenses/Apache-2.0)
