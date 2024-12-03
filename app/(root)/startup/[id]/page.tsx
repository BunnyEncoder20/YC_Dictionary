// url: http://localhost:3000/startup/[id]

import React from 'react';
import { notFound } from 'next/navigation';

// export flag for PPR
export const experimental_ppr = true;

// sanitry imports
import { client } from '@/sanity/lib/client';
import { STARTUPS_BY_ID_QUERY } from '@/sanity/lib/queries';


// component
const page = async ({ params } : { params: Promise<{ id: string }> }) => {

    // get the startup's id
    const id = (await params).id;

    // fetching post 
    const post = await client.fetch(STARTUPS_BY_ID_QUERY, {id});
    if (!post) {
        return notFound(); // 404 page coming from next/navigation
    }

  return (
    <>
        <h1 className="text-3xl">{ post.title }</h1>
    </>
  )
}

export default page