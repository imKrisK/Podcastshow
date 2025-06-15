import axios from 'axios';

export async function fetchAndParseRSS(feedUrl) {
  // Use a public CORS proxy for demo purposes
  const proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent(feedUrl);
  const response = await axios.get(proxyUrl);
  const xml = response.data.contents;
  const parser = new window.DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');
  const items = Array.from(doc.querySelectorAll('item'));
  return items.map(item => ({
    title: item.querySelector('title')?.textContent,
    audioUrl: item.querySelector('enclosure')?.getAttribute('url'),
    pubDate: item.querySelector('pubDate')?.textContent,
    description: item.querySelector('description')?.textContent,
    guid: item.querySelector('guid')?.textContent,
  })).filter(e => e.audioUrl);
}
