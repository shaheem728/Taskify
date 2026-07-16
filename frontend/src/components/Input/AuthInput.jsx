import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function AuthInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="mb-5">

      <label className="mb-2 block text-sm">
        {label}
      </label>

      <div className="relative">
        <input
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={(e)=>onChange(e)}
          required={required}
          className="w-full rounded-xl border border-white/10 bg-[#101822] px-4 py-3 pr-12 outline-none focus:border-emerald-400"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-400"
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        )}
      </div>

    </div>
  );
}
