import { providers } from 'ethers'
import { ChatProvider } from '../providers/chat-provider'
import { UserProvider } from '../providers/user-provider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return (
    <ChatProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ChatProvider>
  )
}

export default MyApp


