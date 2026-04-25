'use client'

import Link from 'next/link'
import type React from 'react'

interface SectionTitleProps {
  children: React.ReactNode
  icon?: 'Flame'
  link?: string
  linkText?: string
  eyebrow?: string
}

export function SectionTitle({
  children,
  link,
  linkText = 'View All',
  eyebrow = 'CURATED FOR YOU',
}: SectionTitleProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex flex-col">
        <span className="block text-[11px] font-medium uppercase tracking-[0.15em] text-[#6E6E73] mb-1">
          {eyebrow}
        </span>
        <h2 className="text-[22px] font-bold text-[#F5F5F7] tracking-[-0.02em]">{children}</h2>
      </div>

      {link && (
        <Link
          href={link}
          className="group flex items-center gap-1 text-[13px] text-[#6E6E73] hover:text-[#F5F5F7] transition-colors duration-200 ease-apple"
        >
          {linkText}
          <span className="transform transition-transform duration-200 ease-apple group-hover:translate-x-1">→</span>
        </Link>
      )}
    </div>
  )
}
