document.querySelector('.js-refresh-app').addEventListener('click', () => {
  const country = document.querySelector('#country').value;
  const category = document.querySelector('#category').value;

  fetch(`https://newsapi-proxy.herokuapp.com?country=${country}&category=${category}`)
    .then(res => res.json())
    .then(data => renderArticleData(data.articles));
});

document.querySelector('.js-refresh-app').click();
