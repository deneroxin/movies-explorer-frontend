// СИНТАКСИС ЗАПРОСА

// Запрос может состоять из нескольких подзапросов, разделёных /.
// В этом случае, если фильм соответствует хотя бы одному из подзапросов,
// он будет оставлен.
// Слова внутри запроса должны быть разделены пробелами.
// Тогда в источнике указанные слова должны все присутствовать,
// и идти в том же порядке, в котором они перечислены в подзапросе,
// но в источнике между ними могут находиться другие слова.
// Если мы хотим найти точную фразу, её необходимо заключить в кавычки.
// Тогда в источнике между указанными словами не могут стоять другие слова.
// Слова ищутся целиком, но если мы хотим указать часть слова,
// необходимо приписать дефис с левой, павой, или обеих сторон.
// Тогда в источнике с этих сторон могут находиться ещё буквы.
// Дефис можно вставить и в середину слова.

// Следующая процедура реализует описанный синтаксис,
// превращая запрос в регулярное выражение,
// об которое нужно тестировать заголовок, описание и др. поля фильма.
function transformRequest(request) {
  const bl = `(?<=^|[^\\wа-я])`;
  const br = `(?=[^\\wа-я]|$)`;
  const result = request.replace(/ё/gi, 'е')
    .replace(/[^a-zа-я0-9 "/-]/gi, '').split('/')
    .map((subrequest) => subrequest.trim()).filter(Boolean)
    .map((subrequest) => subrequest.split('"').map((group, i) =>
      group.trim().split(/\s+/).map((word) =>
        word.replace(/-/g, '[^\\s]*?')
      ).join((i & 1) ? '\\s+' : `${br}.+?${bl}`)
    ).filter(Boolean).join(`${br}.+?${bl}`)
  ).join(`${br}|${bl}`);
  return new RegExp(`${bl}${result}${br}`, 'i');
}

// Чтобы знаки препиная не мешали сопоставлять, уберём их из исходного текста,
// а также заменим все "ё" на "е", чтобы уравнять ё и е
function flatten(text) {
  return text.replace(/[,.!?:;"'()/—«»-]/g, ' ').replace(/ё/gi, 'е');
}


function sortMovies(movies) {
  return movies.sort((a, b) => {
    if (a.year < b.year) return 1;  // по убыванию года
    if (a.year > b.year) return -1;
    if (a.nameRU > b.nameRU) return 1;  // и по возрастанию названия
    if (a.nameRU < b.nameRU) return -1;
    return 0;
  });
}

// Искать будем не только в заголовке,
// но и в описании, имени режиссёра.
export function filterMovies(data, requestText, filterShort) {
  // Если запрос пустой, возвращаем ВСЕ фильмы.
  // Это нужно для страницы "saved-movies", так как
  // пользователь рано или поздно захочет увидеть все свои фильмы,
  // и если пустой запрос будет запрещён, то как он их получит?
  if (!requestText) return sortMovies(
    data.filter((film) => !(filterShort && film.duration > 40))
  );
  const regexp = transformRequest(requestText);
  return sortMovies(data.filter((film) =>
    (regexp.test(flatten(film.nameRU))
    || regexp.test(flatten(film.nameEN))
    || regexp.test(flatten(film.director))
    || regexp.test(flatten(film.description)))
    && !(filterShort && film.duration > 40)
  ));
}
