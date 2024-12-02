import Image from "next/image";

// components
import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {

  const query = (await searchParams).query;

  // temp data
  const posts = [
    {
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1, name:'Bunny' },
      _id: 1, 
      description: 'This is a Description',
      image: 'https://eu-images.contentstack.com/v3/assets/blt31d6b0704ba96e9d/blt46f496902fa86192/66b48b47e7b54b81809e88c7/News_Image_-_2024-08-07T095607.430.jpg?width=1280&auto=webp&quality=95&format=jpg&disable=upscale',
      category: 'Robots',
      title: 'We Robots'
    }
  ]

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
              posts.map((post: StartupCardType, index: number) => (
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
