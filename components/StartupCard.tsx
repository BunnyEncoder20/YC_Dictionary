import React from 'react'

// components
import { Button } from '@/components/ui/button'

// utils 
import Link from 'next/link'
import Image from 'next/image'
import { formatDate,formatViews } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'

// Sanity Type Gen
import { Startup, Author } from '@/sanity/types'
export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author}


const StartupCard = ({ post } : { post: StartupTypeCard }) => {

  const { _createdAt, views, author, title, category, _id, image, description} = post

  return (
    <li className="startup-card group">

      {/* Startup date and views */}
      <div className="flex-between">
        <p className="startup-card_date">
          { formatDate(_createdAt) }
        </p>

        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{ views ? (formatViews(views)) : ("HOT") }</span>
        </div>
      </div>


      {/* Author, startup , profile image */}
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">

          {/* Author name */}
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">
              { author?.name }
            </p>
          </Link>

          {/* Startup name */}
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold link-clamp-1">
              { title }
            </h3>
          </Link>
        </div>

        {/* user profile image */}
        <Link href={`/user/${author?._id}`}>
          <Image src="https://placehold.co/48x48" alt="placeholder" width={48} height={48} className="rounded-full"/>
        </Link>
      </div>

      {/* Startup detials */}
      <Link href={`/startup/${_id}`}>

        {/* startup card description */}
        <p className="startup-card_desc">
          { description }
        </p>

        {/* startup card image */}
        <img src={image} alt='placeholder' className="startup-card_img"/>
      </Link>

      <div className="flex-between mt-5 gap-3">

        {/* Startup card category */}
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">
            { category }
          </p>
        </Link>

        {/* Startup card detials button */}
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>
            Details
          </Link>
        </Button>
      </div>
    </li>
  )
}

export default StartupCard