import AddMemberModal from "@/components/admemberModal"
import { Link, useNavigate, useParams } from "react-router-dom"

function TeamProject() {
  const navigate = useNavigate()
  const params = useParams()

  const projectId = params.projectId!

  return (

    <>
      <h1 className='text-5xl font-black'> Administrar Equipo</h1>
      <p className='text-2xl font-light mt-5'>Aministrar el equipo de trabajo</p>
      <nav className='my-5 flex gap-2'>
        <button
          className='bg-indigo-600 text-white px-10 py-3 rounded-lg inline-block hover:bg-indigo-800 transition-colors font-semibold'
          onClick={() => navigate(location.pathname + '?addMember=true')}
        >
          Agregar Usuario
        </button>
        <Link to={`/project/${projectId}`} className='bg-indigo-600 text-white px-10 py-3 rounded-lg inline-block hover:bg-indigo-800 transition-colors font-semibold'>
          Volver
        </Link>
      </nav>
      <AddMemberModal />
    </>
  )
}

export { TeamProject }