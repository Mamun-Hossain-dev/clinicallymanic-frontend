'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { StoreInitializer } from '@/components/layout/store-initializer'
import dynamic from 'next/dynamic'

// MUST be outside component
const ClinicallyManicFooter = dynamic(
  () => import('@/components/layout/footer'),
  { ssr: false },
)

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-[#0f0f0f]">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(prev => !prev)}
      />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header
          onMenuClick={() => setIsSidebarCollapsed(prev => !prev)}
          isCollapsed={isSidebarCollapsed}
        />
        <StoreInitializer />

        {/* Content */}
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="px-2 md:px-4 py-5">{children}</div>
          <ClinicallyManicFooter />
        </main>
      </div>
    </div>
  )
}
