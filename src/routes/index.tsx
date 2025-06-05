import { Routes, BrowserRouter, Route } from 'react-router-dom'

import { Home } from '@/pages/home'
import { Layout } from '@/components/Layout'
import { ProjectCreate } from '@/pages/Project'
import { ProjectEdit } from '@/pages/Project/projectEdit'
import { ProjectDetails } from '@/pages/Project/projectDetails'
import { TeamProject } from '@/pages/Team/'

import { Profile } from '@/pages/Profile'
import { Login } from '@/pages/signIn'
import { Register } from '@/pages/signUp'
import { TokenView } from '@/pages/TokenView'
import { PasswordRecoveryToken } from '@/components/RecoveryPToken'
import { ForgotPasswordView } from '@/pages/passwordRecoverToken'

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} index />
          <Route path='/project/new' element={<ProjectCreate />} />
          <Route path='/project/:projectId' element={<ProjectDetails />} />
          <Route path='/project/:projectId/edit' element={<ProjectEdit />} />
          <Route path='/project/:projectId/team' element={<TeamProject />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<h1 className='text-9xl text-purple-600'>404 Not Found</h1>} />
        </Route>
        <Route>
          <Route path='/signIn' element={<Login />} index />
          <Route path='/signUp' element={<Register />} />
          <Route path='/token' element={<TokenView />} />
          <Route path='/passwordRecoveryToken' element={<PasswordRecoveryToken />} />
          <Route path='/passwordRecovery' element={<ForgotPasswordView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export { Routers }