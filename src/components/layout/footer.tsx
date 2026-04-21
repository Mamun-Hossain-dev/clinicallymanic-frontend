'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Twitter,
  Instagram,
  Youtube,
  MessageCircle,
} from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function ClinicallyManicFooter() {
  const [email, setEmail] = useState('')

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: { email: string }) => {
      const res = await fetch(`${API_URL}/newsletters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err?.message || 'Subscription failed')
      }

      return res.json()
    },
    onSuccess: res => {
      toast.success(res?.message || 'Subscribed successfully ')
      setEmail('')
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.message || 'Something went wrong')
    },
  })

  const handleSubscribe = () => {
    if (!email) {
      toast.warning('Please enter your email')
      return
    }

    mutate({ email })
  }

  return (
    <footer className="bg-black text-white">
      <div className="max-w-full px-4 lg:px-6 mx-auto py-12">
        {/* Logo and Social */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="text-3xl font-bold tracking-tight">
            CLINICALLY MANIC
          </div>

          <div className="flex items-center flex-col sm:flex-row gap-4 sm:gap-6">
            <span className="text-sm font-semibold tracking-wide">
              FOLLOW ON
            </span>
            <div className="flex gap-4 flex-wrap justify-center">
              <Link
                href="https://www.youtube.com/@clinicallymanictv"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors"
              >
                <Youtube size={20} />
              </Link>
              <Link
                href="https://www.twitch.tv/clinicallymanictv"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors"
              >
                <MessageCircle size={20} />
              </Link>
              <Link
                href="https://x.com/clinicalymanic"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="https://www.instagram.com/clinicallymanic/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors"
              >
                <Instagram size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 mb-12">
          {/* Explore */}
          <div>
            <h3 className="font-bold text-sm mb-4 tracking-wide">EXPLORE</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/playlists">Playlists</Link>
              </li>
              <li>
                <Link href="/news">News</Link>
              </li>
              <li>
                <Link href="/art">Art</Link>
              </li>
              <li>
                <Link href="/sports">Sports</Link>
              </li>
              <li>
                <Link href="/fashion">Fashion</Link>
              </li>
            </ul>
          </div>

          {/* Menu */}
          <div>
            <h3 className="font-bold text-sm mb-4 tracking-wide">MENU</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/exclusive-fashion">Shop</Link>
              </li>
              <li>
                <Link href="/categories">Categories</Link>
              </li>
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="font-bold text-sm mb-4 tracking-wide">MORE</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/exclusive-fashion">Exclusive Fashion</Link>
              </li>
              <li>
                <Link href="/favorites">Favorites</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/account">Account</Link>
              </li>
            </ul>
          </div>

          {/* Subscriptions */}
          <div>
            <h3 className="font-bold text-sm mb-4 tracking-wide">
              SUBSCRIPTIONS
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#">Free Plan</Link>
              </li>
              <li>
                <Link href="#">Exclusive</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mb-12">
          <h3 className="font-bold text-sm mb-4 tracking-wide">
            SIGN UP FOR THE NEWSLETTER
          </h3>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 w-full max-w-2xl">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="ENTER YOUR EMAIL"
              className="flex-1 bg-transparent border border-white px-4 py-3 text-sm focus:outline-none focus:border-gray-400 w-full"
            />
            <button
              onClick={handleSubscribe}
              disabled={isPending}
              className="bg-white text-black px-8 py-3 font-bold text-sm hover:bg-gray-200 transition-colors disabled:opacity-60 whitespace-nowrap w-full sm:w-auto"
            >
              {isPending ? 'SUBSCRIBING...' : 'GET NOTIFIED'}
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-3 max-w-2xl">
            BY ENTERING YOUR EMAIL, YOU AGREE TO RECEIVE CUSTOMIZED MARKETING
            MESSAGES. OUR{' '}
            <Link href="/privacy" className="underline">
              PRIVACY POLICY
            </Link>{' '}
            AND{' '}
            <Link href="/terms" className="underline">
              TERMS OF SERVICE
            </Link>{' '}
            APPLY.
          </p>
        </div>

        {/* Bottom Links */}
        <div className="flex flex-wrap gap-6 mb-8 text-xs text-gray-400">
          <Link href="/terms" className="hover:text-white transition-colors">TERMS & CONDITIONS</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">PRIVACY POLICY</Link>
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-500">
          © CLINICALLY MANIC, LLC — ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  )
}
