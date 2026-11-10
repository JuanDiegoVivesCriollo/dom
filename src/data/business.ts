export const business = {
  name: 'DOM Transsport UK Ltd',
  url: 'https://domtranssportuk.co.uk',
  phone: '+447424399563',
  email: 'domtranssportuk@gmail.com',
  facebook: 'https://www.facebook.com/profile.php?id=61587553721435',
};

export const serviceAreas = [
  { '@type': 'City', name: 'Birmingham' },
  { '@type': 'AdministrativeArea', name: 'West Midlands' },
  { '@type': 'Country', name: 'United Kingdom' },
];

// Only the locality is confirmed by the site's contact details.
// Do not invent street addresses, map coordinates, opening hours or ratings.
export const businessSchema = {
  '@type': 'LocalBusiness',
  '@id': `${business.url}/#business`,
  name: business.name,
  url: `${business.url}/`,
  logo: `${business.url}/img/logodom.webp`,
  image: `${business.url}/img/transport-logistics-hero.webp`,
  telephone: business.phone,
  email: business.email,
  description: 'Birmingham-based courier, transport, removals and cleaning services serving the West Midlands, with UK-wide transport coverage.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Birmingham',
    addressRegion: 'West Midlands',
    addressCountry: 'GB',
  },
  areaServed: serviceAreas,
  sameAs: [business.facebook],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Courier, Removals & Cleaning Services',
    itemListElement: [
      ['Same-Day Courier', '/transport-services/#transport'],
      ['Medical & Laboratory Logistics', '/transport-services/#medical'],
      ['Multi-Drop Courier', '/transport-services/#courier'],
      ['Home & Office Removals', '/transport-services/#removals'],
      ['End of Tenancy & Property Cleaning', '/cleaning-services/#cleaning'],
      ['Waste Clearance', '/cleaning-services/#waste'],
    ].map(([name, path]) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name, url: `${business.url}${path}`, provider: { '@id': `${business.url}/#business` } },
    })),
  },
};
