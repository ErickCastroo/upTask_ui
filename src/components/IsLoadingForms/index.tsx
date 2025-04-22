function IsLoadingForm() {
  return (
    <>
      <div className='mb-5 space-y-3 animate-pulse'>
        <div className='h-4 bg-gray-200 rounded w-1/2'></div>
        <div className='h-10 bg-gray-200 rounded'></div>
      </div>

      <div className='mb-5 space-y-3 animate-pulse'>
        <div className='h-4 bg-gray-200 rounded w-1/2'></div>
        <div className='h-10 bg-gray-200 rounded'></div>
      </div>

      <div className='mb-5 space-y-3 animate-pulse'>
        <div className='h-4 bg-gray-200 rounded w-1/2'></div>
        <div className='h-20 bg-gray-200 rounded'></div>
      </div>
    </>
  )
}

export { IsLoadingForm }


