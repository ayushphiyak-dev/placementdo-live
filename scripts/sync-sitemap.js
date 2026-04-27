import fs from 'fs';
import path from 'path';

// This is a simple script to sync sitemap.xml with the routes and blog posts
const BASE_URL = 'https://placementdo.app';

const STANDALONE_ROUTES = [
  '/',
  '/signin',
  '/signup',
  '/features',
  '/pricing',
  '/personas',
  '/how-it-works',
  '/about',
  '/blog',
  '/careers',
  '/privacy-policy',
  '/terms-of-service',
  '/placement-preparation',
  '/aptitude-questions',
  '/coding-interview-questions',
  '/company-wise-questions/tcs',
  '/company-wise-questions/wipro',
  '/seo-resources',
  '/demo'
];

// Slugs from api/blog.js DEFAULT_POSTS
const BLOG_SLUGS = [
  "getting-started-with-placementdo",
  "top-5-behavioural-interview-mistakes",
  "campus-placement-preparation-guide",
  "how-to-write-a-resume-for-freshers",
  "top-hr-interview-questions-and-answers",
  "mock-interview-preparation-tips",
  "aptitude-test-preparation-guide",
  "tcs-nqt-interview-preparation",
  "infosys-interview-preparation",
  "data-structures-interview-questions",
  "career-guidance-for-engineering-graduates",
  "technical-interview-tips-for-software-engineers",
  "wipro-elite-nthrive-interview-guide"
];

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

// Add static routes
STANDALONE_ROUTES.forEach(route => {
  const url = route === '/' ? BASE_URL : `${BASE_URL}${route}`;
  xml += '  <url>\n';
  xml += `    <loc>${url}</loc>\n`;
  xml += '    <changefreq>weekly</changefreq>\n';
  xml += `    <priority>${route === '/' ? '1.0' : '0.8'}</priority>\n`;
  xml += '  </url>\n';
});

// Add blog posts
BLOG_SLUGS.forEach(slug => {
  xml += '  <url>\n';
  xml += `    <loc>${BASE_URL}/blog/${slug}</loc>\n`;
  xml += '    <changefreq>monthly</changefreq>\n';
  xml += '    <priority>0.6</priority>\n';
  xml += '  </url>\n';
});

xml += '</urlset>';

fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), xml);
console.log('Sitemap updated with ' + (STANDALONE_ROUTES.length + BLOG_SLUGS.length) + ' URLs.');
