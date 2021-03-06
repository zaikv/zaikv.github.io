importScripts('https://www.gstatic.com/firebasejs/6.2.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.2.4/firebase-messaging.js');
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCHgjVqvamE-pcy6UnarsgVespfmdDczBQ",
  authDomain: "test-svarma.firebaseapp.com",
  projectId: "test-svarma",
  storageBucket: "test-svarma.appspot.com",
  messagingSenderId: "574418205961",
  appId: "1:574418205961:web:dc5f73478e51672c00a7d8",
  measurementId: "G-EPD0MQ4SX7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  var notificationTitle = 'Background Message Title';
  var notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
