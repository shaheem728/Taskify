export default function AuthCard({
  title,
  subtitle,
  active,
  onChange,
  children,
}) {
  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0b1118] p-8">

      <div className="w-[70%] mb-8 flex rounded-xl bg-[#131b27] p-1">

        <button
          onClick={() => onChange("login")}
          className={`flex-1 rounded-lg py-2 transition ${
            active === "login"
              ? "bg-emerald-400 text-black"
              : "text-gray-400"
          }`}
        >
          Sign in
        </button>

        <button
          onClick={() => onChange("register")}
          className={`flex-1 rounded-lg py-2 transition ${
            active === "register"
              ? "bg-emerald-400 text-black"
              : "text-gray-400"
          }`}
        >
          Create account
        </button>

      </div>

      <h2 className="text-4xl font-serif">
        {title}
      </h2>

      <p className="mt-2 text-gray-400">
        {subtitle}
      </p>

      {children}
    </div>
  );
}