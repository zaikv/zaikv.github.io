"use strict";

if ('Notification' in window) {
  if (Notification.permission === 'granted') {
        subscribe();
  }

  // по клику, запрашиваем у пользователя разрешение на уведомления и подписываем его
  document.querySelector('#subscribe').addEventListener('click', function () {
      subscribe();
  });
}

function subscribe() {
  // запрашиваем разрешение на получение уведомлений
  messaging.requestPermission()
      .then(function () {
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

      /*var url = ''; // адрес скрипта на сервере который сохраняет ID устройства
      $.post(url, {
          token: currentToken
      });*/

      setTokenSentToServer(currentToken);
  } else {
      console.log('Токен уже отправлен на сервер.');
  }

  document.querySelector('#subscribe').style.display = 'none';
  document.querySelector('#mytoken').textContent = currentToken;
  document.querySelector('#send').addEventListener('click', function () {
      sendNotification();
  });
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

function sendNotification() {
    var key = 'AAAAhb3-PQk:APA91bFa12YwpNtjJ4YMzumX5I8_I90s3lnq-2iOonFqMRrYvtiVRnvmj80LsvU6Ky2xj1hPFrd8kGO58Uq3FjxNoHyUYMgcewPGPtyhgyEMbC8NOq1Za6n9m0T_fZ-7cndnGLWZyumV';

    console.log('Send notification', notification);

    // hide last notification data
    info.hide();
    massage_row.hide();

    messaging.getToken()
        .then(function(currentToken) {
            fetch('https://fcm.googleapis.com/fcm/send', {
                method: 'POST',
                headers: {
                    'Authorization': 'key=' + key,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // Firebase loses 'image' from the notification.
                    // And you must see this: https://github.com/firebase/quickstart-js/issues/71
                    data: 'notification',
                    to: currentToken
                })
            }).then(function(response) {
                return response.json();
            }).then(function(json) {
                console.log('Response', json);

                if (json.success === 1) {
                    massage_row.show();
                    massage_id.text(json.results[0].message_id);
                } else {
                    massage_row.hide();
                    massage_id.text(json.results[0].error);
                }
            }).catch(function(error) {
                showError(error);
            });
        })
        .catch(function(error) {
            showError('Error retrieving Instance ID token', error);
        });
}

function showError(error, error_data) {
    if (typeof error_data !== "undefined") {
        console.error(error, error_data);
    } else {
        alert_message.html(error);
        console.error(error);
    }

    document.querySelector('#mytoken').textContent = error;
}
