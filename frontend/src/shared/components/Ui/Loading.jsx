import React from 'react'

const Loading = () => {
  return (
   <div className='flex flex-col items-center justify-center rounded-xl border border-slate-200  py-16 mt-4 text-center'>
   <div className='h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-primary' />
    <p className='mt-3 text-sm text-slate-500'>Loading...</p>
  </div>
  )
}

export default Loading
