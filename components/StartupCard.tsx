import React from 'react'

// components
import { Button } from '@/components/ui/button'

// utils 
import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'

const StartupCard = ({ post } : { post: StartTypeCard }) => {

  const { _createdAt, views, author: {_id: authorId, name}, title, category, _id, image, description} = post

  return (
    <li className="startup-card group">

      <div className="flex-between">
        <p className="startup-card_date">
          { formatDate(_createdAt) }
        </p>

        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{ views }</span>
        </div>
      </div>


      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">

          {/* Author name */}
          <Link href={`/user/${authorId?._id}`}>
            <p className="text-16-medium line-clamp-1">
              { name }
            </p>
          </Link>

          {/* Startup name */}
          <Link href={'/startup/${_id}'}>
            <h3 className="text-26-semibold link-clamp-1">
              { title }
            </h3>
          </Link>
        </div>

        {/* user profile image */}
        <Link href={`/user/${authorId?._id}`}>
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

        <div className="flex-between mt-5 gap-3">

          {/* Startup card category */}
          <Link href={`/?query=${category.toLowerCase()}`}>
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
      </Link>
    </li>
  )
}

export default StartupCard