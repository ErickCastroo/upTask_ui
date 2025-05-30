import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toast, ToastContainer } from 'react-toastify'

import { RegisterC } from '@/api/Auth'


import { PuserRegistrationForm } from '@/types/index'

const initialValues: PuserRegistrationForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function Register() {

  const { mutate } = useMutation({
    mutationFn: RegisterC,
    onSuccess: () => {
      toast('Verifique su correo', {
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
    },
  })


  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<PuserRegistrationForm>({ defaultValues: initialValues })

  const password = watch('password')

  const navigate = useNavigate()

  const handleRegister = (formData: PuserRegistrationForm) => {
    mutate(formData)
    localStorage.setItem('unverifiedEmail', formData.email)
    reset()
    navigate('/token')
  }
  return (
    <div className="relative min-h-screen bg-cover bg-center bg-[url('./bgAuth.jpg')]">
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

      <div className='absolute inset-0 bg-black/80' />
      <div className='relative z-10 flex items-center justify-center min-h-screen'>
        <div className='bg-black/75 backdrop-blur-md w-1/2 xl:w-1/3 p-8 rounded-xs shadow-lg'>
          <h1 className='text-4xl font-bold text-center mb-4 text-white'>
            Sign Up
          </h1>
          <p className='text-purple-300 flex justify-center'>Already have an account?
            <Link to='/signIn' className='text-purple-500 hover:text-purple-700 ml-2'>
              Sign In
            </Link>
          </p>
          <form
            className='space-y-4'
            onSubmit={handleSubmit(handleRegister)}
          >

            <div>
              <label className={`block mb-2 ${errors.name ? 'text-red-400' : 'text-white'}`}
                htmlFor='email'>Username</label>
              <input
                type='text'
                id='name'
                className='w-full py-2 border-b-1 border-purple-300 text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
                placeholder='Enter your username'
                required
                {...register('name', {
                  required: 'El Nombre de usuario es obligatorio',
                })}
              />
            </div>

            <div>
              <label className={`block mb-2 ${errors.email ? 'text-red-400' : 'text-white'}`}
                htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                className='w-full py-2 border-b-1 border-purple-300 text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
                placeholder='Enter your email'
                required
                {...register('email', {
                  required: 'El Email de registro es obligatorio',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'E-mail no válido',
                  },
                })}
              />

            </div>
            <div>
              <label className={`block mb-2 ${errors.password ? 'text-red-400' : 'text-white'}`}
                htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                className='w-full py-2 border-b-1 border-purple-300 text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
                placeholder='Enter your password'
                required
                {...register('password', {
                  required: 'El Password es obligatorio',
                  minLength: {
                    value: 8,
                    message: 'El Password debe ser mínimo de 8 caracteres'
                  }
                })}
              />
            </div>
            <div>
              <label className={`block mb-2 ${errors.confirmPassword ? 'text-red-400' : 'text-white'}`}
                htmlFor='password'>Confirm Password</label>
              <input
                type='password'
                id='confirmpassword'
                className='w-full py-2 border-b-1 border-purple-300 text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
                placeholder='Confirm your password'
                required
                {...register('confirmPassword', {
                  required: 'Repetir Password es obligatorio',
                  validate: value => value === password || 'Los Passwords no son iguales'
                })}
              />
            </div>
            <button
              type='submit'
              className='md:w-1/3 w-full rounded-md bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4  focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200'
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export { Register }