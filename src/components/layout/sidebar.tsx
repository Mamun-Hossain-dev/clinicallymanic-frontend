'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Home,
  ListMusic,
  Menu,
  Newspaper,
  Palette,
  Trophy,
  Shirt,
  Mail,
  User,
  Flame,
  Heart,
  ShoppingCart,
} from 'lucide-react'
import { FiCalendar, FiTag } from 'react-icons/fi'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const menuItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: User, label: 'Account', href: '/account' },
  { icon: Heart, label: 'Favorites', href: '/favorites' },
  { icon: ShoppingCart, label: 'Carts', href: '/carts' },
  // { icon: Crown, label: 'Plans', href: '/plans' },
]

const exploreItems = [
  { icon: ListMusic, label: 'Playlists', href: '/playlists' },
  { icon: Newspaper, label: 'News', href: '/news' },
  { icon: Palette, label: 'Art', href: '/art' },
  { icon: Trophy, label: 'Sports', href: '/sports' },
  { icon: Shirt, label: 'Fashion', href: '/fashion' },
]

const exclusiveItems = [
  {
    icon: Flame,
    label: 'Exclusive Store',
    href: '/exclusive-store',
  },
  {
    icon: FiCalendar,
    label: 'Events',
    href: '/events',
  },
  {
    icon: FiTag,
    label: 'Offers',
    href: '/offers',
  },
]

const moreItems = [{ icon: Mail, label: 'Contact Us', href: '/contact-us' }]

interface SidebarProps {
  isCollapsed?: boolean
  onToggle?: () => void
}

export function Sidebar({ isCollapsed = false }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname === href || pathname.startsWith(href + '/')
  }

  const linkStyle = (isActive: boolean) =>
    cn(
      'flex items-center rounded-lg px-3 py-2 text-[14px] font-normal transition-all duration-200 ease-apple relative group',
      isActive
        ? 'bg-white/10 text-[#F5F5F7] border-l-2 border-accent rounded-l-none'
        : 'text-[#A1A1A6] hover:bg-white/5 hover:text-[#F5F5F7]',
      isCollapsed ? 'justify-center px-2' : 'gap-3',
    )

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-4 z-[60] rounded-lg bg-[#0f0f0f] p-3 border border-[#262626] md:hidden shadow-xl"
        aria-label="Toggle menu"
      >
        <Menu className="h-6 w-6 text-white" />
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 flex h-screen flex-col bg-[#111111] border-r border-white/5 transition-all duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0 md:sticky',
          isCollapsed ? 'w-[88px]' : 'w-[220px]',
        )}
      >
        {/* Logo */}
        <div className="flex-shrink-0">
          {!isCollapsed && (
            <Link href="/" onClick={() => setIsOpen(false)}>
              <div className="flex items-center gap-3 px-5 pt-7 pb-4 border-b border-white/5">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-[#1a1a1a] flex-shrink-0 ring-1 ring-[#262626] ring-offset-1 ring-offset-[#0b0b0b]">
                  <Image
                    src="/logo.jpeg"
                    alt="Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-[13px] font-bold tracking-[-0.02em] text-[#F5F5F7] whitespace-nowrap truncate">
                    CLINICALLY MANIC
                  </span>
                </div>
              </div>
            </Link>
          )}

          {isCollapsed && (
            <div className="flex items-center justify-center py-6 border-b border-[#262626]/50">
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-[#1a1a1a] ring-1 ring-[#262626]">
                <Image
                  src="/logo.jpeg"
                  alt="Logo"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8 custom-scrollbar">
          {/* Menu */}
          <div>
            {!isCollapsed && (
              <h3 className="mb-4 px-4 text-[10px] font-medium uppercase tracking-[0.12em] text-[#444] mt-6">
                Menu
              </h3>
            )}
            <nav className="space-y-1.5">
              {menuItems.map(item => {
                const Icon = item.icon
                const isActive = isActiveRoute(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={linkStyle(isActive)}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon
                      strokeWidth={1.5}
                      className={cn(
                        'h-4 w-4 flex-shrink-0 transition-colors duration-200 ease-apple',
                        isActive
                          ? 'text-[#F5F5F7]'
                          : 'text-[#A1A1A6] group-hover:text-[#F5F5F7]',
                      )}
                    />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Explore */}
          <div>
            {!isCollapsed && (
              <h3 className="mb-4 px-4 text-[10px] font-medium uppercase tracking-[0.12em] text-[#444] mt-6">
                Explore
              </h3>
            )}
            <nav className="space-y-1.5">
              {exploreItems.map(item => {
                const Icon = item.icon
                const isActive = isActiveRoute(item.href)

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={linkStyle(isActive)}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon
                      strokeWidth={1.5}
                      className={cn(
                        'h-4 w-4 flex-shrink-0 transition-colors duration-200 ease-apple',
                        isActive
                          ? 'text-[#F5F5F7]'
                          : 'text-[#A1A1A6] group-hover:text-[#F5F5F7]',
                      )}
                    />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Exclusive Items */}
          <div>
            {!isCollapsed && (
              <h3 className="mb-4 px-4 text-[10px] font-medium uppercase tracking-[0.12em] text-[#444] mt-6">
                Exclusive
              </h3>
            )}
            <nav className="space-y-1.5">
              {exclusiveItems.map(item => {
                const Icon = item.icon
                const isActive = isActiveRoute(item.href)

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={linkStyle(isActive)}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon
                      strokeWidth={1.5}
                      className={cn(
                        'h-4 w-4 flex-shrink-0 transition-colors duration-200 ease-apple',
                        isActive
                          ? 'text-[#F5F5F7]'
                          : 'text-[#A1A1A6] group-hover:text-[#F5F5F7]',
                      )}
                    />
                    {!isCollapsed && (
                      <span className="flex-1">{item.label}</span>
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* More */}
          <div>
            {!isCollapsed && (
              <h3 className="mb-4 px-4 text-[10px] font-medium uppercase tracking-[0.12em] text-[#444] mt-6">
                More
              </h3>
            )}
            <nav className="space-y-1.5">
              {moreItems.map(item => {
                const Icon = item.icon
                const isActive = isActiveRoute(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={linkStyle(isActive)}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon
                      strokeWidth={1.5}
                      className={cn(
                        'h-4 w-4 flex-shrink-0 transition-colors duration-200 ease-apple',
                        isActive
                          ? 'text-[#F5F5F7]'
                          : 'text-[#A1A1A6] group-hover:text-[#F5F5F7]',
                      )}
                    />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
