import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";

const FigtreeFont = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HiveBuying - Buy Together & Pay Less",
  description:
    "HiveBuying brings individuals together to buy the same product as a group, helping them pay a much lower price",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PCZ6ZWHP');`,
          }}
        />
        {/* End Google Tag Manager */}
        
        {/* Google Analytics (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-JS4R477PK5"
        />
        <Script
          id="ga-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-JS4R477PK5');`,
          }}
        />
        {/* End Google Analytics */}

        {/* Microsoft Clarity */}
        <Script
          id="clarity-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "uaorc64y46");`,
          }}
        />
        {/* End Microsoft Clarity */}

        {/* Google reCAPTCHA */}
        <Script
          src="https://www.google.com/recaptcha/api.js"
          async
          defer
        />
        {/* End Google reCAPTCHA */}

        <link rel="icon" type="image/webp" href="/favicon-96x96.webp" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.webp" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="description" content="Team Up, Pay Less!" />
        <meta property="og:image" content="/opengraph-image.webp" />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="832" />
        <meta
          property="og:site_name"
          content="HiveBuying — Join the Waitlist"
        />
        <meta
          property="og:url"
          content="https://hivebuying.com/"
        />
        <meta name="twitter:image" content="/twitter-image.webp" />
        <meta name="twitter:image:type" content="image/webp" />
        <meta name="twitter:image:width" content="1280" />
        <meta name="twitter:image:height" content="832" />
      </head>
      <body className={FigtreeFont.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PCZ6ZWHP"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <Toaster richColors position="top-center" />
        <Analytics />
      </body>
    </html>
  );
}
