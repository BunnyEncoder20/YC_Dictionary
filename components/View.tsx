import React from 'react'

// components import 
import Ping from '@/components/Ping'

// Sanity imports
import { client } from '@/sanity/lib/client'
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries'
import { writeClient } from '@/sanity/lib/write-client'

// utils imports
import { formatViews } from '@/lib/utils'

import { unstable_after as after } from 'next/server'
// current component 
const View = async ({ id }: { id: string }) => {

    const { views: totalViews } = await client.withConfig({ useCdn: false }).fetch(STARTUP_VIEWS_QUERY, {id})

    // update views each time page is visited
    after(async () => await writeClient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit()
    )


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