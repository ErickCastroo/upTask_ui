function IsLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/2 mb-3"></div>
      <div className="h-3 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="h-10 bg-gray-200 rounded w-1/4 mb-7"></div>

      <div className="h-16 bg-gray-200 rounded w-full mb-5"></div>

      <div className="max-h-[50vh] overflow-y-auto">
        <ul role="list" className="space-y-6 mt-10">
          <li className="flex justify-between gap-x-6 px-5 py-8 bg-white shadow-md rounded-xl border border-gray-100">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto space-y-2">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
export { IsLoading }