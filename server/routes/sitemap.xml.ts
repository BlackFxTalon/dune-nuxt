export default defineEventHandler(() => {
  const routes = [
    '/',
    '/news',
    '/articles',
    '/cards',
    '/leaders',
    '/houses',
    '/sets',
    '/faq',
    '/ratings'
  ]

  const urlset = routes
    .map((path) => `<url><loc>http://localhost:3000${path}</loc></url>`)
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlset}</urlset>`

  return new Response(xml, {
    headers: {
      'content-type': 'application/xml; charset=utf-8'
    }
  })
})
