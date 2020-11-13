# =formuljar=

a simple web form with extra security


## Motivation
Often times businesses need a simple static web form to get user feedback and/or generate sales leads, so that users
fill out a web form with their contact data.
The business then needs to get a notification (e.g. via Telegram) and store user info in a document (e.g. Google Spreadsheets).

The integration part with 3rd party services is pretty much straightforward. However, several **challenges** may arise:

### :one: Your backend server may be overloaded :no_good: by a number of automated requests :bomb:

An attacker :male_detective: (e.g. your competitor) may get the form handler URL and issue a number of dummy ``POST`` requests, thus making your backend send a lot of notifications and polluting your spreadsheet with fake data.
Here we can use **reCaptcha** to process only the requests produced by a human.

### :two: You may need to process requests asynchronously :ping_pong: and respond immediately! :running:
You don't want your users to wait!
Integration with 3rd party services such as Telegram, Spreadsheets, etc. may take some time, so you need to decouple the web request and business logic by using a message queue (e.g. AWS SQS).

### :three: Your solution should be cheap! :euro: :moneybag: :money_with_wings:
You could host your app on Heroku. There are 2 options here: a free plan (limited availability, no custom domain, no TLS) or a Hobby plan ($7 per dyno per month). However, there is a better hosting solution which is almost free, and that is - AWS :ok_hand:

### :four: Your solution should scale well :satellite:
Hosting on Heroku for $7/month is a good option, but it doesn't scale well. Better use Serverless on AWS with almost infinite scaling capabilities.

## Features
* Google reCaptcha v3 (server-side verification) :boxing_glove:
* Integration with Telegram (notifications) :bookmark:
* Integration with Google Spreadsheets (audit) :floppy_disk:
* Serverless framework on AWS: API GW, Lambda, S3, Cloudfront, SQS :heart:
