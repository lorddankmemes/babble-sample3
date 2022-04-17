
import ChatBody from '../components/chatBody/ChatBody';


export default function Home() {
  return (
    <div className='bg-gray-100 dark:bg-gray-800'>
      <div className='flex flex-1 overflow-hidden h-screen max-w-screen-2xl m-auto'>
        <div className='p-12 lg:p-20 w-full'>
          <ChatBody />
        </div>
      </div>
    </div>
  );
}
