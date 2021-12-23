import './App.css'
import 'animate.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from 'react-router-dom'
import Auth from './pages/auth/Auth'
//import Home from './pages/home/Home'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
