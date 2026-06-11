import AuthGlobe from "./AuthGlobe";

export default function AuthHero() {
  return (
    <div
      className="
        hidden
        lg:flex
        flex-1
        relative
        border-r
        border-zinc-900
      "
    >
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-black
          via-zinc-950
          to-black
        "
      />

      <div className="absolute inset-0 z-0">
        <AuthGlobe />
      </div>

      <div
        className="
          relative
          z-10
          flex
          flex-col
          justify-start
          min-h-screen
          p-16
        "
      >
        <div>
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-zinc-800
              bg-zinc-950/70
              px-4
              py-2
              text-sm
              backdrop-blur-md
            "
          >
            <div
              className="
                h-2
                w-2
                rounded-full
                bg-emerald-500
                animate-pulse
              "
            />

            Live Translation Platform
          </div>

          <h1
            className="
              mt-10
              text-8xl
              font-bold
              leading-[0.9]
              tracking-tight
            "
          >
            Sign language.
            <br />
            Instantly
            <br />
            understood.
          </h1>

          <p
            className="
              mt-8
              max-w-lg
              text-lg
              text-zinc-400
              leading-relaxed
            "
          >
            Real-time sign language translation
            platform built for education,
            healthcare, workplaces and
            everyday communication.
          </p>

          <div
            className="
              mt-10
              rounded-3xl
              border
              border-zinc-800
              bg-zinc-950/60
              backdrop-blur-xl
              p-5
              max-w-md
            "
          >
            <p className="text-zinc-500 text-sm">
              Live Translation
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <p className="text-xs text-zinc-500">
                  Sign Input
                </p>

                <p className="text-xl font-semibold">
                  HELLO
                </p>
              </div>

              <div>
                <p className="text-xs text-zinc-500">
                  Output
                </p>

                <p className="text-xl font-semibold">
                  Hello
                </p>
              </div>
            </div>
          </div>

          <div
            className="
              mt-10
              grid
              grid-cols-2
              gap-4
              max-w-lg
            "
          >
            <MetricCard
              title="Accuracy"
              value="97.8%"
            />

            <MetricCard
              title="Latency"
              value="<150ms"
            />

            <MetricCard
              title="ASL Classes"
              value="26"
            />

            <MetricCard
              title="Real-Time"
              value="Live"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-950/60
        backdrop-blur-xl
        p-5
      "
    >
      <p
        className="
          text-sm
          text-zinc-500
        "
      >
        {title}
      </p>

      <h3
        className="
          mt-2
          text-3xl
          font-bold
        "
      >
        {value}
      </h3>
    </div>
  );
}

