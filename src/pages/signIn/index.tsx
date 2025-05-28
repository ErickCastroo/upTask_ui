import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className="relative min-h-screen bg-cover bg-center bg-[url('./bgAuth.jpg')]">
      <div className='absolute inset-0 bg-black/80' />

      <div className='relative z-10 flex items-center justify-center min-h-screen'>
        <div className='bg-black/75 backdrop-blur-md w-4/5 xl:w-1/3 p-8 rounded-xs shadow-lg'>
          <h1 className='text-4xl font-bold text-center mb-4 text-white'>
            Sign In
          </h1>
          <p className='text-purple-300 mb-1 md:flex md:justify-center'>Create you Account
            <Link to='/signUp' className='text-purple-500 hover:text-purple-700 ml-2'>
              Sign Up
            </Link>
          </p>
          <form className='space-y-4'>

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
            <button
              type='submit'
              className=' md:w-1/3 w-full rounded-md bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4  focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200'
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>

  )
}

export { Login }


