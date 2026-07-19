import Testimonial from "../Testimonial";
import { CheckCircle2 } from 'lucide-react'
import { useNavigate } from "react-router-dom";
export default function AuthLayout({ children }) {
    const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-slate-50 text-black">
        
      <div className="mx-auto flex min-h-screen max-w-7xl">
           {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-teal-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />
      </div>
        {/* Left Side */}
        <div className="hidden w-1/2 flex-col justify-between px-20 py-10 lg:flex">

      
      <div onClick={()=>navigate('/home')} className="flex items-center gap-2.5 cursor-pointer">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 shadow-md shadow-emerald-500/25">
            <CheckCircle2 className="h-5 w-5 text-white" />
          </div>
          <span className="text-3xl font-bold tracking-tight text-slate-900">Taskify</span>
        </div>

          <div>
            <h1 className="max-w-md text-6xl font-serif leading-tight">
              A calmer way to run your day.
            </h1>

            <p className="mt-8 max-w-lg text-xl text-gray-400">
              Plan sprints, track progress, and keep every teammate aligned —
              all in one beautifully focused workspace.
            </p>

            <Testimonial />
          </div>

          <p className="text-sm text-gray-500">
            © 2026 Taskify Inc.
          </p>

        </div>

        {/* Right */}
        <div className="flex flex-1 items-center justify-center p-6 text-white">
          {children}
        </div>

      </div>
    </div>
  );
}