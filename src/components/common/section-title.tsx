'use client'

import Link from 'next/link'
import { Flame } from 'lucide-react'
import type React from 'react'

interface SectionTitleProps {
  children: React.ReactNode
  icon?: 'Flame'
  link?: string
  linkText?: string
}

export function SectionTitle({
  children,
  icon,
  link,
  linkText = 'View All',
}: SectionTitleProps) {
  const icons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
    Flame,
  }

  const Icon = icon && icon in icons ? icons[icon] : null

  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-6 w-6 text-destructive" />}
        <h2 className="text-2xl font-bold text-foreground">{children}</h2>
      </div>

      {link && (
        <Link
          href={link}
          className="text-sm font-medium text-primary hover:underline"
        >
          <button className="hidden rounded-lg bg-zinc-800 px-6 py-2 transition-colors hover:bg-zinc-700 sm:block">
            {linkText}
          </button>
        </Link>
      )}
    </div>
  )
}
