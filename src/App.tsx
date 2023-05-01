import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { CssBaseline } from '@mui/material'
import Framework from './pages/Framework'

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/framework" element={<Framework />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
