import { Link, Outlet, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { Logo } from '@/components/Logo'
import { NavMenu } from '@/components/Menu'

import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '@/hook/useAuth'

function Layout() {

  const { data, isLoading, isError } = useAuth()

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500'></div>
      </div>
    )
  }

  if (isError) {
    return <Navigate to='signIn' />
  }

  if (!data) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='text-red-500'>No se encontró el usuario</div>
      </div>
    )
  }

  return (
    <>
      <header className='bg-indigo-800 p-1'>
        <div className='max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center'>
          <div className='w-64'>
            <Link to='/' className='flex items-center'>
              <Logo />
            </Link>
          </div>
          <NavMenu 
            name={data.name}
          />
        </div>
      </header>

      <section className='max-w-screen-2xl mx-auto mt-10'>
        <Outlet />
      </section>

      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme='light'
      />
    </>
  )
}

export { Layout }