import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { toast, ToastContainer } from 'react-toastify'
import { confirmToken } from '@/types'
import { TokenConfirm, RequestNewToken } from '@/api/Auth'
import { PinInput, PinInputField } from '@chakra-ui/pin-input'

const COOLDOWN_SECONDS = 120
const COOLDOWN_KEY = 'resendCooldownExpires'

function PasswordRecoveryToken() {
  const [token, setToken] = useState<confirmToken['token']>('')
  const [cooldown, setCooldown] = useState(0)
  const navigate = useNavigate()

  // 🧠 Al montar, revisar si hay un cooldown activo en localStorage
  useEffect(() => {
    const expiresAt = localStorage.getItem(COOLDOWN_KEY)
    if (expiresAt) {
      const secondsLeft = Math.floor((parseInt(expiresAt) - Date.now()) / 1000)
      if (secondsLeft > 0) {
        setCooldown(secondsLeft)
      } else {
        localStorage.removeItem(COOLDOWN_KEY)
      }
    }
  }, [])

  // 🕒 Disminuir el cooldown cada segundo
  useEffect(() => {
    if (cooldown <= 0) return
    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          localStorage.removeItem(COOLDOWN_KEY)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [cooldown])

  // ✅ Mutación para confirmar token
  const { mutate } = useMutation({
    mutationFn: TokenConfirm,
    onSuccess: () => {
      navigate('/PasswordRecovery')
      toast('token valido', { position: 'top-right', autoClose: 5000, theme: 'dark' })
    },
    onError: (error: Error) => {
      toast(error.message, { position: 'top-right', autoClose: 5000, theme: 'dark' })
    },
  })

  const handleChange = (value: confirmToken['token']) => {
    setToken(value)
  }

  const handleComplete = (value: confirmToken['token']) => {
    mutate({ token: value })
  }

  // 🔁 Pedir nuevo token con cooldown persistente
  const handleRequestNewToken = async () => {
    const email = localStorage.getItem('unverifiedEmail')
    if (!email) {
      toast('No se encontró el correo del usuario.', { theme: 'dark' })
      return
    }

    if (cooldown > 0) {
      toast(`Debes esperar ${cooldown} segundos para volver a solicitar el código.`, {
        theme: 'dark',
      })
      return
    }

    try {
      await RequestNewToken(email)
      toast('Se ha enviado un nuevo código a tu correo.')
      const expiresAt = Date.now() + COOLDOWN_SECONDS * 1000
      localStorage.setItem(COOLDOWN_KEY, expiresAt.toString())
      setCooldown(COOLDOWN_SECONDS)
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast(error.message)
      } else {
        toast('Ocurrió un error desconocido.')
        console.error('Error al solicitar nuevo token:', error)
      }
    }
  }

  return (
    <div className="relative min-h-screen bg-[url('./bgAuth.jpg')] bg-cover bg-center">
      <ToastContainer theme='dark' />
      <div className='absolute inset-0 bg-black/80' />
      <div className='relative z-10 flex items-center justify-center min-h-screen px-4'>
        <div className='backdrop-blur-xl w-full max-w-xl p-8 sm:p-10 rounded-2xl shadow-2xl border border-white/10'>
          <h1 className='text-4xl sm:text-5xl font-extrabold text-white text-center'>
            Confirma tu Cuenta
          </h1>
          <p className='text-base sm:text-xl text-purple-200 text-center mt-6'>
            Ingresa el código que recibiste
            <span className='text-fuchsia-400 font-semibold'> por e-mail</span>
          </p>

          <form className='mt-10 space-y-6' onSubmit={(e) => e.preventDefault()}>
            <label className='block text-white text-lg text-center'>Código de 6 dígitos</label>
            <div className='flex justify-center'>
              <div className='flex flex-wrap justify-center gap-2 sm:gap-3'>
                <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                  {[...Array(6)].map((_, i) => (
                    <PinInputField
                      key={i}
                      className='w-12 h-12 sm:w-14 sm:h-14 text-lg text-center rounded-xl border border-fuchsia-400 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition-all'
                    />
                  ))}
                </PinInput>
              </div>
            </div>
          </form>

          <nav className='mt-10 text-center'>
            <button
              onClick={handleRequestNewToken}
              disabled={cooldown > 0}
              className={`text-sm underline underline-offset-4 transition-colors ${cooldown > 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-purple-200 hover:text-fuchsia-300'
                }`}
            >
              {cooldown > 0
                ? `Espera ${cooldown}s para solicitar otro código`
                : '¿No recibiste el código? Solicitar nuevo'}
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

export { PasswordRecoveryToken }
