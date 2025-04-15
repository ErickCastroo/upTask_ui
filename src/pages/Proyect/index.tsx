import { Link } from 'react-router-dom'

import { useForm } from 'react-hook-form'

function ProyectCreate() {
  return (
    <>
      <h1 className='text-5xl font-black'> Mis proyectos</h1>
      <Link
        to='/'
        className='bg-purple-600 text-white px-4 py-2 rounded-lg mt-5 inline-block hover:bg-purple-700 transition-colors font-semibold'
      >
        Volver 
      </Link>
    </>
  )
}

export { ProyectCreate }