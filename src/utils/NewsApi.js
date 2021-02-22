import { URL, KEY_API } from './constants';

export default function searchNewsApi(keyword) {
  let date = new Date();

  const toDate = date.toISOString().slice(0, 10);

  date.setDate(date.getDate() - 7);
  const fromDate = date.toISOString().slice(0, 10);

  return fetch(
    `${URL}q=${keyword}&apiKey=${KEY_API}&from=${fromDate}&to=${toDate}&pageSize=100`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Произошла ошибка: ${res.status}`);
  });
}
