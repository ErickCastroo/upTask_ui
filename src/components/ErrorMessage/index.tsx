function ErrorMessage({children}: {children: React.ReactNode}) {
  return (
    <div className='bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded relative mt-2' role='alert'>
      {children}
    </div>
  )
}

export { ErrorMessage }