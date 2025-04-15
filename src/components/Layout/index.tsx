import { Outlet } from 'react-router-dom'

import { Logo } from '@/components/Logo'

function Layout() {
  return (
    <>
      <header className='bg-indigo-800 p-5'>
        <div className='max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center'>
          <div className='w-64'>
            <Logo />
          </div>
        </div>
      </header>

      <section className='max-w-screen-2xl mx-auto mt-10 ml-10'>
        <Outlet />
      </section>
    </>
  )
}

export { Layout }