export const experimental_ppr = true;

import React, { Suspense } from 'react'
import Image from 'next/image';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';

// components imports 
import UserStartups from '@/components/UserStartups';

// sanity imports
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries';



// current comp
const page = async ({ params }: { params: Promise<{ id: string }> }) => {

    const id  = (await params).id;
    const session = await auth();

    const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

    if (!user) {
        return notFound();
    }

  return (
    <>
        <section className="profile_container">

            {/* Pink Container section */}
            <div className="profile_card">

                {/* Name */}
                <div className="profile_title">
                    <h3 className="text-24-black uppercase text-center line-clamp-1">
                        { user.name }
                    </h3>
                </div>

                {/* profile image */}
                <Image 
                    src={ user.image }
                    alt ={ user.image }
                    width={ 220 }
                    height={ 220 }
                    className="profile_image"
                />

                {/* github username */}
                <p className='text-30-extrabold mt-7 text-center'>
                    @{ user?.username }
                </p>

                {/* github bio */}
                <p className="mt-1 text-center text-14-normal">
                    { user?.bio }
                </p>
            </div>

            {/* below the pink container */}
            <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
                <p className="text-30-bold">
                    { session?.id === id ? "Your" : "All" } Startups
                </p>

                {/* list of author startups or all startups */}
                <ul className="card_grid-sm">
                    <Suspense fallback={<p>Loading...</p>}>
                        <UserStartups id={ id } />
                    </Suspense>
                </ul>
            </div>
        </section>
    </>
  )
}

export default page