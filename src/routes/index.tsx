import { Routes, BrowserRouter, Route } from 'react-router-dom'

import { Home } from '@/pages/home'
import { Layout } from '@/components/Layout'

function Routers() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} index />
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export { Routers }