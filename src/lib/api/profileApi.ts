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
  phone?: string
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
  phone?: string
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

function normalizeUserProfile(profile: UserProfile): UserProfile {
  return {
    ...profile,
    _id: profile._id || (profile as any).id,
    phone: profile.phone || profile.phoneNumber,
    phoneNumber: profile.phoneNumber || profile.phone,
  }
}

// ==================== GET USER PROFILE ====================
export const useGetUserProfile = (accessToken: string, userId?: string) => {
  return useQuery<ProfileResponse>({
    queryKey: ['user-profile', userId],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      const response = await handleResponse<ProfileResponse>(res)
      return {
        ...response,
        data: normalizeUserProfile(response.data),
      }
    },
    enabled: !!accessToken && !!userId,
  })
}

// ==================== UPDATE PROFILE ====================
export const useUpdateProfile = (
  accessToken: string,
  userId?: string,
  options?: any,
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateProfileData) => {
      const payload = {
        ...data,
        phone: data.phone ?? data.phoneNumber,
      }

      const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      })

      const response = await handleResponse<ProfileResponse>(res)
      return {
        ...response,
        data: normalizeUserProfile(response.data),
      }
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
export const useUpdateProfileImage = (
  accessToken: string,
  userId?: string,
  options?: any,
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      })

      const response = await handleResponse<ProfileResponse>(res)
      return {
        ...response,
        data: normalizeUserProfile(response.data),
      }
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
