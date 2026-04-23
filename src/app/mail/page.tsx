'use client'

import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Eye, EyeOff, Trash2, Mail, Search, Copy, CheckCheck } from 'lucide-react'

const CORRECT_PASSWORD = 'admin321'

interface NewsletterEmail {
  _id: string
  email: string
  __v: number
}

interface ApiResponse {
  success: boolean
  data: NewsletterEmail[]
}

export default function MailPage() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    'https://clinicallymanic.vercel.app/api/v1'

  const {
    data: emails = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['newsletter-emails'],
    queryFn: async () => {
      const response = await fetch(`${backendUrl}/newsletter`)
      const result: ApiResponse = await response.json()

      if (!result.success) {
        throw new Error('Failed to fetch emails')
      }

      return result.data
    },
    enabled: isAuthenticated,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${backendUrl}/newsletter/${id}`, {
        method: 'DELETE',
      })
      const result = await response.json()

      if (!result.success) {
        throw new Error('Failed to delete email')
      }

      return id
    },
    onSuccess: deletedId => {
      queryClient.setQueryData<NewsletterEmail[]>(
        ['newsletter-emails'],
        current => current?.filter(email => email._id !== deletedId) || [],
      )
    },
    onError: err => {
      setError(err instanceof Error ? err.message : 'Error deleting email')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true)
      setError('')
      return
    }

    setError('Incorrect password')
    setPassword('')
  }

  const handleDeleteEmail = async (id: string) => {
    await deleteMutation.mutateAsync(id)
  }

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email)
    setCopiedEmail(email)
    setTimeout(() => setCopiedEmail(null), 2000)
  }

  const filteredEmails = emails.filter(email =>
    email.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 font-serif">
        <form
          onSubmit={handleSubmit}
          className="w-96 rounded-2xl border border-gray-200 bg-white p-8 shadow-xl"
        >
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Access</h1>
            <p className="mt-2 text-gray-600">Enter password to continue</p>
          </div>

          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 pr-12 text-black placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 transition-colors hover:text-gray-800"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white shadow-lg transition-colors hover:bg-blue-700 hover:shadow-xl"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-serif">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-800">
                <Mail className="h-8 w-8 text-blue-600" />
                Newsletter Subscribers
              </h1>
              <p className="mt-2 text-gray-600">
                Manage your newsletter email list ({emails.length} subscribers)
              </p>
            </div>
            <div className="mt-4 flex gap-3 sm:mt-0">
              <button
                onClick={() => refetch()}
                disabled={isLoading}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors disabled:opacity-50 hover:bg-blue-700"
              >
                {isLoading ? 'Refreshing...' : 'Refresh'}
              </button>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search emails..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-black placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" />
            </div>
          ) : filteredEmails.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              <Mail className="mx-auto mb-4 h-12 w-12 text-gray-300" />
              <p className="text-lg">No emails found</p>
              {searchTerm && (
                <p className="mt-2 text-sm">Try adjusting your search terms</p>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredEmails.map((email, index) => (
                    <tr
                      key={email._id}
                      className="transition-colors hover:bg-gray-50"
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                            <span className="text-sm font-medium text-blue-600">
                              {index + 1}
                            </span>
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {email.email}
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopyEmail(email.email)}
                            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
                            title="Copy email"
                          >
                            {copiedEmail === email.email ? (
                              <CheckCheck size={18} className="text-green-600" />
                            ) : (
                              <Copy size={18} />
                            )}
                          </button>
                          <button
                            onClick={() => handleDeleteEmail(email._id)}
                            disabled={deleteMutation.isPending}
                            className="rounded-lg p-2 text-gray-600 transition-colors disabled:opacity-50 hover:bg-red-50 hover:text-red-600"
                            title="Delete email"
                          >
                            {deleteMutation.isPending &&
                            deleteMutation.variables === email._id ? (
                              <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-red-600" />
                            ) : (
                              <Trash2 size={18} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
