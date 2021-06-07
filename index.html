<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Test push</title>
    <script src="https://www.gstatic.com/firebasejs/6.2.4/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/6.2.4/firebase-messaging.js"></script>

    <script>
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
        const messaging = firebase.messaging();
    </script>
  </head>
  <body>
    <button type="button" name="button" id="subscribe">Подписаться</button>

    <script>
        if ('Notification' in window) {
          // по клику, запрашиваем у пользователя разрешение на уведомления и подписываем его
          document.querySelector('#subscribe').addEventListener('click', function () {
              subscribe();
          });
      }

      function subscribe() {
          // запрашиваем разрешение на получение уведомлений
          messaging.requestPermission()
              .then(function () {
                console.log('svarma sucks!');
                  // получаем ID устройства
                  messaging.getToken()
                      .then(function (currentToken) {
                          console.log(currentToken);

                          if (currentToken) {
                              sendTokenToServer(currentToken);
                          } else {
                              console.warn('Не удалось получить токен.');
                              setTokenSentToServer(false);
                          }
                      })
                      .catch(function (err) {
                          console.warn('При получении токена произошла ошибка.', err);
                          setTokenSentToServer(false);
                      });
          })
          .catch(function (err) {
              console.warn('Не удалось получить разрешение на показ уведомлений.', err);
          });
      }

      // отправка ID на сервер
      function sendTokenToServer(currentToken) {
          if (!isTokenSentToServer(currentToken)) {
              console.log('Отправка токена на сервер...');

              var url = ''; // адрес скрипта на сервере который сохраняет ID устройства
              $.post(url, {
                  token: currentToken
              });

              setTokenSentToServer(currentToken);
          } else {
              console.log('Токен уже отправлен на сервер.');
          }
      }

      // используем localStorage для отметки того,
      // что пользователь уже подписался на уведомления
      function isTokenSentToServer(currentToken) {
          return window.localStorage.getItem('sentFirebaseMessagingToken') == currentToken;
      }

      function setTokenSentToServer(currentToken) {
          window.localStorage.setItem(
              'sentFirebaseMessagingToken',
              currentToken ? currentToken : ''
          );
      }
    </script>
  </body>
</html>
