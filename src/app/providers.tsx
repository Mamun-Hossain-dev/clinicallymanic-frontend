'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { ReactNode, useState } from 'react'

export default function Providers({
  children,
  session,
}: {
  children: ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session?: any
}) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  )
}
