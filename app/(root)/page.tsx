import Image from "next/image";

// Sanity imports
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";


// components
import SearchForm from "@/components/SearchForm";
import StartupCard,{ StartupTypeCard } from "@/components/StartupCard";



export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {

  const query = (await searchParams).query;

  // fetch data from sanity 
  const posts = await client.fetch(STARTUPS_QUERY)
  console.log(JSON.stringify(posts , null, 2))

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch Your Startup, <br/> Connect with Entrepreneurs</h1>
        <p className="sub-heading !max-w-3xl">Submit Ideas, Vote on Pitches, and Get Notices in Virtual Competitions !</p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {
            query ? `Showing results for ${query}` : `Latest Startups`
          }
        </p>

        <ul  className="mt-7 card_grid">
          {
            posts?.length>0 ? (
              posts.map((post: StartupTypeCard, index: number) => (
                <StartupCard key={post?._id} post={post}/>
              ))
            ) : (
              <p className="no-results">No startups to show</p>
            )
          }
        </ul>
      </section>

    </>
  );
}
