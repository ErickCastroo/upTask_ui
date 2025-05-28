import { Link } from 'react-router-dom'
function Register() {
  return (
    <div className="relative min-h-screen bg-cover bg-center bg-[url('./bgAuth.jpg')]">
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
          <form className='space-y-4'>

            <div>
              <label className='block text-white mb-2' htmlFor='email'>Username</label>
              <input
                type='text'
                id='email'
                className='w-full py-2 border-b-1 border-purple-300 text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
                placeholder='Enter your username'
                required
              />
            </div>

            <div>
              <label className='block text-white mb-2' htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                className='w-full py-2 border-b-1 border-purple-300 text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
                placeholder='Enter your email'
                required
              />
            </div>
            <div>
              <label className='block text-white mb-2' htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                className='w-full py-2 border-b-1 border-purple-300 text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
                placeholder='Enter your password'
                required
              />
            </div>
            <div>
              <label className='block text-white mb-2' htmlFor='password'>Confirm Password</label>
              <input
                type='password'
                id='confirmpassword'
                className='w-full py-2 border-b-1 border-purple-300 text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
                placeholder='Confirm your password'
                required
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