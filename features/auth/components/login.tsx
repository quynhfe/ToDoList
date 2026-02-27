import { ArrowLeft, Check, Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="min-h-screen bg-[#101c22] text-slate-100 font-sans flex flex-col items-center relative overflow-hidden">
      {/* Header */}
      <div className="w-full max-w-md px-4 py-4 flex items-center justify-between relative z-10">
        <button className="p-2 rounded-full hover:bg-slate-800 transition-colors">
          <ArrowLeft className="w-6 h-6 text-slate-100" />
        </button>
        <h1 className="text-lg font-bold absolute left-1/2 -translate-x-1/2">
          Welcome Back
        </h1>
        <div className="w-10"></div> {/* Spacer for alignment */}
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md px-6 flex flex-col items-center mt-8 flex-1">
        {/* Logo */}
        <div className="mb-6 p-4 bg-[#13a4ec]/20 rounded-2xl">
          <Check
            className="w-10 h-10 text-[#13a4ec]"
            strokeWidth={3}
          />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-2">Log In</h2>
        <p className="text-slate-400 mb-8">Manage your tasks efficiently</p>

        {/* Form */}
        <div className="w-full space-y-5">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">
              Username or Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-4 py-3.5 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#13a4ec]/50 transition-all"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-4 py-3.5 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#13a4ec]/50 transition-all pr-12"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button className="text-[#13a4ec] text-sm font-medium hover:underline">
              Forgot Password?
            </button>
          </div>

          {/* Remember Me & Login Button */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div
                className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer transition-colors ${rememberMe ? "bg-[#13a4ec] border-[#13a4ec]" : "border-slate-600 bg-[#1e293b]"}`}
                onClick={() => setRememberMe(!rememberMe)}>
                {rememberMe && (
                  <Check
                    size={14}
                    className="text-white"
                  />
                )}
              </div>
              <label
                className="text-sm text-slate-300 cursor-pointer select-none"
                onClick={() => setRememberMe(!rememberMe)}>
                Remember Password
              </label>
            </div>

            <button className="w-full bg-[#13a4ec] hover:bg-[#1192d4] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#13a4ec]/20 transition-all active:scale-[0.98]">
              Log In
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full flex items-center my-8">
          <div className="flex-1 h-px bg-slate-800"></div>
          <span className="px-4 text-sm text-slate-500 font-medium">
            Or continue with
          </span>
          <div className="flex-1 h-px bg-slate-800"></div>
        </div>

        {/* Social Login */}
        <div className="w-full grid grid-cols-2 gap-4 mb-8">
          <button className="flex items-center justify-center gap-2 bg-[#1e293b] border border-slate-700 hover:bg-slate-800 py-3.5 rounded-xl transition-colors">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"></path>
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"></path>
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z"
                fill="#FBBC05"></path>
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                fill="#EA4335"></path>
            </svg>
            <span className="text-sm font-semibold text-white">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 bg-[#1e293b] border border-slate-700 hover:bg-slate-800 py-3.5 rounded-xl transition-colors">
            <svg
              className="w-5 h-5 fill-white"
              viewBox="0 0 24 24">
              <path d="M17.05 20.28c-.98.95-2.05 1.78-3.08 1.72-1.03-.06-1.36-.67-2.55-.67-1.19 0-1.57.65-2.53.67-1.03.02-2.13-.85-3.13-1.78C3.69 18.23 2 15.02 2 11.97c0-3.14 2.02-4.8 4.02-4.8 1.01 0 1.97.68 2.58.68.62 0 1.65-.72 2.84-.72 1.48 0 2.61.54 3.41 1.63-3.14 1.83-2.63 6.07.5 7.33-.67 1.64-1.63 3.32-3.3 4.19zM12.03 7.25c-.02-2.13 1.75-3.95 3.8-4.08.18 2.37-2.22 4.31-3.8 4.08z"></path>
            </svg>
            <span className="text-sm font-semibold text-white">Apple</span>
          </button>
        </div>

        {/* Footer */}
        <div className="pb-8 mt-auto">
          <p className="text-slate-400 text-sm">
            Don&apos;t have an account?{" "}
            <a
              href="#"
              className="text-[#13a4ec] font-bold hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
