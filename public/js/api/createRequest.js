/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let { url, data, method, callback } = options; // забираем основные параметры из массива options

    if (!url || !method) {
        console.log('Ошибка в запросе (ссылка или метод).');
    }

    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json'; // тип ответа по умолчанию
    console.log(data)

    let requestUrl, formData;

    if (method == 'GET') {
        console.log(data)
        if (data) {
            for (const [key, value] of Object.entries(data)) {

                if (!requestUrl) {
                    requestUrl = `/?${key}=${value}`;
                } else {
                    requestUrl += `&${key}=${value}`;
                }

            }
        } else console.log(`Пустой запрос ${method}`)

    } else {
        formData = new FormData();

        if (data) {
            for (const [key, value] of Object.entries(data)) {
                formData.append(key, value);
            }
        } else console.log(`Пустой запрос ${method}`)

    }
    console.log(requestUrl)
    console.log(url + (requestUrl || ''))
    try {
        xhr.open(method, url + (requestUrl || ''));
        xhr.send(formData || null);
    } catch (e) {
        callback(e);
    }

}
createRequest({
    url: 'http://localhost:8000/', // адрес
    data: { // произвольные данные, могут отсутствовать
        email: 'ivan@poselok.ru',
        password: 'odinodin'
    },
    method: 'GET', // метод запроса
    /*
      Функция, которая сработает после запроса.
      Если в процессе запроса произойдёт ошибка, её объект
      должен быть в параметре err.
      Если в запросе есть данные, они должны быть переданы в response.
    */
    callback: (err, response) => {
        console.log('Ошибка, если есть', err);
        console.log('Данные, если нет ошибки', response);
    }
});