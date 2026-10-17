export async function setup(endpoint) {
  let spaceflightAPI = `https://api.spaceflightnewsapi.net/v4/${endpoint}/`;

  const button = document.querySelector('button');
  const headlines = document.querySelector('#headlines');

  function createAnchor(result) {
    const anchor = document.createElement('a');

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

    cite.classList.add('text-break');
    cite.textContent = result.news_site + ' / ' + author;

    return cite;
  }

  function createH2(result) {
    const h2 = document.createElement('h2');
    const title = (result.title + ' - ' + result.news_site).match(/(^.+) - (.+$)/)[1];

    h2.classList.add('text-break');
    h2.textContent = title.replaceAll('\u00A0', ' ');

    return h2;
  }

  function createTime(result) {
    const time = document.createElement('time');
    const date = new Date(result.published_at).toLocaleString([], {dateStyle: 'short', timeStyle: 'short'});

    time.classList.add('text-break');
    time.dateTime = result.published_at;
    time.textContent = date;

    return time;
  }

  async function appendResults() {
    const response = await fetch(spaceflightAPI);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} fetching ${response.url}`)
    }

    const data = await response.json();

    spaceflightAPI = data.next;

    for (const result of data.results) {
      const anchor = createAnchor(result);

      headlines.append(anchor);
    }
  }

  try {
    await appendResults();

    button.classList.remove('invisible');
    button.addEventListener('click', appendResults);
  } catch (e) {
    const textContent = e instanceof TypeError
      ? `error in fetch: ${e}`
      : e.message;

    headlines.textContent = textContent;
    headlines.style.color = 'darkred';
  }
}
