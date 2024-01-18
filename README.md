<h2>Keputech</h2><br />
App: e-Waku<br />
Members:<br />
- Naufal Zaky (Hustler)<br />
- M. Daffiin Fithriawan (Hustler)<br />
- Nizaar Roby Irawan (Hipster)<br />
- Revanantyo Dwigantara (Hacker)<br />
<br />

Introducing e-Waku, a revolutionary web app designed to support aspiring fish farmers. With a seamless login and registration system integrated with Google Firebase, e-Waku ensures accessibility from any device. But what sets e-Waku apart is its forecasting system, powered by machine learning using TensorFlow. Through advanced transfer learning, we've accelerated performance to provide better results.

Current feature(s):
- Authentication with Firebase
- Success Probability Forecast with Tensorflow

Upcoming feature(s):
- Subscription for more features for users

![register](https://github.com/xmall75/e-Waku/assets/34641833/03daa4ea-9e50-498f-8800-2474be5e61b0)

![login](https://github.com/xmall75/e-Waku/assets/34641833/aac92bc6-6073-42b2-b74b-4243034ee3aa)

![dashboard_nopredict](https://github.com/xmall75/e-Waku/assets/34641833/9f55d17a-e964-4c0c-b658-95430b26bada)

![prediction](https://github.com/xmall75/e-Waku/assets/34641833/052696c2-0f99-4af0-ae98-5ffedf2f3c49)

![dashboard_predicted](https://github.com/xmall75/e-Waku/assets/34641833/61c9f542-abb3-4f1e-8f75-40ada818a9ee)

# How to run:
1. Clone this repo.
2. This project is using Next, make sure you have npm installed on your device.
3. Execute this command to get the packages needed.
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
