import React from 'react'

// next  imports 
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

// components imports 
import StartupForm from '@/components/StartupForm'


const page = async () => {

    const session = await auth();
    if (!session ) {
        redirect('/');
    }

  return (
    <>
        <section className="pink_container !min-h-[230px]">
            <h1 className="heading">Submit your Startup</h1>
        </section>

        <StartupForm />
    </>
  )
}

export default page