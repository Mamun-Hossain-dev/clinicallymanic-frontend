import React from 'react'
import ContactForm from './contact-form'

const Contact = () => {
  return (
    <div className="container mx-auto mt-6 pb-5">
      <div className="flex flex-col lg:flex-row items-stretch shadow-xl rounded">
        {/* Right Side - Form */}
        <div
          className="flex-1 pl-5 pb-12 pr-5 
        "
        >
          <div className="mb-6 space-y-2">
            <h1 className="text-xl md:text-2xl lg:text-2xl text-[#f6f6f7] font-bold">
              Send us a Message
            </h1>
            <p className="opacity-75 text-sm md:text-base">
              Our friendly team would love to hear from you.
            </p>
          </div>
          <div className="mt-5">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
