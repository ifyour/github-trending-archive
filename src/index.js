const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');
const { writeFileSync } = require('fs');
const { formatDate } = require('@dwing/common');

function saveFile(targetSrc, fileName, content) {
  const resolve = dir => path.join(__dirname, dir);
  return writeFileSync(resolve(targetSrc + fileName), content, 'utf-8');
}

function crawlData(data) {
  const $ = cheerio.load(data);
  const arr = [];
  $('.repo-list li').each((i, elm) => {
    const lang = $(elm).find('[itemprop="programmingLanguage"]');
    const item = {
      title: $(elm)
        .find('h3 a')
        .text()
        .replace(/\s/g, ''),
      url: `https://github.com${$(elm)
        .find('h3 a')
        .attr('href')}`,
      desc: $(elm)
        .find('.py-1 p')
        .text()
        .trim()
        .replace(/"/g, '')
    };
    if (lang.length !== 0) {
      item.lang = lang.text().replace(/\s/g, '');
    }
    arr.push(item);
  });
  return arr;
}

function formatData(data = [], type) {
  const date = formatDate('yyyy-MM-dd');
  if (type === 'json') {
    return JSON.stringify(data, null, 2);
  }
  if (type === 'markdown') {
    const md = [
      `# ${date}`,
      '',
      ...data.map(({
        title,
        url,
        lang,
        desc
      }, i) => `${i + 1}. [${title}](${url} "${desc}") ${lang === undefined ? '' : `[${lang}]`}`),
      ''
    ];
    return md.join('\n');
  }
  return null;
}

axios.get('https://github.com/trending').then(({ data }) => {
  const date = formatDate('yyyy-MM-dd');
  const arr = crawlData(data);
  saveFile('../data/', `${date}.json`, formatData(arr, 'json'));
  saveFile('../archives/', `${date}.md`, formatData(arr, 'markdown'));
});
