document.querySelector('.js-refresh-app').addEventListener('click', () => {
  const country = document.querySelector('#country').value;
  const category = document.querySelector('#category').value;

  fetch(`https://newsapi-proxy.herokuapp.com?country=${country}&category=${category}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} fetching ${res.url}`);
      }

      return res.json();
    })
    .then(data => renderArticleData(data.articles))
    .catch(e => {
      const app = document.querySelector('.js-app');
      const textContent = e instanceof TypeError
        ? `error in fetch: ${e}`
        : e.message;

      app.textContent = textContent;
      app.style.color = 'darkred';
    })
});

document.querySelector('.js-refresh-app').click();
