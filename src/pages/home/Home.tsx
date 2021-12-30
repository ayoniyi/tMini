import AppContainer from '../../components/AppContainer/AppContainer'
import Nav from '../../components/Nav/Nav'
import RightBar from '../../components/RightBar/RightBar'
import PageContent from '../../components/PageContent/PageContent'
import Share from '../../components/Share/Share'
import Feed from '../../components/Feed/Feed'

import style from '../profile/Profile.module.scss'
import star from '../../images/icons/star2.svg'

const Home = () => {
  const currentPage: string = 'Home'

  return (
    <AppContainer>
      <Nav currentPage={currentPage} />
      <PageContent>
        <div className={style.header}>
          <h1>Home</h1>
          <img src={star} alt="star" />
        </div>
        <Share />
        <Feed />
      </PageContent>
      <RightBar />
    </AppContainer>
  )
}

export default Home
