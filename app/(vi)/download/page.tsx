import WebsitePageContent, { getWebsitePageMetadata } from '@/components/website-page';
import { websitePages } from '@/lib/website-pages';
const page = websitePages[5];
export const metadata = getWebsitePageMetadata(page, 'vi');
export default function Page() { return <WebsitePageContent page={page} locale="vi" />; }
