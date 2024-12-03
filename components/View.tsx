import React from 'react'

// components import 
import Ping from '@/components/Ping'

// Sanity imports
import { client } from '@/sanity/lib/client'
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries'

// utils imports
import { formatViews } from '@/lib/utils'

// current component 
const View = async ({ id }: { id: string }) => {

    const { views: totalViews } = await client.withConfig({ useCdn: false }).fetch(STARTUP_VIEWS_QUERY, {id})

    // TODO: Add live view updation


  return (
    <div className="view-container">

      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">{ formatViews(totalViews) }</span>
      </p>
    </div>
  )
}

export default View