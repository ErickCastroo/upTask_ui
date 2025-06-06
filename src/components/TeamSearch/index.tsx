import { useMutation } from '@tanstack/react-query'
import { TeamMember } from '@/types'
import { addUserMember } from '@/api/Team'
import { useParams } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify'


type TeamSearchProps = {
  user: TeamMember
};

function TeamSearch({ user }: TeamSearchProps) {

  const params = useParams()
  const projectId = params.projectId!

  const { mutate } = useMutation({
    mutationFn: addUserMember,
    onSuccess: () => {
      toast('Usuario Inivtado', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

    },
    onError: (error: Error) => {
      toast(`${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.error('Error adding user:', error)
    },
  })


  const handleAddUser = () => {
    const data = {
      projectId,
      id: user.user._id
    }
    mutate(data)
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className='mt-5 backdrop-blur-sm bg-white/70 border border-white/30 shadow-xl rounded-2xl p-6 text-center space-y-5'>
        <h2 className='text-2xl font-bold text-gray-800'>
          👤 Usuario encontrado
        </h2>

        <div className='text-lg font-medium text-gray-700 bg-white rounded-xl py-3 px-5 shadow-sm'>
          {user.user.name}
        </div>

        <button
          onClick={handleAddUser}
          className='w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-3 rounded-xl transition-all shadow-md'
        >
          Agregar Usuario
        </button>
      </div>
    </>
  )
}

export { TeamSearch }

