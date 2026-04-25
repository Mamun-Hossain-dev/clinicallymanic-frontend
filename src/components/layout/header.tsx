'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { User, LogOut, Menu, ShoppingCart, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
// import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useGetUserProfile } from '@/lib/api/profileApi'
import { useShopStore } from '@/app/store/useShopStore'
import Link from 'next/link'

interface HeaderProps {
  onMenuClick?: () => void
  isCollapsed?: boolean
}

export function Header({ onMenuClick }: HeaderProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const accessToken = session?.user?.accessToken || ''
  const { data: profileData } = useGetUserProfile(accessToken, session?.user?.id)

  // Get cart and wishlist counts
  const { getCartCount, wishlist } = useShopStore()
  const cartCount = getCartCount()
  const wishlistCount = wishlist.length

  const isLoggedIn = status === 'authenticated'

  return (
    <header className={cn(
      "sticky top-0 z-40 px-4 py-[22px] transition-all duration-300 ease-apple",
      isScrolled ? "bg-[rgba(10,10,10,0.8)] backdrop-blur-[20px] border-b border-white/5" : "bg-transparent border-transparent"
    )}>
      <div className="flex items-center justify-between gap-4">
        {/* Left: Menu + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="hidden md:flex rounded-md p-2 hover:bg-[#1a1a1a] transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5 text-[#86868B] hover:text-[#F5F5F7] transition-colors duration-200" />
          </button>

          {/* Logo for mobile */}
          <Link href="/" className="flex md:hidden items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-[#1a1a1a]">
              <Image
                src="/logo.jpeg"
                alt="Logo"
                fill
                className="object-cover"
              />
            </div>
          </Link>
        </div>

        {/* Center: Search - Removed as per request */}
        <div className="flex-1 max-w-2xl mx-auto" />

        {/* Right: Cart, Wishlist, Profile/Login */}
        <div className="flex items-center gap-4">
          {/* Wishlist Icon */}
          <Link
            href="/favorites"
            className="relative inline-flex items-center justify-center rounded-md hover:bg-white/5 transition-colors h-10 w-10"
          >
            <Heart className="h-[22px] w-[22px] text-[#86868B] hover:text-[#F5F5F7] transition-colors duration-200" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[9px] font-bold text-white flex items-center justify-center">
                {wishlistCount > 9 ? '9+' : wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Icon */}
          <Link
            href="/carts"
            className="relative inline-flex items-center justify-center rounded-md hover:bg-white/5 transition-colors h-10 w-10"
          >
            <ShoppingCart className="h-[22px] w-[22px] text-[#86868B] hover:text-[#F5F5F7] transition-colors duration-200" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[9px] font-bold text-white flex items-center justify-center">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <>
              {/* Profile */}
              <Link href="/account">
                <div className="relative h-9 w-9 rounded-full overflow-hidden border border-[#303030] hover:border-white transition-colors cursor-pointer">
                  {profileData?.data?.profileImage ? (
                    <Image
                      src={profileData.data.profileImage}
                      alt={session.user.name || 'User'}
                      fill
                      className="object-cover"
                      sizes="36px"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-[#1a1a1a]">
                      <User className="h-5 w-5 text-[#aaa]" />
                    </div>
                  )}
                </div>
              </Link>

              {/* Logout Button - hidden on mobile */}
              <Button
                onClick={() => signOut()}
                variant="ghost"
                className="hidden sm:flex items-center gap-2 px-4 py-1.5 border border-white/20 rounded-full hover:bg-white/[0.08] hover:text-[#F5F5F7] text-[#F5F5F7] transition-all duration-200 ease-apple bg-transparent"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-[13px] font-medium">Logout</span>
              </Button>
            </>
          ) : (
            <Button
              onClick={() => router.push('/signin')}
              className="hidden sm:flex items-center gap-2 px-4 py-1.5 border border-white/20 rounded-full hover:bg-white/[0.08] hover:border-white/20 text-[#F5F5F7] text-[13px] transition-all duration-200 ease-apple bg-transparent"
            >
              Sign in
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
