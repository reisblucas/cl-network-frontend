import { Button } from '@/components/ui/button'
import { useUser } from '@/auth'
import { paths } from '@/infra/paths'
import { useNavigate } from 'react-router'
import { Head } from '@/infra/common/seo'

export function LandingRoute() {
  const navigate = useNavigate()
  const user = useUser()

  const login = () => {
    if (user.data) {
      navigate(paths.app.root.getHref())
    } else {
      navigate(paths.auth.login.getHref())
    }
  }

  return (
    <>
      <Head description="Welcome to CodeLeap network!" />
      <div>
        <h2>Engage with our community</h2>

        <Button onClick={login}>Login</Button>
      </div>
    </>
  )
}
