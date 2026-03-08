"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getSitterSummary } from "@/lib/mockData";

type Step = 1 | 2 | 3;

export default function ClaimProfilePage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "1";
  const sitter = getSitterSummary(id);

  const [step, setStep] = useState<Step>(1);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // ── Phone step ──
  const cleanPhone = phone.replace(/\D/g, "");
  const phoneValid = cleanPhone.length === 10;

  const handleSendCode = () => {
    if (!phoneValid) {
      setPhoneError("Please enter a valid 10-digit US phone number.");
      return;
    }
    setPhoneError("");
    setStep(2);
  };

  // ── OTP step ──
  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (text.length > 0) {
      const next = [...otp];
      for (let i = 0; i < 6; i++) next[i] = text[i] ?? "";
      setOtp(next);
      otpRefs.current[Math.min(text.length, 5)]?.focus();
    }
    e.preventDefault();
  };

  const otpFilled = otp.every((d) => d !== "");

  const handleVerify = () => {
    if (!otpFilled) {
      setOtpError("Please enter the full 6-digit code.");
      return;
    }
    setOtpError("");
    setStep(3);
  };

  const formatPhone = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  // ── Step indicator ──
  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-8">
      {[1, 2, 3].map((n) => (
        <div key={n} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
              step > n
                ? "bg-trust-green text-white"
                : step === n
                ? "bg-navy text-white"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            {step > n ? (
              <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              n
            )}
          </div>
          {n < 3 && (
            <div
              className={`w-10 h-0.5 ${step > n ? "bg-trust-green" : "bg-gray-200"}`}
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <main className="max-w-md mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
        <Link href={`/sitter/${id}`} className="hover:text-trust-green transition-colors">
          {sitter.name}
        </Link>
        <span>/</span>
        <span className="text-gray-600">Claim Profile</span>
      </nav>

      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center mx-auto mb-3">
          <span className="text-white text-xl font-bold">{sitter.initials}</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Claim This Profile</h1>
        <p className="text-gray-500 text-sm mt-1">
          Verify your identity to take ownership of{" "}
          <span className="font-medium text-gray-700">{sitter.name}</span>&apos;s profile.
        </p>
      </div>

      <StepIndicator />

      {/* ─────────── Step 1: Phone ─────────── */}
      {step === 1 && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-1">Enter your phone number</h2>
          <p className="text-sm text-gray-500 mb-5">
            We&apos;ll send a 6-digit verification code via SMS. Standard rates apply.
          </p>

          <div className="flex gap-2">
            <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 shrink-0">
              +1
            </div>
            <input
              type="tel"
              inputMode="numeric"
              value={formatPhone(phone)}
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, "").slice(0, 10);
                setPhone(raw);
                if (phoneError) setPhoneError("");
              }}
              placeholder="(555) 000-0000"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-trust-green placeholder-gray-400"
            />
          </div>

          {phoneError && (
            <p className="text-xs text-red-500 mt-2">{phoneError}</p>
          )}

          <button
            type="button"
            onClick={handleSendCode}
            className="mt-5 w-full bg-navy text-white font-semibold py-3 rounded-lg hover:bg-navy-dark transition-colors"
          >
            Send Verification Code
          </button>

          <p className="text-xs text-gray-400 text-center mt-4">
            By continuing, you agree to our Terms of Service and confirm this is your phone number.
          </p>
        </div>
      )}

      {/* ─────────── Step 2: OTP ─────────── */}
      {step === 2 && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-1">Enter the verification code</h2>
          <p className="text-sm text-gray-500 mb-6">
            We sent a 6-digit code to{" "}
            <span className="font-medium text-gray-700">+1 {formatPhone(phone)}</span>.
          </p>

          {/* OTP boxes */}
          <div className="flex gap-2 justify-center mb-4">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { otpRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(i, e)}
                onPaste={i === 0 ? handleOtpPaste : undefined}
                className="w-11 h-13 border-2 border-gray-300 rounded-lg text-center text-xl font-bold text-gray-900 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/20 transition-colors"
                style={{ height: "52px" }}
                aria-label={`Digit ${i + 1}`}
              />
            ))}
          </div>

          {otpError && (
            <p className="text-xs text-red-500 text-center mb-2">{otpError}</p>
          )}

          <button
            type="button"
            onClick={handleVerify}
            className="w-full bg-navy text-white font-semibold py-3 rounded-lg hover:bg-navy-dark transition-colors"
          >
            Verify &amp; Claim Profile
          </button>

          <div className="text-center mt-4 space-y-2">
            <button
              type="button"
              onClick={() => {
                setOtp(["", "", "", "", "", ""]);
                setOtpError("");
              }}
              className="text-xs text-trust-green hover:underline block w-full"
            >
              Resend code
            </button>
            <button
              type="button"
              onClick={() => { setStep(1); setOtp(["", "", "", "", "", ""]); setOtpError(""); }}
              className="text-xs text-gray-400 hover:text-gray-600 block w-full"
            >
              ← Change phone number
            </button>
          </div>
        </div>
      )}

      {/* ─────────── Step 3: Success ─────────── */}
      {step === 3 && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-trust-green-light flex items-center justify-center mx-auto mb-5">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 2L4 5.5V11C4 15.55 7.34 19.74 12 21C16.66 19.74 20 15.55 20 11V5.5L12 2Z"
                fill="#16A34A"
                opacity="0.2"
              />
              <path
                d="M12 2L4 5.5V11C4 15.55 7.34 19.74 12 21C16.66 19.74 20 15.55 20 11V5.5L12 2Z"
                stroke="#16A34A"
                strokeWidth="1.5"
              />
              <path
                d="M9 12l2 2 4-4"
                stroke="#16A34A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Claimed!</h2>
          <p className="text-gray-600 text-sm mb-6 max-w-xs mx-auto">
            You&apos;ve successfully claimed <strong>{sitter.name}</strong>&apos;s profile.
            You can now add a bio, upload a photo, and respond to reviews.
          </p>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              className="w-full bg-trust-green text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Go to Your Dashboard
            </button>
            <Link
              href={`/sitter/${id}`}
              className="w-full border-2 border-navy text-navy font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              View Your Profile
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
