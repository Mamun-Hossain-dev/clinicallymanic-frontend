'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, User, Lock } from 'lucide-react'
import {
  useGetUserProfile,
  useUpdateProfile,
  useUpdateProfileImage,
  useChangePassword,
  UpdateProfileData,
} from '@/lib/api/profileApi'
import { toast } from 'sonner'
import { ProfileImageUpload } from './profileImageUpload'
import { PasswordForm } from './passwordForm'
import { useUserStore } from '@/app/store/useUserProfileStore'
import { ProfileForm } from './profileFrom'

export default function SettingsPage() {
  const { data: session, update: updateSession } = useSession()
  const accessToken = session?.user?.accessToken || ''

  // Zustand store
  const { setUser } = useUserStore()

  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile')

  // Profile states
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [profileImage, setProfileImage] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState('')

  // Password states
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const {
    data: profileData,
    isLoading: profileLoading,
    refetch: refetchProfile,
  } = useGetUserProfile(accessToken)

  const { mutate: updateProfile, isPending: isUpdatingProfile } =
    useUpdateProfile(accessToken, {
      onSuccess: async () => {
        toast.success('Profile updated successfully ✅')
        await refetchProfile()
        await updateSession()
      },
      onError: (error: Error) =>
        toast.error(error.message || 'Failed to update profile ❌'),
    })

  const { mutate: updateProfileImage, isPending: isUpdatingImage } =
    useUpdateProfileImage(accessToken, {
      onSuccess: async () => {
        toast.success('Profile image updated successfully ✅')
        setImageFile(null)
        await refetchProfile()
      },
      onError: (error: Error) =>
        toast.error(error.message || 'Failed to update profile image ❌'),
    })

  const { mutate: changePassword, isPending: isChangingPassword } =
    useChangePassword(accessToken, {
      onSuccess: () => {
        toast.success('Password changed successfully ✅')
        setOldPassword('')
        setNewPassword('')
        setConfirmPassword('')
      },
      onError: (error: Error) =>
        toast.error(error.message || 'Failed to change password ❌'),
    })

  // Update Zustand store whenever profile data changes
  useEffect(() => {
    if (profileData?.data) {
      const profile = profileData.data

      // Store complete user profile in Zustand
      setUser(profile)

      // Update local state for form
      const userName = '@' + profile.firstName
      setFirstName(profile?.firstName || '')
      setLastName(profile?.lastName || '')
      setUsername(userName || '')
      setEmail(profile.email || '')
      setPhoneNumber(profile.phoneNumber || '')
      setProfileImage(profile.profileImage || '')
      setImagePreview(profile.profileImage || '')
    }
  }, [profileData, setUser])

  const handleImageChange = (file: File) => {
    setImageFile(file)
    const reader = new FileReader()
    reader.onloadend = () => setImagePreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleUploadProfileImage = () => {
    if (!imageFile) {
      toast.error('Please select an image before uploading')
      return
    }

    const formData = new FormData()
    formData.append('profileImage', imageFile)
    updateProfileImage(formData)
  }

  const handleUpdateProfile = () => {
    const profilePayload: UpdateProfileData = {
      firstName,
      lastName,
      phoneNumber,
    }
    updateProfile(profilePayload)
  }

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all password fields')
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match')
      return
    }
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    changePassword({ oldPassword, newPassword })
  }

  const handleReset = () => {
    if (activeTab === 'profile') {
      if (profileData?.data) {
        const profile = profileData.data
        const userName = '@' + profile.firstName
        setFirstName(profile.firstName || '')
        setLastName(profile.lastName || '')
        setUsername(userName || '')
        setPhoneNumber(profile.phoneNumber || '')
        setImagePreview(profile.profileImage || '')
        setImageFile(null)
      }
    } else {
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
    }
  }

  if (profileLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-white mx-auto" />
          <p className="text-[#b5b5b5] text-sm">Loading profile...</p>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'profile', label: 'Personal Information', icon: User },
    { id: 'password', label: 'Security', icon: Lock },
  ] as const

  return (
    <div className="w-full">
      <Card className="bg-[#0f0f0f] border-[#262626] shadow-xl">
        <CardContent className="p-6 md:p-8">
          {/* Tabs Navigation */}
          <div className="flex gap-4 border-b border-[#262626] mb-8 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-3 font-medium text-sm
                    transition-all duration-200 border-b-2 whitespace-nowrap
                    ${
                      isActive
                        ? 'text-white border-white'
                        : 'text-[#777] border-transparent hover:text-white hover:border-[#404040]'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'profile' && (
              <>
                <ProfileImageUpload
                  imagePreview={imagePreview}
                  fullName={firstName}
                  isUpdating={isUpdatingImage}
                  onImageChange={handleImageChange}
                  onUpload={handleUploadProfileImage}
                />

                <div className="border-t border-[#262626] pt-8">
                  <ProfileForm
                    firstName={firstName}
                    setFirstName={setFirstName}
                    lastName={lastName}
                    setLastName={setLastName}
                    username={username}
                    setUsername={setUsername}
                    email={email}
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    isUpdating={isUpdatingProfile}
                    onSubmit={handleUpdateProfile}
                    onReset={handleReset}
                  />
                </div>
              </>
            )}

            {activeTab === 'password' && (
              <PasswordForm
                oldPassword={oldPassword}
                setOldPassword={setOldPassword}
                newPassword={newPassword}
                setNewPassword={setNewPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                isUpdating={isChangingPassword}
                onSubmit={handleChangePassword}
                onReset={handleReset}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
