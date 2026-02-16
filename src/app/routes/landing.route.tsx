import { useUser } from '@/auth'
import { Button } from '@/components/ui/button'
import { paths } from '@/infra/paths'
import { Head } from '@/infra/common/seo'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router'

export function LandingRoute() {
  const navigate = useNavigate()
  const user = useUser()

  const handleGettingStarted = () => {
    if (user.data) {
      navigate(paths.app.root.getHref())
    } else {
      navigate(paths.auth.login.getHref())
    }
  }

  return (
    <>
      <Head description="CL Network — Connect, share, and grow with your community." />
      <div className="relative flex min-h-full flex-1 flex-col items-center justify-center overflow-hidden bg-background px-6">
        {/* Minimal network motif — floating nodes with rich colors */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute left-[15%] top-[25%] h-2 w-2 rounded-full bg-[oklch(0.75_0.12_45)]/40" />
          <div className="absolute right-[20%] top-[30%] h-3 w-3 rounded-full bg-[oklch(0.7_0.15_200)]/30" />
          <div className="absolute bottom-[35%] left-[25%] h-2 w-2 rounded-full bg-[oklch(0.8_0.1_280)]/35" />
          <div className="absolute bottom-[30%] right-[30%] h-2.5 w-2.5 rounded-full bg-[oklch(0.65_0.18_30)]/25" />
          <div className="absolute left-1/2 top-[40%] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[oklch(0.6_0.2_45)]/20" />
        </div>

        <main className="relative z-10 flex max-w-2xl flex-col items-center text-center">
          <span className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">CL Network</span>
          <h1 className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Where people
            <br />
            <span className="text-[oklch(0.55_0.18_45)]">connect.</span>
          </h1>
          <p className="mt-6 max-w-md text-base text-muted-foreground sm:text-lg">
            Share ideas, discover perspectives, and grow alongside your community.
          </p>
          <Button
            size="lg"
            onClick={handleGettingStarted}
            className="mt-10 gap-2 bg-[oklch(0.55_0.18_45)] px-8 py-6 text-base font-medium text-white shadow-lg shadow-[oklch(0.55_0.18_45)]/25 transition-all hover:bg-[oklch(0.5_0.18_45)] hover:shadow-[oklch(0.5_0.18_45)]/30"
          >
            Getting Started
            <ArrowRight className="size-4" aria-hidden />
          </Button>
        </main>
      </div>
    </>
  )
}
