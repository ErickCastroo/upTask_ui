import { Routes, BrowserRouter, Route } from 'react-router-dom'

import { Home } from '@/pages/home'
import { Layout } from '@/components/Layout'
import { ProyectCreate } from '@/pages/Project'

function Routers() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} index />
          <Route path='/project/new' element={<ProyectCreate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export { Routers }