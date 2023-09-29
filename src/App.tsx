import { CssBaseline } from '@mui/material'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Framework from './pages/Framework'
import Guidelines from './pages/Guidelines'
import ViewFeedback from './pages/ViewFeedback'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import AuthenticationProvider from './context/authenticationContext'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <AuthenticationProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/framework" element={<Framework />} />
            <Route path="/guidelines" element={<Guidelines />} />
            <Route path="/view-feedback" element={<ViewFeedback />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </AuthenticationProvider>
      </Router>
    </>
  )
}

export default App
