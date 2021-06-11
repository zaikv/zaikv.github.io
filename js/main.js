"use strict";

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

      document.querySelector('#subscribe').textContent = currentToken;

      /*var url = ''; // адрес скрипта на сервере который сохраняет ID устройства
      $.post(url, {
          token: currentToken
      });*/

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
