import { UserProvider } from '../providers/user-provider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp

