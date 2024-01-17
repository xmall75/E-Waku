<h2>Keputech</h2><br />
App: e-Waku<br />
Members:<br />
- Naufal Zaky (Hustler)<br />
- M. Daffiin Fithriawan (Hustler)<br />
- Nizaar Roby Irawan (Hipster)<br />
- Revanantyo Dwigantara (Hacker)<br />
<br />

Current feature(s):
- Authentication with Firebase
- Success Rate Forecast with Tensorflow

Upcoming feature(s):
- Subscription for more features for users

# How to run:
1. Clone this repo.
2. This project is using Next, make sure you have npm installed on your device.
3. We do not include the node_modules on the repo, so you can execute this command to get the packages needed.
```
$ npm install
```
4. If there are some errors related to **unknown modules**, please install Firebase, Tensorflow.js, and bcrypt first.
```
$ npm install @tensorflow/tfjs
```
```
$ npm install firebase
```
```
$ npm install bcrypt
```
5. Make sure you have a Firebase project on your Firebase console.
6. Get a Firebase config and put it on a file named .env.local:
```
FIREBASE_API_KEY=YOUR_API_KEY
FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
FIREBASE_DATABASE_URL=YOUR_DATABASE_URL
FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
FIREBASE_SENDER_ID=YOUR_SENDER_ID
FIREBASE_APP_ID=YOUR_APP_ID
FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID

NEXT_PUBLIC_API_URL=YOUR_LOCAL_URL
NEXT_AUTH_SECRET=YOUR_TOKEN (basically this one is optional, you can leave it with 123 or anything)
```
7. Then you can run the project by executing `npm run dev`. If there is an error and you can't solve it, we have deployed our project into a web app that you can check at the end of this file.

<br />
Web deployment:<br />
https://e-waku.vercel.app/