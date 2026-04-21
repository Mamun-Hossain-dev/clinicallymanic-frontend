import React, { Suspense } from 'react'
import PaymentSuccessPage from './_components/success-payment'

const page = () => {
  return (
    <Suspense fallback={null}>
      <PaymentSuccessPage />
    </Suspense>
  )
}

export default page
