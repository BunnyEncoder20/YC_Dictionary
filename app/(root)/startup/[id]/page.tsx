// url: http://localhost:3000/startup/[id]

import React,{ Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import markdownit from 'markdown-it';
const md = markdownit();

// export flag for PPR
// export const experimental_ppr = true;

// sanitry imports
import { client } from '@/sanity/lib/client';
import { STARTUPS_BY_ID_QUERY } from '@/sanity/lib/queries';

// utils
import { formatDate } from '@/lib/utils';

// components 
import View from '@/components/View';





// component
const page = async ({ params } : { params: Promise<{ id: string }> }) => {

    // get the startup's id
    const id = (await params).id;

    // fetching post 
    const post = await client.fetch(STARTUPS_BY_ID_QUERY, {id});
    if (!post) {
        return notFound(); // 404 page coming from next/navigation
    }
    const parsedContent = md.render( post?.pitch || '' );

  return (
    <>
        {/* pink container */}
        <section className="pink_container !min-h-[230px]">
            <p className="tag">
                { formatDate( post?._createdAt ) }
            </p>
            <h1 className="heading">
                { post.title }
            </h1>
            <p className="sub-heading !max-w-5xl"> 
                { post.description }
            </p>
        </section>

        {/* startup details */}
        <section className="section_container">
            <img src={post.image} alt="startup thumbnail" className="w-full h-auto rounded-xl"/>
            <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                <div className="flex-between gap-5">
                    <Link href={`/user/${post.author?._id}`} className="flex gap-2 items-center mb-3">
                        <Image src={post.author.image} alt="author avatar" width={64} height={64} className="w-15 h-16 rounded-full drop-shadow-lg"/>

                        <div>
                            <p className="text-20-medium">{ post.author.name }</p>
                            <p className="text-16-medium !text-black-300">@{ post.author.username }</p>
                        </div>
                    </Link>    

                    <p className="category-tag">{ post.category }</p>
                </div>    

                <h3 className="text-30-bold"> Startup Details </h3>
                { parsedContent ? (
                    <article dangerouslySetInnerHTML={{ __html: parsedContent }} className="prose max-w-4xl font-work-sans break-all"/>
                ) : (
                    <p className="no-result">
                        No details provided
                    </p>
                ) }
            </div> 

            <hr className="divider" />

            {/* TODO: Editor Selected Startups */}
            <Suspense fallback={ <Skeleton className="view_skeleton"/> }>
                <View id={id} />
            </Suspense>
        </section>
    </>
  )
}

export default page