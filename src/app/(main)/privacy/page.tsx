/* eslint-disable react/no-unescaped-entities */
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Clinically Manic',
  description:
    'Privacy Policy for Clinically Manic - Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
          PRIVACY POLICY
        </h1>

        <div className="space-y-1 text-sm text-gray-400 mb-10 sm:mb-12">
          <p>Last Updated: January 15, 2026</p>
          <p>Effective Date: January 15, 2026</p>
        </div>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <p className="text-base sm:text-lg">
            Clinically Manic ("we," "us,&quot; or &quot;our&quot;) is committed
            to protecting your privacy. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you
            visit our website{' '}
            <a
              href="https://www.clinicallymanic.com"
              className="text-white underline hover:text-gray-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.clinicallymanic.com
            </a>
            , create an account, or purchase a subscription.
          </p>

          <p className="text-base sm:text-lg">
            By using our Site, you consent to the data practices described in
            this policy.
          </p>

          <section className="mt-10 sm:mt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">
              1. INFORMATION WE COLLECT
            </h2>
            <p className="mb-6">
              We collect information that identifies, relates to, describes, or
              could reasonably be linked, directly or indirectly, with you
              ("Personal Information").
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold text-white mt-8 mb-4 tracking-tight">
              A. Information You Provide to Us
            </h3>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">Account Data:</strong> When you
                register or subscribe, we collect your name, email address,
                password, and mailing address (if applicable).
              </li>
              <li>
                <strong className="text-white">Payment Data:</strong> We collect
                billing details necessary to process your subscription. Note: We
                typically use third-party payment processors (e.g., Stripe,
                PayPal) and do not store full credit card numbers on our own
                servers.
              </li>
              <li>
                <strong className="text-white">
                  User-Generated Content (UGC):
                </strong>{' '}
                Any text, images, or media you voluntarily post in comment
                sections or forums. Please be aware that any information
                disclosed in these areas becomes public information.
              </li>
            </ul>

            <h3 className="text-xl sm:text-2xl font-semibold text-white mt-8 mb-4 tracking-tight">
              B. Information We Collect Automatically
            </h3>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">Usage Data:</strong> IP address,
                browser type, operating system, access times, and pages viewed.
              </li>
              <li>
                <strong className="text-white">Cookies and Tracking:</strong> We
                use cookies, web beacons, and pixels to analyze site traffic and
                improve user experience. You can control cookie preferences
                through your browser settings.
              </li>
            </ul>
          </section>

          <section className="mt-10 sm:mt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">
              2. HOW WE USE YOUR INFORMATION
            </h2>
            <p className="mb-6">
              We use the information we collect for the following business
              purposes:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">To Provide Services:</strong>{' '}
                Managing your account, processing payments, and granting access
                to premium content.
              </li>
              <li>
                <strong className="text-white">To Communicate:</strong> Sending
                you administrative notifications, such as subscription renewal
                reminders (including the required notice for our 30-day
                cancellation window) and updates to our Terms.
              </li>
              <li>
                <strong className="text-white">To Enforce Our Terms:</strong>{' '}
                Detecting and preventing fraud, abuse, harassment, and
                unauthorized web scraping or AI training activities.
              </li>
              <li>
                <strong className="text-white">To Improve Our Site:</strong>{' '}
                Analyzing user behavior to optimize content and functionality.
              </li>
            </ul>
          </section>

          <section className="mt-10 sm:mt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">
              3. SHARING OF YOUR INFORMATION
            </h2>
            <p className="mb-6">
              We do not sell your Personal Information to third parties for
              money. We may share information in the following situations:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">Service Providers:</strong> We
                share data with trusted third-party vendors who perform services
                for us, such as payment processing, email delivery, and hosting.
              </li>
              <li>
                <strong className="text-white">Legal Requirements:</strong> We
                may disclose information if required to do so by law or in the
                good faith belief that such action is necessary to comply with a
                legal obligation (e.g., a subpoena), protect our rights, or
                investigate violations of our Terms (including harassment or
                cyberstalking).
              </li>
              <li>
                <strong className="text-white">Business Transfers:</strong> If
                Clinically Manic is involved in a merger, acquisition, or sale
                of assets, your information may be transferred as part of that
                transaction.
              </li>
            </ul>
          </section>

          <section className="mt-10 sm:mt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">
              4. DATA SECURITY
            </h2>
            <p>
              We use administrative, technical, and physical security measures
              to help protect your Personal Information. However, no electronic
              transmission over the internet or information storage technology
              can be guaranteed to be 100% secure. You provide your information
              at your own risk.
            </p>
          </section>

          <section className="mt-10 sm:mt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">
              5. YOUR DATA RIGHTS & CHOICES
            </h2>
            <p className="mb-6">
              Depending on your jurisdiction, you may have certain rights
              regarding your data:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">Account Information:</strong> You
                may update or correct your account information at any time by
                logging into your account settings.
              </li>
              <li>
                <strong className="text-white">Opt-Out of Marketing:</strong>{' '}
                You can unsubscribe from marketing emails by following the
                "Unsubscribe" link in the emails. (Note: You cannot opt out of
                administrative emails regarding your subscription status or
                legal notices).
              </li>
              <li>
                <strong className="text-white">Do Not Track:</strong> We do not
                currently respond to "Do Not Track" browser signals.
              </li>
            </ul>
          </section>

          <section className="mt-10 sm:mt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">
              6. PROTECTION AGAINST UNAUTHORIZED DATA HARVESTING
            </h2>
            <p>
              Consistent with our Terms and Conditions, we employ technical
              measures to block unauthorized "scraping" of data. We do not
              consent to the use of any Personal Information or User Content
              displayed on our Site for the training of Artificial Intelligence
              (AI) or Large Language Models (LLMs) by third parties.
            </p>
          </section>

          <section className="mt-10 sm:mt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">
              7. CHILDREN'S PRIVACY
            </h2>
            <p>
              Our Site is not intended for individuals under the age of 13. We
              do not knowingly collect personal information from children under
              13. If we become aware that we have collected such data, we will
              delete it immediately.
            </p>
          </section>

          <section className="mt-10 sm:mt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">
              8. NOTICE TO FLORIDA RESIDENTS
            </h2>
            <p>
              While Clinically Manic operates out of the State of Florida, we
              respect the privacy rights of all users. If you are a Florida
              resident, you may have specific rights regarding the correction or
              deletion of your data under applicable Florida law. To make a
              request, please contact us using the information below.
            </p>
          </section>

          <section className="mt-10 sm:mt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">
              9. CHANGES TO THIS PRIVACY POLICY
            </h2>
            <p>
              We reserve the right to change this Privacy Policy at any time.
              The "Last Updated" date at the top of this policy will indicate
              when the latest revisions were made. Your continued use of the
              Site after changes constitute your acceptance of the new policy.
            </p>
          </section>

          <section className="mt-10 sm:mt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">
              10. CONTACT US
            </h2>
            <p className="mb-6">
              If you have questions or comments about this Privacy Policy,
              please contact us at:
            </p>
            <div className="space-y-2 text-gray-300">
              <p>
                <strong className="text-white">Email:</strong>{' '}
                <a
                  href="mailto:carlos@clinicallymanic.com"
                  className="text-white underline hover:text-gray-300 transition-colors"
                >
                  carlos@clinicallymanic.com
                </a>
              </p>
              <p>
                <strong className="text-white">Mailing Address:</strong> 6220 NW
                77th Terrace, Parkland FL 33067
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
