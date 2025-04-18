import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Chart from './pages/Chart/Chart'
import { AuthGuard } from './components/AuthGuard'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AuthGuard><Dashboard /></AuthGuard>} index />
        <Route path="/chart" element={<AuthGuard><Chart /></AuthGuard>} />
      </Routes>
    </Router>
  )
}

