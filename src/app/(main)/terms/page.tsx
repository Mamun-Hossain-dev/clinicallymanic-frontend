/* eslint-disable react/no-unescaped-entities */
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions - Clinically Manic',
  description:
    'Terms and Conditions for Clinically Manic - Read our terms of service, subscription policies, and user guidelines.',
}

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
          TERMS AND CONDITIONS
        </h1>

        <div className="space-y-1 text-sm text-gray-400 mb-10 sm:mb-12">
          <p>Last Updated: January 15, 2026</p>
          <p>Effective Date: January 15, 2026</p>
        </div>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <p className="text-base sm:text-lg">
            Welcome to Clinically Manic (the "Site"). Please read these Terms
            and Conditions ("Terms," "Agreement") carefully before using the
            Site or subscribing to our services.
          </p>

          <p className="text-base sm:text-lg">
            By accessing or using the Site, you agree to be bound by these Terms
            and our Privacy Policy. If you disagree with any part of the terms,
            you may not access the Site.
          </p>

          <section className="mt-10 sm:mt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">
              1. RIGHT TO MODIFY TERMS
            </h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                Clinically Manic reserves the right, at our sole discretion, to
                modify, replace, or update these Terms at any time.
              </li>
              <li>
                It is your responsibility to review these Terms periodically for
                changes.
              </li>
              <li>
                Your continued use of the Site following the posting of any
                changes constitutes acceptance of those changes.
              </li>
              <li>
                We may provide notice of material changes via email or a
                prominent notice on the Site, but we are not obligated to do so.
              </li>
            </ul>
          </section>

          <section className="mt-10 sm:mt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">
              2. INTELLECTUAL PROPERTY
            </h2>
            <p>
              The Site and its original content, features, and functionality
              (including but not limited to all articles, videos, logos, and
              software) are owned by Clinically Manic and are protected by
              United States and international copyright, trademark, patent,
              trade secret, and other intellectual property or proprietary
              rights laws.
            </p>
          </section>

          <section className="mt-10 sm:mt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">
              3. PROHIBITION ON DATA MINING, SCRAPING, AND AI TRAINING
            </h2>
            <p className="mb-6">
              You are strictly prohibited from using the Site or its content for
              data mining, data extraction, or the training of artificial
              intelligence systems. By accessing the Site, you agree NOT to:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">Scrape or Crawl:</strong> Use any
                robot, spider, scraper, deep link, or other similar automated
                data gathering or extraction tools, program, algorithm, or
                methodology to access, acquire, copy, or monitor the Site or any
                portion of the Site.
              </li>
              <li>
                <strong className="text-white">Train AI Models:</strong> Use any
                content, text, images, metadata, or data found on Clinically
                Manic to train, fine-tune, or ground any machine learning
                models, Large Language Models (LLMs), or other generative
                artificial intelligence technologies.
              </li>
              <li>
                <strong className="text-white">Bypass Security:</strong> Attempt
                to decipher, decompile, disassemble, or reverse engineer any of
                the software used to provide the Site or bypass any measures we
                may use to prevent or restrict access to the Site.
              </li>
            </ul>
            <p className="mt-6">
              Violation of this section will result in an immediate ban and
              potential legal action to seek damages for the unauthorized use of
              our intellectual property.
            </p>
          </section>

          <section className="mt-10 sm:mt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">
              4. USER-GENERATED CONTENT (UGC)
            </h2>
            <p className="mb-6">
              Clinically Manic may allow users to post comments, upload media,
              or submit other content ("User Content").
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">License Grant:</strong> By
                posting User Content, you grant Clinically Manic a
                non-exclusive, worldwide, perpetual, irrevocable, royalty-free,
                sublicensable right to use, reproduce, modify, adapt, publish,
                translate, distribute, and display such content in any media.
              </li>
              <li>
                <strong className="text-white">Representation:</strong> You
                represent and warrant that you own or control all rights to the
                User Content you post and that the content is accurate and does
                not violate these Terms.
              </li>
              <li>
                <strong className="text-white">Monitoring:</strong> We have the
                right, but not the obligation, to monitor and edit or remove any
                User Content. We take no responsibility and assume no liability
                for any User Content posted by you or any third party.
              </li>
            </ul>
          </section>

          <section className="mt-10 sm:mt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">
              5. PROHIBITED CONDUCT: HARASSMENT & BULLYING
            </h2>
            <p className="mb-6">
              Clinically Manic is committed to a safe user environment. The
              following conduct is strictly prohibited and will result in
              immediate account termination:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">Harassment:</strong> Engaging in
                a course of conduct directed at a specific person that causes
                substantial emotional distress.
              </li>
              <li>
                <strong className="text-white">
                  Bullying & Cyberstalking:
                </strong>{' '}
                Threatening, intimidating, or aggressively pursuing other users
                or Clinically Manic staff.
              </li>
              <li>
                <strong className="text-white">Hate Speech:</strong> Content
                that promotes violence or hatred against individuals or groups
                based on race, ethnicity, religion, gender, sexual orientation,
                disability, or age.
              </li>
              <li>
                <strong className="text-white">Doxxing:</strong> Publishing the
                private or identifying information of another individual without
                their consent.
              </li>
            </ul>
          </section>

          <section className="mt-10 sm:mt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">
              6. SUBSCRIPTION TERMS & CANCELLATION POLICY
            </h2>
            <p className="mb-6">
              Certain aspects of the Site are provided on a subscription basis
              ("Subscription"). By purchasing a Subscription, you agree to the
              following strict financial terms:
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold text-white mt-8 mb-4 tracking-tight">
              A. Automatic Renewal
            </h3>
            <p className="mb-6">
              Your Subscription will automatically renew at the end of each
              billing cycle (e.g., monthly or annually) under the same terms
              unless cancelled in accordance with Section 6(B).
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold text-white mt-8 mb-4 tracking-tight">
              B. 30-Day Cancellation Notice Requirement
            </h3>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                To avoid being charged for the next billing cycle, you must
                cancel your subscription at least thirty (30) days prior to your
                renewal date.
              </li>
              <li>
                <strong className="text-white">Example:</strong> If your
                subscription renews on March 1st, you must submit your
                cancellation request by January 30th.
              </li>
              <li>
                If you cancel less than 30 days before renewal, you will be
                charged for the subsequent cycle, and your subscription will
                terminate at the end of that subsequent cycle.
              </li>
            </ul>

            <h3 className="text-xl sm:text-2xl font-semibold text-white mt-8 mb-4 tracking-tight">
              C. No Refunds
            </h3>
            <ul className="list-disc pl-6 space-y-3">
              <li>All payments are non-refundable.</li>
              <li>
                There are no refunds or credits for partially used periods.
              </li>
              <li>
                There are no refunds for failure to cancel within the required
                30-day notice window.
              </li>
            </ul>
          </section>

          <section className="mt-10 sm:mt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">
              7. DISCLAIMERS
            </h2>
            <p>
              The information provided on Clinically Manic is for general
              informational and entertainment purposes only. The Site is
              provided on an "AS IS" and "AS AVAILABLE" basis. Clinically Manic
              makes no representations or warranties of any kind, express or
              implied, regarding the operation of the Site or the information,
              content, or materials included on the Site.
            </p>
          </section>

          <section className="mt-10 sm:mt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">
              8. LIMITATION OF LIABILITY
            </h2>
            <p>
              In no event shall Clinically Manic, nor its directors, employees,
              partners, agents, suppliers, or affiliates, be liable for any
              indirect, incidental, special, consequential, or punitive damages,
              including without limitation, loss of profits, data, use,
              goodwill, or other intangible losses, resulting from your access
              to or use of or inability to access or use the Site.
            </p>
          </section>

          <section className="mt-10 sm:mt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">
              9. GOVERNING LAW AND JURISDICTION
            </h2>
            <p className="mb-4">
              These Terms shall be governed and construed in accordance with the
              laws of the State of Florida, United States, without regard to its
              conflict of law provisions.
            </p>
            <p>
              <strong className="text-white">Venue:</strong> You agree to submit
              to the personal jurisdiction of the state and federal courts
              located in Florida for any actions for which we retain the right
              to seek injunctive or other equitable relief.
            </p>
          </section>

          <section className="mt-10 sm:mt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight">
              10. CONTACT US
            </h2>
            <p className="mb-6">
              If you have any questions about these Terms, please contact us at:
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
                <strong className="text-white">Address:</strong> 6220 NW 77th
                Terrace, Parkland FL 33067
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
