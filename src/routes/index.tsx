import { Routes, BrowserRouter, Route } from 'react-router-dom'

import { Home } from '@/pages/home'
import { Layout } from '@/components/Layout'
import { ProjectCreate } from '@/pages/Project'
import { ProjectEdit } from '@/pages/Project/projectEdit'
import { ProjectDetails } from '@/pages/Project/projectDetails'

function Routers() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} index />
          <Route path='/project/new' element={<ProjectCreate />} />
          <Route path='/project/:projectId' element={<ProjectDetails />} />
          <Route path='/project/:projectId/edit' element={<ProjectEdit />} />
          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export { Routers }