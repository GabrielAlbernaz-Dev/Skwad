import React, { useContext } from 'react'
import Brand from '../../components/Brand/Brand'
import NavItem from '../../components/NavItem/NavItem'
import styles from './Header.module.scss'
import '../../utilities.scss'
import { BsFillChatDotsFill  } from "react-icons/bs";
import SearchBar from '../../components/Search/SearchBar';
import MediumButton from '../../components/Button/MediumButton';
import MediaQuery from 'react-responsive'
import ActionIcon from '../../components/ActionIcon/ActionIcon'
import SmallButton from '../../components/Button/SmallButton'
import Modal from '../../components/Modal/Modal'
import { UserContext } from '../../context/UserContext'

const Header = () => {
  const {auth,setAuth} = useContext(UserContext);

  function handleLogout() {
    setAuth(false);
  }

  return (
    <>
        <header className={styles.mainHeader}>
        <div className={`${styles.headerContainer} container`}>
            <Brand/>
            <SearchBar placeholder="Search Posts and Accounts"/>
            <div className="flexContainerRow">
              <MediaQuery maxWidth={767}>
                <SmallButton onClick={handleLogout} primary={true} text="Logout"/>
              </MediaQuery>
              <MediaQuery minWidth={768}>
                <MediumButton onClick={handleLogout} primary={true} text="Logout"/>
              </MediaQuery>
            </div>
        </div>
    </header>
    </>
  )
}

export default Header