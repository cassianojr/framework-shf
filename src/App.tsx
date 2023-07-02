import { CssBaseline } from '@mui/material'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Framework from './pages/Framework'
import Guidelines from './pages/Guidelines'
import ViewData from './pages/ViewData'

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/framework" element={<Framework />} />
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/view-data" element={<ViewData />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
