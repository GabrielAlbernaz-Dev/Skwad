import './App.scss'
import './utilities.scss'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Header from './layouts/Header/Header'
import Home from './pages/Home/Home'
import { UserContext, UserStorage } from './context/UserContext'
import Explore from './pages/Explore/Explore'
import Notifications from './pages/Notifications/Notifications'
import Sidebar from './layouts/Sidebar/Sidebar'
import Main from './layouts/Main/Main'
import Profile from './pages/Profile/Profile'
import { ModalStorage } from './context/ModalContext'
import ProtectedRoute from './helper/ProtectedRoute'
import Login from './pages/Auth/Login'
import ProtectedComponent from './helper/ProtectedComponent'
import Register from './pages/Auth/Register'
import Auth from './pages/Auth/Auth'

function App() {
  return (
    <>
      <BrowserRouter>
        <UserStorage>
          <ModalStorage>
            <ProtectedComponent>
              <Header/>
            </ProtectedComponent>
            <div className="container">
              <Main style={{flexDirection:'column'}}>
                <ProtectedComponent>
                  <Sidebar/>
                </ProtectedComponent>
                <Routes>
                  <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
                  <Route path="/explore" element={<ProtectedRoute><Explore/></ProtectedRoute>} />
                  <Route path="/notifications" element={<ProtectedRoute><Notifications/></ProtectedRoute>}/>
                  <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
                  <Route path="/auth/*" element={<Auth/>}/>
                </Routes>
              </Main>
            </div>
          </ModalStorage>
        </UserStorage>
      </BrowserRouter>
    </>
  )
}

export default App
