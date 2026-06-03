function renderArticleData(results) {
  const app = document.querySelector('.js-app');

  for (const result of results) {
    const article = document.createElement('article');
    const anchor = createAnchor(result);   

    article.append(anchor);
    app.append(article);
  }
}

function createAnchor(result) {
  const anchor = document.createElement('a');

  anchor.classList.add('article-data');
  anchor.target = '_blank';
  anchor.href = result.url;

  const cite = createCite(result);
  const h2 = createH2(result);
  const time = createTime(result);  

  anchor.append(cite, h2, time);

  return anchor;
}

function createCite(result) {
  const cite = document.createElement('cite');
  const author = result.authors.map(author => author.name).join(', ');

  cite.classList.add('article-source', 'text-truncate');
  cite.textContent = result.news_site + ' / ' + author;

  return cite;
}

function createH2(result) {
  const h2 = document.createElement('h2');
  const title = (result.title + ' - ' + result.news_site).match(/(^.+) - (.+$)/)[1];

  h2.classList.add('article-title', 'text-truncate');
  h2.textContent = title;

  return h2;
}

function createTime(result) {
  const time = document.createElement('time');
  const date = new Date(result.published_at).toLocaleString([], {dateStyle: 'short', timeStyle: 'short'});

  time.dateTime = result.published_at;
  time.textContent = date;

  return time;
}
