'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const router = useRouter()

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // 🔐 Prevent hydration mismatch
  if (!mounted) return null

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white px-4 text-slate-900">
      {/* 🔵 Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />

        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-slate-200 opacity-70"
            style={{
              width: `${(i + 1) * 100}px`,
              height: `${(i + 1) * 100}px`,
              left: `calc(50% - ${(i + 1) * 50}px)`,
              top: `calc(50% - ${(i + 1) * 50}px)`,
              animation: `pulse ${10 + i * 2}s infinite ease-in-out alternate`,
              transform: `
                translate(
                  ${mousePosition.x * (i + 1) * 10}px,
                  ${mousePosition.y * (i + 1) * 10}px
                )
              `,
              transition: 'transform 0.3s ease-out',
            }}
          />
        ))}
      </div>

      {/* 🌟 Content */}
      <div className="z-10 flex flex-col items-center text-center">
        {/* 404 */}
        <h1
          className="mb-6 text-[8rem] sm:text-[10rem] md:text-[14rem] font-black leading-none tracking-tighter"
          style={{
            transform: `
              translate(
                ${mousePosition.x * 20}px,
                ${mousePosition.y * 20}px
              )
            `,
            transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        >
          404
        </h1>

        <h2 className="mb-4 text-2xl font-bold sm:text-3xl">Page not found</h2>

        <p className="mb-8 max-w-md text-slate-600">
          The page you&#39;re looking for doesn&#39;t exist or has been moved.
        </p>

        {/* 🧭 Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          {/* 🏠 Back to Home */}
          <Button
            asChild
            className="group relative overflow-hidden bg-slate-900 px-6 py-2 text-white hover:bg-slate-800"
          >
            <Link
              href="/"
              className="relative inline-flex items-center justify-center"
            >
              <span className="relative z-10">Back to home</span>
              <span className="absolute bottom-0 left-0 h-0 w-full bg-slate-700 transition-all duration-300 group-hover:h-full" />
            </Link>
          </Button>

          {/* 🔙 Go Back */}
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2 border-slate-300 text-slate-700 hover:border-slate-400 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go back</span>
          </Button>
        </div>
      </div>

      {/* 🎬 Animations */}
      <style jsx global>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  )
}
