// lib/stripHtml.ts
export const stripHtml = (html: string): string => {
  if (!html) return ''

  // SSR-safe fallback
  if (typeof window === 'undefined') {
    return html.replace(/<[^>]*>?/gm, '')
  }

  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || div.innerText || ''
}
