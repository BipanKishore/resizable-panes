import React, {useEffect, useState} from 'react'

export const Loading = () => {
  const [isLoading, setIsLoading] = useState(true)
  // const [isRendering, setIsRendering] = useState(true)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  //   setIsLoading(true)
  //   setTimeout(() => setIsRendering(false), 3000)

  return (
    <div className="d-flex text-align-center">
      {
                isLoading
                  ? <h2 data-cy="loading" >Loading . . .</h2>
                  : <h2 data-cy="loaded" >.</h2>
    }
      <br />

      {/* {
                isRendering
                  ? <h2 data-cy="rendering" >Rendering . . .</h2>
                  : <h2 data-cy="noRendering" >.</h2>
    } */}
    </div>
  )
}
