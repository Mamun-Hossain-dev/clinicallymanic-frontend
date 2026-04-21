'use client';

import { useState } from 'react';
import { Mail, Loader2, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export default function ComingSoon() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  interface SubscribeResponse {
    message?: string;
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

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

      const data: SubscribeResponse = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage("Thank you for subscribing! We'll notify you when we launch.");
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Failed to subscribe. Please check your connection and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 bg-pattern">
      <div className="max-w-2xl w-full text-center space-y-8 animate-fadeIn">
        
        {/* Logo */}
        <div className="animate-float">
          <Image
            src="/logo.jpeg"
            alt="Clinically Manic Logo"
            width={100}
            height={100}
            className="mx-auto rounded-xl shadow-lg"
          />
        </div>

        {/* Heading */}
        <div className="space-y-4 animate-slideUp">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 drop-shadow-sm ">
          The  Coming Soon
          </h1>
          <p className="text-xl text-gray-600 max-w-md mx-auto font-alice">
            We&apos;re working on something amazing. Subscribe to get notified when we launch!
          </p>
        </div>

        {/* Email Form */}
        <div className="max-w-md mx-auto animate-fadeUp delay-200">
          <div className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-blue-600 transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={status === 'loading' || status === 'success'}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 
                focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-400 
                disabled:bg-gray-100 disabled:cursor-not-allowed transition-all
                hover:border-blue-400"
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={status === 'loading' || status === 'success'}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white 
              font-semibold py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 
              transition-all transform hover:scale-[1.03] active:scale-95
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 
              flex items-center justify-center gap-2 shadow-xl"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Subscribing...
                </>
              ) : status === 'success' ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Subscribed!
                </>
              ) : (
                'Notify Me'
              )}
            </button>

            {message && (
              <div
                className={`p-4 rounded-lg text-sm animate-fadeIn border
                ${
                  status === 'success'
                    ? 'bg-green-50 text-green-800 border-green-200'
                    : 'bg-red-50 text-red-800 border-red-200'
                }
                `}
              >
                {message}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 space-y-4 animate-fadeIn delay-300">
          <p className="text-gray-500 text-sm">
            Join thousands of others waiting for the launch
          </p>
          <div className="flex justify-center gap-6 text-gray-400">
            <a href="#" className="hover:text-blue-500 transition-colors">Twitter</a>
            <a href="#" className="hover:text-blue-500 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Facebook</a>
          </div>
        </div>
      </div>
    </div>
  );
}
