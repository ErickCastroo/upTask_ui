import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { Logo } from '@/components/Logo'
import { NavMenu } from '@/components/Menu'

import 'react-toastify/dist/ReactToastify.css'

function Layout() {
  return (
    <>
      <header className='bg-indigo-800 p-1'>
        <div className='max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center'>
          <div className='w-64'>
            <Logo />
          </div>
          <NavMenu />
        </div>
      </header>

      <section className='max-w-screen-2xl mx-auto mt-10 ml-10'>
        <Outlet />
      </section>

      <ToastContainer

      />
    </>
  )
}

export { Layout }