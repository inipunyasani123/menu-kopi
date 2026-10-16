import { site } from '@/lib/data';

export default function sitemap() {
  return [{ url: `${site.url}/`, changeFrequency: 'weekly', priority: 1 }];
}
