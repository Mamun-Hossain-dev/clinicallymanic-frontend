// ==================== SIGN UP PAGE ====================
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { toast } from 'sonner'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import AuthLayout from './authLayout'
export const signupSchema = z
  .object({
    firstName: z.string().min(1, 'First name required'),
    lastName: z.string().min(1, 'Last name required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'At least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm your password'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords don't match",
        path: ['confirmPassword'],
      })
    }
  })

export function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: async (data: {
      firstName: string
      lastName: string
      email: string
      password: string
    }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        },
      )

      const result = await res.json()
      if (!res.ok) throw new Error(result.message || 'Registration failed')
      return result
    },

    onSuccess: () => {
      toast.success('Account created successfully 🎉')
      router.push('/signin')
    },

    onError: (error: any) => {
      toast.error(error.message || 'Registration failed')
    },
  })

  const onSubmit = (values: z.infer<typeof signupSchema>) => {
    const payload = {
      // name: `${values.firstName} ${values.lastName}`,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      // confirmPassword: values.confirmPassword,
    }
    registerUser(payload)
  }

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center space-y-3">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold tracking-wider">
            CLINICALLY MANIC
          </h1>
          <p className="text-white/80 text-lg sm:text-xl tracking-wide font-serif">
            Create Your Account
          </p>
        </div>

        <Form {...form}>
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/90 text-sm tracking-wide font-serif">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="First Name"
                        disabled={isPending}
                        className="w-full px-6 py-3 bg-transparent border border-white/60 text-white placeholder-white/50 
                        focus:outline-none focus:border-white focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-60 text-sm sm:text-base font-serif"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 font-serif text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/90 text-sm tracking-wide font-serif">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Last Name"
                        disabled={isPending}
                        className="w-full px-6 py-3 bg-transparent border border-white/60 text-white placeholder-white/50 
                        focus:outline-none focus:border-white focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-60 text-sm sm:text-base font-serif"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 font-serif text-sm" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/90 text-sm tracking-wide font-serif">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      disabled={isPending}
                      className="w-full px-6 py-3 bg-transparent border border-white/60 text-white placeholder-white/50 
                      focus:outline-none focus:border-white focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-60 text-sm sm:text-base font-serif"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 font-serif text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/90 text-sm tracking-wide font-serif">
                    Create Password
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create Password"
                        disabled={isPending}
                        className="w-full px-6 py-3 pr-12 bg-transparent border border-white/60 text-white placeholder-white/50 
                        focus:outline-none focus:border-white focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-60 text-sm sm:text-base font-serif"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <FormMessage className="text-red-400 font-serif text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/90 text-sm tracking-wide font-serif">
                    Confirm Password
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        disabled={isPending}
                        className="w-full px-6 py-3 pr-12 bg-transparent border border-white/60 text-white placeholder-white/50 
                        focus:outline-none focus:border-white focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-60 text-sm sm:text-base font-serif"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <FormMessage className="text-red-400 font-serif text-sm" />
                </FormItem>
              )}
            />

            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={isPending}
              className="w-full px-10 py-3 bg-transparent border border-white/60 text-white uppercase tracking-widest 
              text-xs sm:text-sm hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 font-normal"
            >
              {isPending ? (
                <>
                  Sign Up <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                'Sign Up'
              )}
            </Button>

            <p className="text-center text-sm text-white/70 font-serif">
              Already have an account?{' '}
              <Link
                href="/signin"
                className="text-white hover:underline font-medium transition-colors"
              >
                Log In
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </AuthLayout>
  )
}
