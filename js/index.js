document.querySelector('.js-refresh-app').addEventListener('click', () => {
  // const country = document.querySelector('#country').value;
  const endpoint = document.querySelector('#endpoint').value;

  fetch(`https://api.spaceflightnewsapi.net/v4/${endpoint}/`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} fetching ${res.url}`);
      }

      return res.json();
    })
    .then(data => renderArticleData(data.results))
    .catch(e => {
      const app = document.querySelector('.js-app');
      const textContent = e instanceof TypeError
        ? `error in fetch: ${e}`
        : e.message;

      app.textContent = textContent;
      app.style.color = 'darkred';
    });
});

document.querySelector('.js-refresh-app').click();
