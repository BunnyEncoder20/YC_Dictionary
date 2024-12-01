import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {auth, signIn ,signOut} from '@/auth'

const Navbar = async () => {

    const session = await auth()    

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans font-bold">
        <nav className='flex justify-between items-center'>
            <Link href="/">
                <Image src="/logo.png" alt="logo" height={30} width={144} />
            </Link>

            <div className="flex items-center gap-5 text-black">
                { session && session?.user ? 
                    (
                        // user is logged in
                        <>
                            {/* create new post */}
                            <Link href="/startup/create">
                                <span>Create</span>
                            </Link>

                            {/* signout button */}
                            <form action={async () => {
                                "use server"
                                await signOut({ redirectTo:'/'});
                            }}>
                                <button type='submit'>Logout</button>
                            </form>

                            {/* User profile */}
                            <Link href={`/user/${session?.user?.id}`}>
                                <span>{session?.user?.name}</span>
                            </Link>

                        </>

                    ) : (
                        
                        // user not logged in
                        <>
                            <form action={async () => {
                                "use server"
                                await signIn('github')
                            }}>
                                <button type='submit'>Login</button>
                            </form>
                        </>
                    )
                }
            </div>
        </nav>
    </header>
  )
}

export default Navbar