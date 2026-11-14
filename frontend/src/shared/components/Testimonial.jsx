export default function Testimonial() {
  return (
    <div className="mt-16 rounded-3xl border border-white/10 bg-[#0d131d] p-6">

      <div className="flex items-center gap-4">

        <div className="h-12 w-12 rounded-full bg-emerald-900" />

        <div>

          <h4 className="font-semibold text-white">
            Ava Chen · Product Lead
          </h4>

          <p className="text-sm text-gray-400">
            Nova Labs
          </p>

        </div>

      </div>

      <p className="mt-6 text-gray-400">
        "Taskify replaced three tools for us. Our weekly reviews take
        15 minutes instead of an hour."
      </p>

    </div>
  );
}