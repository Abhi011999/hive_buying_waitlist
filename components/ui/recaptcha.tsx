"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

interface ReCaptchaProps {
  onVerify: (token: string) => void;
  onExpired?: () => void;
  onError?: () => void;
  theme?: "light" | "dark";
  size?: "normal" | "compact";
}

export interface ReCaptchaRef {
  reset: () => void;
  getResponse: () => string | null;
}

export const ReCaptcha = forwardRef<ReCaptchaRef, ReCaptchaProps>(
  ({ onVerify, onExpired, onError, theme = "light", size = "normal" }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<number | null>(null);

    useImperativeHandle(ref, () => ({
      reset: () => {
        if (widgetIdRef.current !== null && window.grecaptcha) {
          window.grecaptcha.reset(widgetIdRef.current);
        }
      },
      getResponse: () => {
        if (widgetIdRef.current !== null && window.grecaptcha) {
          return window.grecaptcha.getResponse(widgetIdRef.current);
        }
        return null;
      },
    }));

    useEffect(() => {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      
      if (!siteKey) {
        console.error("reCAPTCHA site key is not configured");
        return;
      }

      const loadRecaptcha = () => {
        if (containerRef.current && window.grecaptcha && window.grecaptcha.render) {
          try {
            widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
              sitekey: siteKey,
              theme,
              size,
              callback: onVerify,
              "expired-callback": onExpired,
              "error-callback": onError,
            });
          } catch (error) {
            console.error("Error rendering reCAPTCHA:", error);
          }
        }
      };

      if (window.grecaptcha && window.grecaptcha.render) {
        loadRecaptcha();
      } else {
        // Wait for the grecaptcha script to load
        const interval = setInterval(() => {
          if (window.grecaptcha && window.grecaptcha.render) {
            loadRecaptcha();
            clearInterval(interval);
          }
        }, 100);

        return () => clearInterval(interval);
      }
    }, [onVerify, onExpired, onError, theme, size]);

    return <div ref={containerRef} />;
  }
);

ReCaptcha.displayName = "ReCaptcha";

// Type declaration for grecaptcha
declare global {
  interface Window {
    grecaptcha: {
      render: (
        container: HTMLElement,
        parameters: {
          sitekey: string;
          theme?: "light" | "dark";
          size?: "normal" | "compact";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        }
      ) => number;
      reset: (widgetId: number) => void;
      getResponse: (widgetId: number) => string;
    };
  }
}

