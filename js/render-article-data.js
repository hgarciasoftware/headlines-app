function renderArticleData(articles) {
  const clonedArticles = articles.slice();

  clonedArticles.sort((a, b) => new Date(b. publishedAt) - new Date(a.publishedAt));

  const app = document.querySelector('.js-app');
  let articleData = '';

  for (const article of clonedArticles) {
    const author = !!article.author ? ` / ${article.author}` : '';
    const title = article.title.match(/(^.+) - (.+$)/)[1];
    const date = new Date(article.publishedAt).toLocaleString([], {dateStyle: 'short', timeStyle: 'short'});

    articleData += '<article>' +
      `<a class="article-data" href="${article.url}" target="_blank">` +
        `<cite class="article-source text-truncate">${article.source.name}${author}</cite>` +
        `<h2 class="article-title text-truncate">${title}</h2>` +
        `<time datetime="${article.publishedAt}">${date}</time>` +
      '</a>' +
    '</article>';
  }

  app.innerHTML = articleData;
}
