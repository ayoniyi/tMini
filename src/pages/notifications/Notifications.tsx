import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { CircularProgress } from '@material-ui/core'
import { get } from '../../utils/axiosLib'
import { logger } from '../../utils/logger'
import { Link } from 'react-router-dom'
import AppContainer from '../../components/AppContainer/AppContainer'
import Nav from '../../components/Nav/Nav'
import RightBar from '../../components/RightBar/RightBar'
import PageContent from '../../components/PageContent/PageContent'

import style from './Notifications.module.scss'
import style2 from '../../components/Feed/Feed.module.scss'
import avi from '../../images/others/avatar.jpeg'

const Notifications = () => {
  const currentPage: string = 'Notifications'
  const [authState] = useContext<any>(AuthContext)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [notifications, setNotifications] = useState<any>([])
  const userObj: any = authState.user.user

  //   useEffect(() => {
  //     const clearNotifications = () => {
  //       setAuthState({
  //         ...authState,
  //         latestNote: Math.random() * 100,
  //       })
  //     }
  //     clearNotifications()
  //   }, [authState, setAuthState])

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const endpoint = `${process.env.REACT_APP_BASE_URL}user/notifications/${userObj._id}`
        const notReq = await get(endpoint)
        setNotifications(notReq.data.reverse())
        // setNotifications(
        //   //<< quick sort algorithm
        //   notReq.data.sort((p1: any, p2: any) => {
        //     return (
        //       new Date(p2.createdAt).valueOf() -
        //       new Date(p1.createdAt).valueOf()
        //     )
        //   }),
        // )
        setIsLoading(false)
      } catch (err) {
        logger(err)
      }
    }
    loadNotifications()
  }, [userObj._id])

  return (
    <div>
      <AppContainer>
        <Nav currentPage={currentPage} />
        <PageContent>
          <div className={style.container}>
            <div className={style.top}>
              <p>Notifications</p>
            </div>
            <div className={style.itemBox}>
              {isLoading ? (
                <div className={style2.loaderBox}>
                  <CircularProgress color="inherit" size="45px" />
                </div>
              ) : (
                <>
                  {notifications.length >= 1 &&
                    notifications.map((note: any) => (
                      <div className={style.item} key={note._id}>
                        <Link
                          className={style.itemTop}
                          to={`/profile/${note.username}`}
                        >
                          <img src={note.userImg || avi} alt="user" />
                        </Link>
                        <h2>{note.headline}</h2>
                        <p>{note.description}</p>
                      </div>
                    ))}
                  {notifications.length < 1 && (
                    <div className={style2.loaderBox}>
                      <p style={{ color: 'gray' }}>No new notifications</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </PageContent>
        <RightBar />
      </AppContainer>
    </div>
  )
}

export default Notifications
