"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

export default function PrivacyPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Header />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-4xl mt-8 sm:mt-12"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-center">
              Privacy Policy
            </h1>

            <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none space-y-6 sm:space-y-8 text-muted-foreground">
              <p className="text-base sm:text-lg leading-relaxed">
                HiveBuying (&quot;we,&quot; &quot;our,&quot; &quot;us&quot;) values the trust you place in us when you use our website, mobile app, and related services (collectively, &quot;Services&quot;).
                This Privacy Policy explains how we collect, use, share, store, and protect your personal data when you use HiveBuying.com, and the rights and choices available to you.
              </p>

              <p className="text-base sm:text-lg leading-relaxed">
                By using HiveBuying, you agree to the practices described in this Privacy Policy. If you do not agree, please do not use our Services.
              </p>

              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4 text-foreground">1. Company Details</h2>
                <ul className="list-none space-y-2 pl-0">
                  <li><strong>Name:</strong> HiveBuying</li>
                  <li><strong>Website:</strong> <Link href="https://www.hivebuying.com" className="text-black underline underline-offset-2 transition-all duration-200 ease-linear hover:opacity-60">https://www.hivebuying.com</Link></li>
                  <li><strong>Email:</strong> <Link href="mailto:support@hivebuying.com" className="text-black underline underline-offset-2 transition-all duration-200 ease-linear hover:opacity-60">support@hivebuying.com</Link></li>
                  <li><strong>Phone:</strong> +91 9026684646</li>
                  <li><strong>Address:</strong> 27th Main Road, HSR Layout, Bengaluru, Karnataka, India</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4 text-foreground">2. Scope</h2>
                <p>This Privacy Policy applies to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Users accessing our website, app, or participating in HiveBuying groups.</li>
                  <li>Brand partners, sellers, and service providers connected with HiveBuying.</li>
                  <li>All data collected through registration, group participation, payments, and communication.</li>
                </ul>
                <p>It does not apply to third-party websites, apps, or payment gateways that HiveBuying links to. We encourage you to review their privacy practices separately.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4 text-foreground">3. Information We Collect</h2>
                <p>We collect information directly from you, automatically, and through third parties to operate our service effectively.</p>

                <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-3 text-foreground">A. Information You Provide</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Account Details:</strong> Name, email address, phone number, password (encrypted), and basic location.</li>
                  <li><strong>Purchase Interest:</strong> Product category, how soon you plan to buy, and region preferences (&quot;how soon&quot; and &quot;where&quot;).</li>
                  <li><strong>Group Activity:</strong> Groups you join or create, product type, participation status, and timestamps.</li>
                  <li><strong>Communication Data:</strong> Queries, feedback, or messages sent through chat or email.</li>
                  <li><strong>Delivery Information:</strong> Address and contact details (only when placing an order).</li>
                  <li><strong>Identity/KYC (if required):</strong> For specific cases like high-value transactions, we may request ID or address proof for verification.</li>
                </ul>

                <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-3 text-foreground">B. Payment Information</h3>
                <p>We collect only non-sensitive payment metadata, such as transaction ID, payment method, and payment status.</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Card Details:</strong> We do not store your card number, CVV, or expiry date. These are processed directly through PCI-DSS compliant gateways.</li>
                  <li><strong>UPI Payments:</strong> We store only the transaction ID, UPI handle alias (e.g., yourname@upi), and payment confirmation.</li>
                  <li><strong>Refunds:</strong> For refunds, we share necessary transaction references securely with payment processors.</li>
                </ul>
                <p><strong>HiveBuying never stores or accesses your UPI PIN or full card details.</strong></p>

                <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-3 text-foreground">C. Automatically Collected Data</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>IP address, browser type, operating system, device ID, and app version.</li>
                  <li>Pages visited, clicks, time spent, and group participation patterns.</li>
                  <li>Cookies, analytics identifiers, and referral source data.</li>
                </ul>

                <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-3 text-foreground">D. Cookies & Tracking</h3>
                <p>We use cookies and similar technologies for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Session management and login.</li>
                  <li>Analytics and performance improvements.</li>
                  <li>Personalization and remarketing (only if you consent).</li>
                </ul>
                <p>You can control cookies through your browser settings.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4 text-foreground">4. How We Use the Information</h2>
                <p>We use your information to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Create and manage your account.</li>
                  <li>Match you with suitable groups based on product interest, region, and timing.</li>
                  <li>Form and manage buying groups and facilitate purchases.</li>
                  <li>Communicate important updates: group progress, checkout status, payment confirmations, or price drops.</li>
                  <li>Process transactions and issue refunds.</li>
                  <li>Enable brands to fulfill orders directly to your address.</li>
                  <li>Provide customer support and resolve disputes.</li>
                  <li>Improve pricing, grouping, and platform algorithms.</li>
                  <li>Analyze usage trends to enhance our services.</li>
                  <li>Comply with laws and prevent fraud or misuse.</li>
                  <li>Send marketing updates (only if you opt-in).</li>
                </ul>
                <p>We use your data only for the purpose it was collected and never sell it to third parties.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4 text-foreground">5. Group Information and Privacy</h2>
                <p>HiveBuying revolves around group-based buying, and we take special care to protect your group-related data:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Displayed Data:</strong> We may show anonymized group details like the number of members joined (&quot;12 people joined&quot;) — but not personal details such as your full name, email, or phone number.</li>
                  <li><strong>Hidden Details:</strong> Personal info of group members (name, phone, address) is never shared publicly or with other members.</li>
                  <li><strong>Group Privacy Levels:</strong> Public Groups show only total member count. Private Groups show limited details and are by invitation only.</li>
                  <li><strong>Brand Access:</strong> When a group completes a deal, only required delivery information is shared with the brand (no contact sharing beyond fulfillment needs).</li>
                  <li><strong>Internal Controls:</strong> Access to group data is restricted to authorized HiveBuying team members under confidentiality agreements.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4 text-foreground">6. How We Share Information</h2>
                <p>We share limited information only where necessary:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>A. With Brands/Sellers:</strong> Only order-level data (product, quantity, address for delivery). No personal contact details unless user consent is given.</li>
                  <li><strong>B. With Payment Partners:</strong> Transaction data and metadata for processing and refunds. Card/UPI details handled securely by gateways.</li>
                  <li><strong>C. With Service Providers:</strong> Hosting, analytics, cloud storage, and technical infrastructure providers (e.g., AWS, Google Cloud).</li>
                  <li><strong>D. With Logistics Partners:</strong> Shipping details (name, address, phone) for delivery purposes only.</li>
                  <li><strong>E. With Legal Authorities:</strong> If required under law or to prevent fraud, disputes, or imminent harm.</li>
                </ul>
                <p><strong>HiveBuying does not sell or rent personal data to any third party.</strong></p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4 text-foreground">7. Data Security</h2>
                <p>We employ multiple layers of security to keep your data safe:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Encryption:</strong> All personal and payment-related data transmitted via HTTPS and encrypted at rest (AES-256).</li>
                  <li><strong>Access Control:</strong> Only authorized personnel can access sensitive data.</li>
                  <li><strong>Tokenization:</strong> Card details are tokenized by our payment partners; HiveBuying never sees or stores them.</li>
                  <li><strong>System Monitoring:</strong> 24x7 server monitoring for unusual activity or unauthorized access.</li>
                  <li><strong>Regular Audits:</strong> Periodic vulnerability testing and compliance checks.</li>
                  <li><strong>Secure Storage:</strong> Data stored on servers with restricted physical and digital access.</li>
                </ul>
                <p>Despite best efforts, no system is 100% secure. In the rare event of a breach, we&apos;ll notify affected users and authorities as per applicable law.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4 text-foreground">8. Your Rights</h2>
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access the data we hold about you.</li>
                  <li>Request correction or updates to your data.</li>
                  <li>Request deletion of your account and data (except where retention is required by law).</li>
                  <li>Withdraw consent for marketing or promotional communication.</li>
                  <li>Opt out of cookies and targeted ads.</li>
                </ul>
                <p>Contact <Link href="mailto:support@hivebuying.com" className="text-black underline underline-offset-2 transition-all duration-200 ease-linear hover:opacity-60">support@hivebuying.com</Link> to exercise these rights. We respond within 30 days of verified requests.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4 text-foreground">9. Data Retention</h2>
                <p>We retain data only as long as necessary:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Account data:</strong> until account deletion or inactivity for 24 months.</li>
                  <li><strong>Payment & order data:</strong> up to 7 years for tax and audit compliance.</li>
                  <li><strong>Logs & analytics:</strong> anonymized and retained for improving service.</li>
                  <li><strong>Backups:</strong> securely maintained with limited access, purged periodically.</li>
                </ul>
                <p>When you delete your account, personal identifiers are removed from active systems, and remaining data is anonymized.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4 text-foreground">10. Data Transfers</h2>
                <p>If HiveBuying&apos;s servers or vendors are outside India, your data may be processed abroad. All partners must comply with data protection standards equal to Indian law and international best practices (GDPR-equivalent clauses).</p>
                <p>We ensure your data remains protected under contractual and legal safeguards.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4 text-foreground">11. Children&apos;s Privacy</h2>
                <p>HiveBuying is meant for users aged 18 and above. We do not knowingly collect data from minors. If we find a user under 18, their data will be deleted immediately upon verification.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4 text-foreground">12. Data Breach Policy</h2>
                <p>If a data breach occurs:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>We will contain and assess the impact immediately.</li>
                  <li>Affected users and authorities will be notified within 72 hours (as per DPDP Act norms).</li>
                  <li>A clear explanation and next steps will be shared.</li>
                  <li>We will enhance safeguards to prevent future occurrences.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4 text-foreground">13. Legal Compliance</h2>
                <p>HiveBuying complies with:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>The Information Technology Act, 2000</li>
                  <li>The Digital Personal Data Protection Act, 2023 (India)</li>
                  <li>Applicable rules under IT (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.</li>
                </ul>
                <p>We collect only what&apos;s necessary and use it lawfully and fairly.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4 text-foreground">14. Marketing and Communication</h2>
                <p>We may send you updates on offers, group status, and new product deals via email or WhatsApp.</p>
                <p>You can unsubscribe anytime using the opt-out link or by contacting <Link href="mailto:support@hivebuying.com" className="text-black underline underline-offset-2 transition-all duration-200 ease-linear hover:opacity-60">support@hivebuying.com</Link>.</p>
                <p>Marketing is always opt-in, not automatic.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4 text-foreground">15. Cookies & Analytics</h2>
                <p>HiveBuying uses cookies to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Keep you logged in securely.</li>
                  <li>Analyze usage patterns to improve recommendations.</li>
                  <li>Display relevant offers (if permitted).</li>
                </ul>
                <p>You can turn off cookies anytime in your browser or app settings.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4 text-foreground">16. Contact Us</h2>
                <p>If you have questions, complaints, or requests about this Privacy Policy, contact us:</p>
                <ul className="list-none space-y-2 pl-0">
                  <li>📧 <strong>Email:</strong> <Link href="mailto:support@hivebuying.com" className="text-black underline underline-offset-2 transition-all duration-200 ease-linear hover:opacity-60">support@hivebuying.com</Link></li>
                  <li>📞 <strong>Phone:</strong> +91 9026684646</li>
                  <li>🏢 <strong>Address:</strong> 27th Main Road, HSR Layout, Bengaluru, Karnataka, India</li>
                </ul>
                <div className="mt-4">
                  <p><strong>Grievance Officer (India):</strong></p>
                  <ul className="list-none space-y-2 pl-0 mt-2">
                    <li><strong>Name:</strong> [To be appointed]</li>
                    <li><strong>Email:</strong> <Link href="mailto:grievance@hivebuying.com" className="text-black underline underline-offset-2 transition-all duration-200 ease-linear hover:opacity-60">grievance@hivebuying.com</Link></li>
                    <li><strong>Phone:</strong> +91 9026684646</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4 text-foreground">17. Changes to This Policy</h2>
                <p>We may update this Privacy Policy from time to time. The latest version will always be available at <Link href="https://www.hivebuying.com/privacy" className="text-black underline underline-offset-2 transition-all duration-200 ease-linear hover:opacity-60">https://www.hivebuying.com/privacy</Link>.</p>
                <p>Significant changes will be notified via email or in-app alerts. Your continued use of the platform after updates means you accept the revised terms.</p>
              </section>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}

