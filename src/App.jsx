import './App.scss'
import './utilities.scss'
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom'
import Header from './layouts/Header/Header'
import Home from './pages/Home/Home'
import { UserStorage } from './context/UserContext'
import Explore from './pages/Explore/Explore'
import Notifications from './pages/Notifications/Notifications'
import Sidebar from './layouts/Sidebar/Sidebar'
import Main from './layouts/Main/Main'
import Profile from './pages/Profile/Profile'
import {  ModalStorage } from './context/ModalContext'
import ProtectedRoute from './helper/ProtectedRoute'
import ProtectedComponent from './helper/ProtectedComponent'
import Auth from './pages/Auth/Auth'
import ActionModal from './helper/ActionModal'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Post from './pages/Post/Post'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
                    <Route path="/profile/:id" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
                    <Route path="/posts/:id" element={<ProtectedRoute><Post/></ProtectedRoute>}/>
                    <Route path="/auth/*" element={<Auth/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
                <ActionModal/>
              </Main>
            </div>
          </ModalStorage>
        </UserStorage>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
