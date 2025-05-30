import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { PuserLoginForm } from '@/types/index'
import { LoginC } from '@/api/Auth/index'
import { toast, ToastContainer } from 'react-toastify'


const initialValues: PuserLoginForm = {
  email: '',
  password: '',
}


function Login() {

  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: LoginC,
    onSuccess: () => {
      toast('Bienvenido', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate('/')

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
    },
  })

  const handleLogin = (formData: PuserLoginForm) => {
    mutate(formData)
  }

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-[url('./bgAuth.jpg')]">
      <div className='absolute inset-0 bg-black/80' />
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
      <div className='relative z-10 flex items-center justify-center min-h-screen'>
        <div className='bg-black/75 backdrop-blur-md w-4/5 xl:w-1/3 p-8 rounded-xs shadow-lg'>
          <h1 className='text-4xl font-bold text-center mb-4 text-white'>
            Sign In
          </h1>
          <p className='text-purple-300 mb-1 md:flex md:justify-center'>
            Create your Account
            <Link to='/signUp' className='text-purple-500 hover:text-purple-700 ml-2'>
              Sign Up
            </Link>

          </p>

          <form className='space-y-4' onSubmit={handleSubmit(handleLogin)}>
            <div>
              <label
                className={`block mb-2 ${errors.email ? 'text-red-400' : 'text-white'}`}
                htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                className='w-full py-2 border-b-1 border-purple-300 text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
                placeholder='Enter your email'
                required
                {...register('email', {
                  required: 'El Email es obligatorio',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'E-mail no válido',
                  },
                })}
              />
            </div>
            <div>
              <label className={`block mb-2 ${errors.password ? 'text-red-400' : 'text-white'}`} htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                className='w-full py-2 border-b-1 border-purple-300 text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
                placeholder='Enter your password'
                required
                {...register('password', {
                  required: 'El Password es obligatorio',
                })}
              />
            </div>
            <button
              type='submit'
              className='md:w-1/3 w-full rounded-md bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200'
            >
              Sign In
            </button>
          </form>

          <div className='flex justify-between text-purple-300 mt-16'>
            <Link to='/password' className='text-purple-500 hover:text-purple-700 ml-2'>
              ¿se te olvido la contraseña?
            </Link>
            <Link to='/token' className='text-purple-500 hover:text-purple-700 ml-2'>
              Confirma tu cuenta aqui
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Login }
