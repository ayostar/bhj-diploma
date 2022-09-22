/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const { url, data, method, callback } = options;

  if (!url || !method) {
    console.log('Ошибка в запросе (ссылка или метод).');
  }

  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json'; // тип ответа по умолчанию

  let requestUrl, formData;
  console.log(options);
  console.log(xhr.response);

  if (method == 'GET') {
    if (data) {
      for (let [key, value] of Object.entries(data)) {
        if (key === 'id') key = 'account_id';

        if (!requestUrl) {
          requestUrl = `/?${key}=${value}`;
        } else {
          requestUrl += `&${key}=${value}`;
        }
      }
    }
  } else {
    formData = new FormData();

    if (data) {
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }
    }
  }

  console.log(requestUrl);
  try {
    xhr.open(method, url + (requestUrl || ''));
    xhr.send(formData || null);
  } catch (e) {
    callback(e);
  }

  xhr.onload = function () {
    if (xhr.status != 200) {
      callback(err, xhr.response);
    }

    callback(null, xhr.response);
  };

  xhr.onerror = function () {
    throw Error('Запрос не удался.');
  };
};
// createRequest({
//     url: 'http://localhost:8000/', // адрес
//     data: { // произвольные данные, могут отсутствовать
//         email: 'ivan@poselok.ru',
//         password: 'odinodin'
//     },
//     method: 'GET', // метод запроса
//     /*
//       Функция, которая сработает после запроса.
//       Если в процессе запроса произойдёт ошибка, её объект
//       должен быть в параметре err.
//       Если в запросе есть данные, они должны быть переданы в response.
//     */
//     callback: (err, response) => {
//         console.log('Ошибка, если есть', err);
//         console.log('Данные, если нет ошибки', response);
//     }
// });
