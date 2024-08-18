import { auth } from '@/auth';
import React from 'react'

const UserSettings = async () => {
  
  const session = await auth();

  return (
    <div>{session?.user.id}</div>
  )
}

export default UserSettings