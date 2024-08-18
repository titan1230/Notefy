import { auth } from '@/auth';
import React from 'react'

interface Props {
  params: {
    userID: string
  }
}

const UserProfilePage = async ({ params }: Props) => {

  const session = await auth();

  return (
    <div>{session?.user.id}</div>
  )
}

export default UserProfilePage;