# github-trending-archive

[![Build Status](https://travis-ci.org/ifyour/github-trending-archive.svg?branch=master)](https://travis-ci.org/ifyour/github-trending-archive)
![Size](https://github-size-badge.herokuapp.com/ifyour/github-trending-archive.svg)
![Node](https://img.shields.io/badge/node-%3E=8.11-blue.svg)

> Tracking the most popular GitHub repos, updated daily.

## Preview

👉 [archives](./archives)

## API

```js
const baseUrl = 'https://ifyour.github.io/github-trending-archive';

// GET json
fetch(`${baseUrl}/data/2018-07-01.json`)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log('data', data);
  })
  .catch(function(error) {
    console.log('Fetch Error: ', error);
  });
```

You will get response json:

```json
[
  {
    "title": "kay-is/react-from-zero",
    "url": "https://github.com/kay-is/react-from-zero",
    "lang": "HTML"
  }
]
```

## License

MIT
