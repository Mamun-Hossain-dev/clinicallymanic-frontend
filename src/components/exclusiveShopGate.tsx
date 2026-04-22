'use client'

import { ReactNode } from 'react'

interface ExclusiveShopGateProps {
  children: ReactNode
}

export default function ExclusiveShopGate({
  children,
}: ExclusiveShopGateProps) {
  return <>{children}</>
}
