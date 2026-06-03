document.querySelector('.js-refresh-app').addEventListener('click', () => {
  // const country = document.querySelector('#country').value;
  const endpoint = document.querySelector('#endpoint').value;

  fetch(`https://api.spaceflightnewsapi.net/v4/${endpoint}/`)
    .then(res => res.json())
    .then(data => renderArticleData(data.results));
});

document.querySelector('.js-refresh-app').click();
