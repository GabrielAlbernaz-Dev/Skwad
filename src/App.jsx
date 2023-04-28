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
import { ModalContext, ModalStorage } from './context/ModalContext'
import ProtectedRoute from './helper/ProtectedRoute'
import Login from './pages/Auth/Login'
import ProtectedComponent from './helper/ProtectedComponent'
import Register from './pages/Auth/Register'
import Auth from './pages/Auth/Auth'
import Modal from './components/Modal/Modal'
import { useContext } from 'react'
import PostActionModal from './helper/PostActionModal'

function App() {

  const postsDataTest = [
    {
      profileId:'@harrypotterinfos',
      src:'https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg',
      time:'21h',
      title:'Harry Potter BR',
      text:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa at repudiandae tenetur corporis doloremque. Dicta eligendi id earum tempore aspernatur omnis consectetur repellat eum ab error. Quibusdam, distinctio? Sunt, modi!'
    },
    {
      profileId:'@brttGames',
      src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSICisTU28AJm6sUpTMTp75hUWXnAqV5U3aKqePfp6miQ&s',
      time:'14h',
      title:'Fluxo brTT',
      text:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa at repudiandae tenetur TSC'
    },
    {
      profileId:'@harrypotterinfos',
      src:'https://s2.glbimg.com/Z4c0dLtiMbmfP7hxpRKKMKjITSM=/0x0:1318x1021/600x0/smart/filters:gifv():strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2021/m/g/1KGc3MT5A5wRCv3okBaw/mwzera-champions.jpg',
      time:'11h',
      title:'FURIA Mwzera',
      text:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. @Gabriel'
    },
  ]
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
                <PostActionModal/>
              </Main>
            </div>
          </ModalStorage>
        </UserStorage>
      </BrowserRouter>
    </>
  )
}

export default App
