// url: http://localhost:3000/startup/[id]

import React from 'react'

const page = async ({ params } : { params: Promise<{ id: string }> }) => {

    // get the startup's id
    const id = (await params).id;

  return (
    <>
        <h1 className="text-3xl">This is a startup number : {id}</h1>
    </>
  )
}

export default page