# =formuljar=

a simple web form with extra security


## Motivation
Often times businesses need a simple static web form to get user feedback and/or generate sales leads, so that users
fill out a web form with their contact data.
The business then needs to get some kind of notification (e.g. via Telegram) and store the information gathered from the user in a spreadsheet document (e.g. Google Spreadsheets).
The integration part with 3rd party services is pretty much straightforward. However, several **challenges** arise:

### :one: Your backend server may be overloaded :no_good: by a number of automated requests :bomb:

An attacker :male_detective: (e.g. your competitor) may get the form handler URL and issue a number of dummy ``POST`` requests, thus making your backend send a lot of notifications and populating your spreadsheet with fake data.
Here we can use **reCaptcha** to process only the requests produced by a human.

### :two: You may need to process requests asynchronously :ping_pong: and respond to the user immediately :running:
You don't want your user to wait!
Integration with 3rd party services such as Telegram, Spreadsheets, etc. may take some time, so you need to decouple the web request and business logic by using a message queue (e.g. AWS SQS).

### :three: Your solution should be cheap! :euro: :moneybag: :money_with_wings:

You could host your app on Heroku (free or $7). However, there is a better hosting solution and that is - AWS :ok_hand:

## Features
1. Google reCaptcha v3 (server-side verification)
2. Integration with Telegram (notifications)
3. Integration with Google Spreadsheets (audit)
4. Serverless framework with AWS: API GW, Lambda, S3, Cloudfront, SQS :heart:
