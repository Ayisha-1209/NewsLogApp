import React from 'react'

function Container({children}) {
  return <div className='w-full max-w-screen-lg mx-auto px-4 sm:px-0 my-2'>{children}</div>;
  
}

export default Container