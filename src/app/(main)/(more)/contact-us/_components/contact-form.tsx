'use client'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
import { Textarea } from '@/components/ui/textarea'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phoneNumber: z.string().min(1, {
    message: 'Phone number is required.',
  }),
  occupation: z.string().min(1, {
    message: 'Company name is required.',
  }),
  subject: z.string().min(1, {
    message: 'Subject is required.',
  }),
  message: z.string().min(1, {
    message: 'Message is required.',
  }),
})

// Define TypeScript type from the schema
type FormData = z.infer<typeof formSchema>

const ContactForm = () => {
  const session = useSession()
  const token = session?.data?.user?.accessToken

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      occupation: '',
      subject: '',
      message: '',
    },
  })

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['contact'],
    mutationFn: async (data: FormData) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        throw new Error(`Failed to send message: ${res.statusText}`)
      }

      return await res.json()
    },
    onSuccess: () => {
      form.reset()
      toast.success('Message sent successfully!')
    },
    onError: (error: Error) => {
      console.error('Error sending message:', error)
      toast.error(error.message)
    },
  })

  const onSubmit = async (values: FormData) => {
    try {
      await mutateAsync(values)
    } catch {}
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex items-center gap-5 w-full">
            <div className="lg:w-1/2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name Here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="lg:w-1/2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Email Here" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex items-center gap-5 w-full">
            <div className="lg:w-1/2">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Phone Number Here"
                        type="tel"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="lg:w-1/2">
              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Occupation</FormLabel>
                    <FormControl>
                      <Input placeholder="Occupation Name Here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Add the missing subject field */}
          <div>
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Subject Here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your message here..."
                      className="h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="text-right">
            <Button
              disabled={isPending}
              type="submit"
              variant={'default'}
              className="disabled:cursor-not-allowed border-whitew-full rounded-none px-10 py-3 bg-transparent border border-white/60 uppercase tracking-widest 
                text-xs sm:text-sm hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 font-normal text-white  cursor-pointer hover:scale-105"
            >
              {isPending ? 'Sending Message...' : 'Send Message'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ContactForm
