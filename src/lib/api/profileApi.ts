/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
// Types
export interface Subscription {
  _id: string
  name: string
  type: 'monthly' | 'yearly'
  price: number
  status: 'active' | 'inactive'
  features: string[]
  totalSubscribedUsers: string[]
  createdAt: string
  updatedAt: string
}

export interface UserProfile {
  _id: string
  userId?: string
  firstName?: string
  lastName?: string
  email: string
  bio?: string
  phoneNumber?: string
  profileImage?: string
  subscription?: Subscription
  subscriptionExpiry?: string
  fileType?: string
  uploadedAt?: string
  role?: string
  verified?: boolean
  isSubscription?: boolean
  createdAt?: string
  updatedAt?: string
  password?: string
  __v?: number
}

export interface ProfileResponse {
  success: boolean
  message: string
  data: UserProfile
}

export interface UpdateProfileData {
  firstName?: string
  lastName?: string
  // username?: string
  bio?: string
  phoneNumber?: string
}

export interface ChangePasswordData {
  oldPassword: string
  newPassword: string
}

// ==================== HELPER ====================
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || 'Something went wrong')
  }
  return response.json()
}

// ==================== GET USER PROFILE ====================
export const useGetUserProfile = (accessToken: string) => {
  return useQuery<ProfileResponse>({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      return handleResponse<ProfileResponse>(res)
    },
    enabled: !!accessToken,
  })
}

// ==================== UPDATE PROFILE ====================
export const useUpdateProfile = (accessToken: string, options?: any) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateProfileData) => {
      const res = await fetch(`${API_BASE_URL}/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      })

      return handleResponse<ProfileResponse>(res)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] })
      options?.onSuccess?.()
    },
    onError: error => {
      options?.onError?.(error)
    },
  })
}

// ==================== UPDATE PROFILE IMAGE ====================
export const useUpdateProfileImage = (accessToken: string, options?: any) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch(`${API_BASE_URL}/user/profile`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      })

      return handleResponse<ProfileResponse>(res)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] })
      options?.onSuccess?.()
    },
    onError: error => {
      options?.onError?.(error)
    },
  })
}

// ==================== CHANGE PASSWORD ====================
export const useChangePassword = (accessToken: string, options?: any) => {
  return useMutation({
    mutationFn: async (data: ChangePasswordData) => {
      const res = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      })

      return handleResponse<{ success: boolean; message: string }>(res)
    },
    onSuccess: () => {
      options?.onSuccess?.()
    },
    onError: error => {
      options?.onError?.(error)
    },
  })
}
