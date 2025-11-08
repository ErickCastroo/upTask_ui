import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toast, ToastContainer } from 'react-toastify'
import { PchangePassword } from '@/types'

import { ForgotPassword } from '@/api/Auth'

const initialValues: PchangePassword = {
  password: '',
  confirmPassword: '',
}

function PasswordForm() {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mutate } = useMutation({

    mutationFn: ForgotPassword,
    onSuccess: () => {
      toast('Verifique su correo', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });

    },
    onError: (error: Error) => {
      toast(`${error.message}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    },
  })


  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<PchangePassword>({ defaultValues: initialValues })

  const password = watch('password')

  const navigate = useNavigate()

  const handleHelp = (formData: PchangePassword) => {
    console.log('Form data:', formData)
    reset()
  }
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />

      <div className='bg-black/75 backdrop-blur-md w-1/2 xl:w-1/3 p-8 rounded-xs shadow-lg'>
        <h1 className='text-4xl font-bold text-center mb-4 text-white'>
          Change Password
        </h1>
        <p className='text-purple-300 flex justify-center'>
          change your password to continue
        </p>
        <form
          className='space-y-4'
          onSubmit={handleSubmit(handleHelp)}
        >
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
            Change Password
          </button>
        </form>
      </div>
    </>
  )
}

export { PasswordForm }