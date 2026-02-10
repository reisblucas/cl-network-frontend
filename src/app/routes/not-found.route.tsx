import { paths } from '@/infra/paths'
import { Link } from 'react-router'

export function NotFoundRoute() {
  return (
    <div className="mt-52 flex flex-col items-center font-semibold">
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to={paths.home.getHref()} replace>
        Go to home
      </Link>
    </div>
  )
}
