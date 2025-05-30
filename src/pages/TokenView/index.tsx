import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { toast, ToastContainer } from 'react-toastify'

import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { confirmToken } from '@/types'
import { TokenConfirm } from '@/api/Auth'

function TokenView() {
  const [token, setToken] = useState<confirmToken['token']>('')

  const { mutate } = useMutation({

    mutationFn: TokenConfirm,
    onSuccess: () => {
      toast('Cuenta creada con exito', {
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

  function handleChange(token: confirmToken['token']): void {
    setToken(token)
  }

  const handleComplete = (token: confirmToken['token']) => {
    mutate({ token })
  }
  return (
    <div className="relative min-h-screen bg-[url('./bgAuth.jpg')] bg-cover bg-center">
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
      <div className="absolute inset-0 bg-black/80" />
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="backdrop-blur-xl w-full max-w-xl p-8 sm:p-10 rounded-2xl shadow-2xl border border-white/10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white text-center tracking-tight drop-shadow-md">
            Confirma tu Cuenta
          </h1>
          <p className="text-base sm:text-xl font-medium text-purple-200 text-center mt-6">
            Ingresa el código que recibiste
            <span className="text-fuchsia-400 font-semibold"> por e-mail</span>
          </p>
          <form className="mt-10 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <label className="block text-white text-lg font-medium text-center">
              Código de 6 dígitos
            </label>
            <div className="flex justify-center">
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                  {[...Array(6)].map((_, i) => (
                    <PinInputField
                      key={i}
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-lg sm:text-xl text-center rounded-xl border border-fuchsia-400 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent transition-all"
                    />
                  ))}
                </PinInput>
              </div>
            </div>
          </form>
          <nav className="mt-10 text-center">
            <Link
              to="/auth/new-code"
              className="text-purple-200 hover:text-fuchsia-300 transition-colors text-sm underline underline-offset-4"
            >
              Solicitar un nuevo Código
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}

export { TokenView }
