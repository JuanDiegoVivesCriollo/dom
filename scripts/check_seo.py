"""Validate the actual upload directory after `npm run build`. No dependencies."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1] / 'out'
ORIGIN = 'https://domtranssportuk.co.uk'

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path, self.tags, self.texts, self.ids = path, [], {}, set()
        self.capture = None
        self.schema = []
        self.feed(path.read_text(encoding='utf-8'))

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        if tag in ('title', 'h1') or (tag == 'script' and attrs.get('type') == 'application/ld+json'):
            self.capture = [tag, '']

    def handle_data(self, data):
        if self.capture:
            self.capture[1] += data

    def handle_endtag(self, tag):
        if self.capture and self.capture[0] == tag:
            if tag == 'script':
                self.schema.append(json.loads(self.capture[1]))
            else:
                self.texts.setdefault(tag, []).append(self.capture[1].strip())
            self.capture = None

    def attr(self, tag, key, value, result):
        return [a.get(result) for t, a in self.tags if t == tag and a.get(key) == value]

def resolve(url):
    path = ROOT / unquote(urlsplit(url).path).lstrip('/')
    if path.is_dir():
        path /= 'index.html'
    return path

pages = {p.resolve(): Page(p) for p in ROOT.rglob('*.html') if p.name != 'google77527df9b596fb5a.html'}
titles, canonicals = set(), set()
for path, page in pages.items():
    assert len(page.texts.get('title', [])) == 1, f'{path}: title count'
    assert len(page.texts.get('h1', [])) == 1, f'{path}: H1 count'
    title = page.texts['title'][0]
    assert title and title not in titles, f'{path}: duplicate/empty title'
    titles.add(title)
    descriptions = page.attr('meta', 'name', 'description', 'content')
    assert len(descriptions) == 1 and descriptions[0], f'{path}: description'
    canonical = page.attr('link', 'rel', 'canonical', 'href')
    assert len(canonical) == 1 and canonical[0].startswith(ORIGIN), f'{path}: canonical'
    assert canonical[0].endswith('/') or path.name == '404.html', f'{path}: inconsistent trailing slash'
    assert len(page.schema) == 1, f'{path}: JSON-LD missing'
    graph = page.schema[0]['@graph']
    business = next(n for n in graph if n['@type'] == 'LocalBusiness')
    assert business['telephone'] == '+447424399563', f'{path}: stale telephone'
    assert business['address']['addressLocality'] == 'Birmingham'
    assert not any(t in json.dumps(graph) for t in ['447737994071', '447878692146'])
    noindex = 'noindex' in ' '.join(page.attr('meta', 'name', 'robots', 'content'))
    if path.name == '404.html':
        assert noindex, '404 must not be indexed'
    else:
        assert not noindex, f'{path}: accidentally noindexed'
        assert resolve(canonical[0]).resolve() == path, f'{path}: canonical destination'
        assert 'Birmingham' in page.texts['h1'][0], f'{path}: missing locality in H1'
        canonicals.add(canonical[0])
    for tag, attrs in page.tags:
        refs = ([attrs['href']] if tag in ('a', 'link') and attrs.get('href') else [])
        refs += ([attrs['src']] if tag in ('img', 'script') and attrs.get('src') else [])
        if tag == 'img':
            assert 'alt' in attrs, f'{path}: image without alt'
        for ref in refs:
            url = urlsplit(ref)
            if url.scheme and (url.scheme != 'https' or url.netloc != urlsplit(ORIGIN).netloc):
                continue
            if not ref.startswith('/') and not ref.startswith(ORIGIN):
                continue
            target = resolve(ref).resolve()
            assert target.exists(), f'{path}: broken local reference {ref}'
            if url.fragment and target in pages:
                assert unquote(url.fragment) in pages[target].ids, f'{path}: broken anchor {ref}'
    print(f'PASS {path.relative_to(ROOT.resolve())}: {title} | H1: {page.texts["h1"][0]}')

sitemap = ET.parse(ROOT / 'sitemap-0.xml')
locations = {el.text for el in sitemap.findall('.//{*}loc')}
assert locations == canonicals, f'Sitemap/canonical mismatch: {locations ^ canonicals}'
assert 'ErrorDocument 404 /404.html' in (ROOT / '.htaccess').read_text(encoding='utf-8')
assert 'Sitemap: https://domtranssportuk.co.uk/sitemap-index.xml' in (ROOT / 'robots.txt').read_text()
home = pages[(ROOT / 'index.html').resolve()]
# React 19 may additionally hoist the high-priority image preload from SSR.
assert '/img/transport-logistics-hero.webp' in home.attr('link', 'rel', 'preload', 'href')
assert (ROOT / 'img/social-preview.jpg').exists()
print(f'PASS: {len(canonicals)} indexable pages, 404, canonical sitemap, JSON-LD and internal references.')
