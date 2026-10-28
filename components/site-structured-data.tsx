import { getSiteValues } from '@/lib/site-locales';
import { localizedPath, type Locale } from '@/lib/locale';

export default function SiteStructuredData({ locale }: { locale: Locale }) {
  const origin = 'https://pao-os.com';
  const organization = `${origin}/#organization`;
  const brand = `${origin}/#brand`;
  const application = `${origin}/#application`;
  const office = `${origin}/#local-business`;
  const officeMap = 'https://maps.app.goo.gl/q3hCtzTtqY1sJNev7';
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization', '@id': `${origin}/#ivn-network`,
        name: 'IVN Network',
        description: 'PAO OS belongs to IVN Network. Its managing company is IVN Media Joint Stock Company.',
        brand: { '@id': brand },
      },
      {
        '@type': 'Organization', '@id': organization,
        name: 'IVN Media Joint Stock Company',
        legalName: 'Công ty cổ phần công nghệ truyền thông IVN Media',
        url: 'https://ivnmedia.com/',
        email: 'cs@pao-os.com', telephone: '+84925880088',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'No 06 Viet Thang, Viet Hung',
          addressLocality: 'Quang Ninh City', addressCountry: 'VN',
        },
        brand: { '@id': brand },
        location: { '@id': office },
      },
      {
        '@type': 'Brand', '@id': brand, name: 'PAO OS', alternateName: 'PAO OS - Business Operating System',
        url: `${origin}/`, logo: `${origin}/brand/pao-primary.png`,
        sameAs: ['https://github.com/pao-os', 'https://x.com/PaoOsVN', 'https://www.facebook.com/Pao.OperatingSystems'],
      },
      {
        '@type': 'LocalBusiness', '@id': office,
        name: 'PAO OS - Business Operating System',
        url: `${origin}/`,
        parentOrganization: { '@id': organization },
        brand: { '@id': brand },
        email: 'cs@pao-os.com', telephone: '+84925880088',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '6 Việt Thắng, Giếng Đáy',
          addressLocality: 'Việt Hưng', addressRegion: 'Quảng Ninh',
          postalCode: '01123', addressCountry: 'VN',
        },
        geo: { '@type': 'GeoCoordinates', latitude: 20.9743794, longitude: 107.0042166 },
        hasMap: officeMap,
        sameAs: [officeMap],
        logo: `${origin}/brand/pao-primary.png`,
      },
      {
        '@type': 'WebSite', '@id': `${origin}/#website`,
        name: 'PAO OS', alternateName: 'PAO', url: `${origin}/`,
        inLanguage: ['vi', 'en', 'zh-CN'], publisher: { '@id': `${origin}/#ivn-network` },
        provider: { '@id': organization },
        about: { '@id': application },
      },
      {
        '@type': 'SoftwareApplication', '@id': application,
        name: 'PAO OS', alternateName: 'PAO OS - Business Operating System', url: `${origin}${localizedPath('/', locale)}`,
        description: getSiteValues(locale)['seo.description'],
        applicationCategory: 'BusinessApplication', operatingSystem: 'Web',
        publisher: { '@id': `${origin}/#ivn-network` }, provider: { '@id': organization },
        image: `${origin}/images/pao-social-ai-companion-20261026.png`,
      },
    ],
  };
  return <script id="pao-structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }} />;
}
