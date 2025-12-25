'use client'

import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

const levelIndentClass: Record<number, string> = {
  2: 'ml-0',
  3: 'ml-4',
  4: 'ml-8',
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  const baseLinkClass =
    'transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
  const activeLinkClass = 'text-gray-900 dark:text-gray-100 font-semibold'

  useEffect(() => {
    const articleElement = document.querySelector('article')
    if (!articleElement) return

    const headingElements = Array.from(
      articleElement.querySelectorAll('h2, h3, h4')
    )

    const extractedHeadings: Heading[] = headingElements.map((el, index) => {
      const text = el.textContent || ''
      const level = parseInt(el.tagName[1])
      const id = el.id || `heading-${index}`

      // Set ID if it doesn't exist so links work
      if (!el.id) {
        el.id = id
      }

      return { id, text, level }
    })

    setHeadings(extractedHeadings)
  }, [])

  // Track which heading is in view
  useEffect(() => {
    if (!headings.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible[0]) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0, 1.0],
      }
    )

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => Boolean(el))

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [headings])

  return (
    <nav className="hidden md:block sticky top-24 self-start w-56 text-sm max-h-[calc(100vh-6rem)] overflow-auto">
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={levelIndentClass[heading.level] || 'ml-0'}
          >
            <a
              href={`#${heading.id}`}
              className={`${baseLinkClass} ${
                activeId === heading.id ? activeLinkClass : ''
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
