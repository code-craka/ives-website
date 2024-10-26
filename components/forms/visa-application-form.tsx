'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FileUpload } from '@/components/shared/file-upload'

const applicationSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  dateOfBirth: z.string(),
  nationality: z.string(),
  passportNumber: z.string().min(5),
  passportExpiry: z.string(),
  travelDate: z.string(),
  purposeOfVisit: z.string().min(10),
  documents: z.array(z.object({
    type: z.string(),
    url: z.string(),
  })),
})

type ApplicationValues = z.infer<typeof applicationSchema>

interface VisaApplicationFormProps {
  countryId: string
  visaTypeId: string
  onSubmit: (data: ApplicationValues) => Promise<void>
}

export function VisaApplicationForm({
  countryId,
  visaTypeId,
  onSubmit,
}: VisaApplicationFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ApplicationValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      nationality: '',
      passportNumber: '',
      passportExpiry: '',
      travelDate: '',
      purposeOfVisit: '',
      documents: [],
    },
  })

  async function handleSubmit(values: ApplicationValues) {
    try {
      setIsLoading(true)
      await onSubmit(values)
    } catch (error) {
      console.error('Application submission error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Add other form fields */}
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Required Documents</h3>
          <FileUpload
            onUpload={(files) => {
              // Handle file uploads
            }}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit Application'}
        </Button>
      </form>
    </Form>
  )
}