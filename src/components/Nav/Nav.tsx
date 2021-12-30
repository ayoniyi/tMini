import { useContext } from 'react'
import style from './Nav.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext.js'

// assets
import Logo from '../../images/icons/logo.svg'
import Home from '../../images/icons/nav/home.svg'
import Homefill from '../../images/icons/nav/home-fill.svg'
import Message from '../../images/icons/nav/message.svg'
import Messagefill from '../../images/icons/nav/message-fill.svg'
import Notifications from '../../images/icons/nav/bell.svg'
import Notificationsfill from '../../images/icons/nav/bell-fill.svg'
import Profile from '../../images/icons/nav/profile.svg'
import Profilefill from '../../images/icons/nav/profile-fill.svg'
import Tweet from '../../images/icons/nav/tweet2.svg'
import avi from '../../images/others/avatar.jpeg'

const Nav = (props: any) => {
  const page: string = props.currentPage
  const navigate = useNavigate()
  const [authState] = useContext<any>(AuthContext)
  const user: any = authState.user.user

  const handleLogout = () => {
    navigate('/auth')
    localStorage.removeItem('user')
    window.location.reload()
  }
  return (
    <div>
      <section className={style.container}>
        <div className={style.content}>
          <div className={style.top}>
            <img src={Logo} alt="logo" />
          </div>
          <div className={style.items}>
            <Link
              className={
                page === 'Home'
                  ? style.navItem + ' ' + style.active
                  : style.navItem
              }
              to="/"
            >
              <img src={page === 'Home' ? Homefill : Home} alt="home" />
              <p>Home</p>
            </Link>
            <Link
              className={
                page === 'Notifications'
                  ? style.navItem + ' ' + style.active
                  : style.navItem
              }
              to=""
            >
              <img
                src={
                  page === 'Notifications' ? Notificationsfill : Notifications
                }
                alt="notifications"
              />
              <p>Notifications</p>
            </Link>
            <div
              className={
                page === 'Messsage'
                  ? style.navItem + ' ' + style.active
                  : style.navItem
              }
            >
              <img
                src={page === 'Message' ? Messagefill : Message}
                alt="messages"
              />
              <p>Messages</p>
            </div>
            <Link
              className={
                page === 'Profile'
                  ? style.navItem + ' ' + style.active
                  : style.navItem
              }
              to={`/profile/${user.username}`}
            >
              <img
                src={page === 'Profile' ? Profilefill : Profile}
                alt="profile"
              />
              <p>Profile</p>
            </Link>

            <div className={style.tweet}>
              <button>Tweet</button>
              <img src={Tweet} alt="tweet" />
            </div>

            <div className={style.bottomBox}>
              <div className={style.btmItem} onClick={handleLogout}>
                <img src={user.profilePicture || avi} alt="avi" />
                <p>Logout</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Nav
