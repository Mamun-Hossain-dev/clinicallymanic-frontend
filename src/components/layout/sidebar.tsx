'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
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
  // Crown,
  Lock,
} from 'lucide-react'
import { FiCalendar, FiTag } from 'react-icons/fi'
import { useState } from 'react'
import { useUserStore } from '@/app/store/useUserProfileStore'
import { toast } from 'sonner'
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
    requiresExclusive: true,
  },
  {
    icon: FiCalendar,
    label: 'Events',
    href: '/events',
    requiresExclusive: true,
  },
  {
    icon: FiTag,
    label: 'Offers',
    href: '/offers',
    requiresExclusive: true,
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
  const router = useRouter()
  const { status } = useSession()

  const { user, isExclusivePlan, isBasicPlan, isSubscriptionExpired } =
    useUserStore()

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname === href || pathname.startsWith(href + '/')
  }

  const hasAccess = () => {
    if (!user) return false
    if (user.role === 'admin') return true
    if (isExclusivePlan()) return true
    if (isBasicPlan() && !isSubscriptionExpired()) return true
    return false
  }

  const handleExclusiveClick = (
    e: React.MouseEvent,
    href: string,
    requiresExclusive?: boolean,
  ) => {
    // If route doesn't require exclusive access, navigate normally
    if (!requiresExclusive) {
      return
    }

    e.preventDefault()

    // Check if user is signed in
    if (status !== 'authenticated' || !user) {
      toast.error('Please sign in to access exclusive content')
      setIsOpen(false)
      router.push('/signin')
      return
    }

    // Check if user has access (Admin, Exclusive, or Active Basic)
    if (!hasAccess()) {
      if (isBasicPlan() && isSubscriptionExpired()) {
        toast.error('Your Basic plan trial has expired. Please upgrade.')
      } else {
        toast.error('Please upgrade to access this content', {
          duration: 4000,
        })
      }
      setIsOpen(false)
      router.push('/plans')
      return
    }

    // User has access, navigate to the route
    setIsOpen(false)
    router.push(href)
  }

  const linkStyle = (isActive: boolean, isLocked?: boolean) =>
    cn(
      'flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all relative group',
      isActive
        ? 'bg-[#1f1f1f] text-white shadow-lg shadow-black/20'
        : isLocked
          ? 'text-zinc-500 cursor-pointer hover:bg-[#141414] hover:text-zinc-400'
          : 'text-zinc-400 hover:bg-[#141414] hover:text-white',
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
          'fixed left-0 top-0 z-50 flex h-screen flex-col bg-[#0b0b0b] border-r border-[#262626] transition-all duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0 md:sticky',
          isCollapsed ? 'w-[88px]' : 'w-[320px]',
        )}
      >
        {/* Logo */}
        <div className="flex-shrink-0">
          {!isCollapsed && (
            <Link href="/" onClick={() => setIsOpen(false)}>
              <div className="flex items-center gap-4 px-6 py-3 border-b border-[#262626]/50">
                <div className="relative h-14 w-14 overflow-hidden rounded-full bg-[#1a1a1a] flex-shrink-0 ring-2 ring-[#262626] ring-offset-2 ring-offset-[#0b0b0b]">
                  <Image
                    src="/logo.jpeg"
                    alt="Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold tracking-wider text-white whitespace-nowrap">
                    CLINICALLY MANIC
                  </span>
                  {/* <span className="text-[10px] uppercase tracking-[0.2em] text-[#666] font-medium">
                    Official Store
                  </span> */}
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
              <h3 className="mb-4 px-4 text-xs font-bold uppercase tracking-widest text-[#555]">
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
                      className={cn(
                        'h-6 w-6 flex-shrink-0',
                        isActive
                          ? 'text-white'
                          : 'text-zinc-500 group-hover:text-white',
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
              <h3 className="mb-4 px-4 text-xs font-bold uppercase tracking-widest text-[#555]">
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
                      className={cn(
                        'h-6 w-6 flex-shrink-0',
                        isActive
                          ? 'text-white'
                          : 'text-zinc-500 group-hover:text-white',
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
              <h3 className="mb-4 px-4 text-xs font-bold uppercase tracking-widest text-[#555] flex items-center justify-between">
                <span>Exclusive</span>
                {status === 'authenticated' && !hasAccess() && (
                  <Lock className="h-3 w-3 text-yellow-500/80" />
                )}
              </h3>
            )}
            <nav className="space-y-1.5">
              {exclusiveItems.map(item => {
                const Icon = item.icon
                const isActive = isActiveRoute(item.href)
                const isLocked = status === 'authenticated' && !hasAccess()

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={e =>
                      handleExclusiveClick(e, item.href, item.requiresExclusive)
                    }
                    className={linkStyle(isActive, isLocked)}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon
                      className={cn(
                        'h-6 w-6 flex-shrink-0',
                        isActive
                          ? 'text-white'
                          : isLocked
                            ? 'text-zinc-600'
                            : 'text-zinc-500 group-hover:text-white',
                      )}
                    />
                    {!isCollapsed && (
                      <span className="flex-1">{item.label}</span>
                    )}
                    {!isCollapsed && isLocked && (
                      <Lock className="h-4 w-4 text-yellow-500/70 flex-shrink-0" />
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* More */}
          <div>
            {!isCollapsed && (
              <h3 className="mb-4 px-4 text-xs font-bold uppercase tracking-widest text-[#555]">
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
                      className={cn(
                        'h-6 w-6 flex-shrink-0',
                        isActive
                          ? 'text-white'
                          : 'text-zinc-500 group-hover:text-white',
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
