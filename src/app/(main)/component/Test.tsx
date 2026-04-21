'use client';
import Image from 'next/image';
import React, { useState } from 'react';

export default function Test() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleNotify = async () => {
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/newsletter/subscribe`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage("Thank you for subscribing! We'll notify you soon.");
        setEmail('');

        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 3000);
      } else {
        setStatus('error');
        setMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error! Try again.');
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-zoom"
        style={{
          backgroundImage: `url('/Bg.png')`,
          filter: 'brightness(0.4)',
        }}
      />

      {/* Border Frame */}
      <div className="absolute inset-4 md:inset-6 lg:inset-8 border-[6px] md:border-[8px] border-white/80 pointer-events-none" />

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center justify-between min-h-screen px-4 sm:px-6 md:px-10 py-10">

        {/* Logo */}
        <div className="animate-float">
          <Image
            src="/LOOGO.png"
            alt="Clinically Manic Logo"
            width={240}
            height={160}
            className="mx-auto rounded-xl shadow-lg w-48 sm:w-60 md:w-72 lg:w-80"
          />
        </div>

        <p className="text-white/90 text-3xl sm:text-2xl md:text-4xl tracking-widest font-serif  mt-4">
          We&apos;re all mad here
        </p>

        {/* Middle Content */}
        <div className="flex flex-col items-center justify-center flex-1 space-y-6 mt-6 w-full px-2">

          <h1 className="text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider text-center leading-tight">
            CLINICALLY MANIC
          </h1>

          {/* Email Input + Button */}
          <div className="mt-10 flex flex-col items-center space-y-4 w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={status === 'loading'}
              className="w-64 sm:w-72 md:w-80 lg:w-96 px-6 py-3 bg-transparent border border-white/60 text-white placeholder-white/50 
              focus:outline-none focus:border-white text-center disabled:opacity-60 text-sm sm:text-base font-serif"
            />

            <button
              onClick={handleNotify}
              disabled={status === 'loading'}
              className="px-10 sm:px-12 py-3 border border-white/60 text-white uppercase tracking-widest 
              text-xs sm:text-sm hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50"
            >
              {status === 'loading'
                ? 'Submitting...'
                : status === 'success'
                ? 'Thank You!'
                : 'Notify Me'}
            </button>

            {message && (
              <p
                className={`text-xl mt-1  ${
                  status === 'success'
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="w-full flex justify-center pb-4 mt-6">
          <p className="text-white/70 text-3xl sm:text-4xl md:text-4xl   font-serif">
         Coming    2026
          </p>
        </div>
      </div>
    </div>
  );
}
