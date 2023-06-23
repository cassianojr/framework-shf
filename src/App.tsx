import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { CssBaseline } from '@mui/material'
import Framework from './pages/Framework'
import Guidelines from './pages/Guidelines'

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/framework" element={<Framework />} />
          <Route path="/guidelines" element={<Guidelines />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
