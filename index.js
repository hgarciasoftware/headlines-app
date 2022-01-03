document.querySelector('.js-refresh').addEventListener('click', () => {
  const country = document.querySelector('#country').value;
  const category = document.querySelector('#category').value;

  fetch(`https://newsapi-proxy.herokuapp.com?country=${country}&category=${category}`)
    .then(res => res.json())
    .then(data => {
      const articles = data.articles.slice();

      articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

      const app = document.querySelector('.js-results');
      let buf = '';

      for (const article of articles) {
        const author = !!article.author ? ` / ${article.author}` : '';
        const title = article.title.match(/(^.+) - (.+$)/)[1];
        const date = new Date(article.publishedAt).toLocaleString([], {dateStyle: 'short', timeStyle: 'short'});

        buf += `<a class="article" href="${article.url}" target="_blank">` +
          `<cite class="article-source">${article.source.name}${author}</cite>` +
          `<h2 class="article-title">${title}</h2>` +
          `<time datetime="${article.publishedAt}">${date}</time>` +
        '</a>';
      }

      app.innerHTML = buf;
    });
});

document.querySelector('.js-refresh').click();

const selectGroup = document.querySelector('.parameter-select-group');

let lastScrollTop = 0;
let scrollVector = 0;

window.addEventListener('scroll', () => {
  let delta = window.scrollY - lastScrollTop;

  if (delta > 0 && scrollVector > 0 || delta < 0 && scrollVector < 0) {
    scrollVector += delta;
  } else {
    scrollVector = delta;
  }

  if (scrollVector >= 80 && !selectGroup.classList.contains('hide')) {
    selectGroup.classList.add('hide');
    selectGroup.classList.remove('active');
  } else if (scrollVector <= -80 && !selectGroup.classList.contains('active')) {
    selectGroup.classList.remove('hide');
    selectGroup.classList.add('active');
  }

  lastScrollTop = document.documentElement.scrollTop;
});
