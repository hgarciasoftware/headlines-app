function renderArticleData(articles) {
  const clonedArticles = articles.slice();

  clonedArticles.sort((a, b) => new Date(b. published_at) - new Date(a.published_at));

  const app = document.querySelector('.js-app');
  let articleData = '';

  for (const article of clonedArticles) {
    const authors = article.authors.map(author => author.name).join(', ');
    const title = (article.title + ' - ' + article.news_site).match(/(^.+) - (.+$)/)[1];
    const date = new Date(article.published_at).toLocaleString([], {dateStyle: 'short', timeStyle: 'short'});

    articleData += '<article>' +
      `<a class="article-data" href="${article.url}" target="_blank">` +
        `<cite class="article-source text-truncate">${article.news_site} / ${authors}</cite>` +
        `<h2 class="article-title text-truncate">${title}</h2>` +
        `<time datetime="${article.published_at}">${date}</time>` +
      '</a>' +
    '</article>';
  }

  app.innerHTML = articleData;
}
