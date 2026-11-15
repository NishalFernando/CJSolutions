import { useEffect } from 'react'

const SUFFIX = 'CJ Solution – Computer & IT Services'

/** Sets document title and meta description (+ Open Graph) for the current page. */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${SUFFIX}` : `CJ SOLUTION – Computer & IT Services`
    const set = (selector: string, attr: string, value: string) => {
      document.head.querySelector(selector)?.setAttribute(attr, value)
    }
    set('meta[name="description"]', 'content', description)
    set('meta[property="og:title"]', 'content', document.title)
    set('meta[property="og:description"]', 'content', description)
  }, [title, description])
}
