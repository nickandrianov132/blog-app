'use client'

import { useTransition, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { SignupFormSchema, SignupFormValues } from '../lib/definitions'
import { signup } from '../actions/auth'

export default function SignupForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [serverError, setServerError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(SignupFormSchema),
    mode: 'onTouched',
  })

  const onSubmit = (data: SignupFormValues) => {
    setServerError(null)

    startTransition(async () => {
      const formData = new FormData()
      formData.append('login', data.login)
      formData.append('email', data.email)
      formData.append('password', data.password)
      formData.append('name', data.name || '')

      const result = await signup(formData)

      if (result?.success) {
        setShowModal(true)
      } else if (result?.message) {
        setServerError(result.message)
      }
    })
  }

  return (
    <div className="relative w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Registration</h2>

      {serverError && (
        <div className="p-3 mb-4 text-sm text-red-700 bg-red-50 rounded-lg border border-red-200" role="alert">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Поле Login */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Login</label>
          <input
            type="text"
            {...register('login')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition ${
              errors.login ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-100'
            }`}
          />
          {errors.login && <p className="mt-1 text-sm text-red-500">{errors.login.message}</p>}
        </div>

        {/* Поле Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
          <input
            type="email"
            {...register('email')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition ${
              errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-100'
            }`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        {/* Поле Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Your Name</label>
          <input
            type="text"
            {...register('name')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
          />
        </div>

        {/* Поле Password */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
          <input
            type="password"
            {...register('password')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition ${
              errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-100'
            }`}
          />
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow disabled:opacity-50 transition"
        >
          {isPending ? 'Loading...' : 'Registration'}
        </button>
      </form>

      {/* Popup Success */}
      {showModal && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center p-6 bg-white/70 backdrop-blur-md animate-fade-in">
          <div className="text-center space-y-4 max-w-xs scale-up">
            {/* Success icon */}
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900">Success!</h3>
            <p className="text-sm text-gray-500">
              Your account successfully created.
            </p>
            
            <button
              onClick={() => router.push('/login')}
              className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md shadow transition"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
