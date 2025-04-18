import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <h1 className='text-5xl font-black'> Mis proyectos</h1>
      <p className='text-xl font-light text-gray-500 mt-5'>Administra tus proyectos</p>
      <Link
        to='/project/new'
        className='bg-purple-600 text-white px-4 py-2 rounded-lg mt-5 inline-block hover:bg-purple-700 transition-colors font-semibold'
      >
        Crear Proyecto
      </Link>
    </>
  )
}

export { Home } 