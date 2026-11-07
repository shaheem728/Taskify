export default function AuthCard({
  title,
  subtitle,
  active,
  onChange,
  children,
}) {
  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0b1118] p-8">
      <h2 className="text-4xl font-serif">
        {title}
      </h2>

      <p className="mt-2 text-gray-400">
        {subtitle}
      </p>

      {children}

      {active !== "forgot-password" && (
        <div className="mt-4 border-t border-white/10 pt-4 text-center">
          <p className="text-sm text-gray-400">
            {active === "login"
              ? "Want to create your own organization?"
              : "Already have an organization account?"}
          </p>

          <button
            type="button"
            onClick={() =>
              onChange(active === "login" ? "register" : "login")
            }
            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
          >
            {active === "login"
              ? "Create an organization"
              : "Sign in to your account"}

            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}

    </div>
  );
}