import { redirect } from 'next/navigation'

const page = () => {
  return (        
    redirect('/meetings/upcoming')
  )
}

export default page