import { useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import AppContainer from "../../components/AppContainer/AppContainer";
import Nav from "../../components/Nav/Nav";
import RightBar from "../../components/RightBar/RightBar";
import PageContent from "../../components/PageContent/PageContent";
import { CircularProgress } from "@material-ui/core";
import { get, put } from "../../utils/axiosLib";
import { logger } from "../../utils/logger";
import { useParams } from "react-router";
import Update from "../../components/Update/Update";
import Tweet from "../../components/Tweet/Tweet";

import style from "./Profile.module.scss";
import style2 from "../../components/Feed/Feed.module.scss";
import arrow from "../../images/icons/arrow.svg";
import location from "../../images/icons/locale.svg";
import Cover from "../../images/others/cover.jpeg";
import avi from "../../images/others/avatar.jpeg";

const portalElement: any = document.getElementById("modalOverlay");

interface Modal {
  modal?: string;
  modalStatus?: boolean;
  modalState?: boolean;
}
interface Status {
  errMsg?: string;
  isLoading?: boolean;
  isLoadingTweets?: boolean;
}

const Profile = () => {
  const username = useParams().username;
  const [currentPage, setCurrentPage] = useState<string>("Profile");
  const [paramUser, setParamUser] = useState<any>({});
  const [status, setStatus] = useState<Status>({
    errMsg: "",
    isLoading: true,
    isLoadingTweets: true,
  });
  const [authState, setAuthState] = useContext<any>(AuthContext);
  const currentUser: any = authState.user.user;
  const [modalValues, setModalValues] = useState<Modal>({
    modal: "None",
    modalStatus: false,
    modalState: false,
  });
  const [tweetView, setTweetView] = useState<any>({
    tweetType: "tweets",
    currentTweets: [],
  });
  const [usersTweets, setUsersTweets] = useState<number>(0);
  const [followed, setFollowed] = useState<boolean>();

  useEffect(() => {
    const loadProfile = async () => {
      if (username === currentUser.username) {
        setCurrentPage("Profile");
      } else {
        setCurrentPage("Home");
      }
      try {
        const endpoint = `${process.env.REACT_APP_BASE_URL}user?username=${username}`;
        const profileReq = await get(endpoint);
        //logger(profileReq.data)
        setParamUser(profileReq.data);
        // setParamUser((prevState: any) => {
        //   return { ...prevState, paramUser: profileReq.data }
        // })
        setStatus({
          errMsg: "",
          isLoading: false,
        });
        logger("profile>>>", profileReq.data);
      } catch (err) {
        //}catch(err: any | undefined | {}){

        //paramUser.profilePicture
        setStatus({
          errMsg: "Sorry an error occured...",
          isLoading: false,
        });
      }
    };
    loadProfile();
  }, [username, currentUser.username, authState.latestFollow]);

  useEffect(() => {
    const loadTweets = async () => {
      try {
        const endpoint = `${process.env.REACT_APP_BASE_URL}post/tweets/${username}`;
        const tweetsReq = await get(endpoint);
        //logger('tweets', tweetsReq.data)
        setTweetView({
          tweetType: "tweets",
          currentTweets: tweetsReq.data,
        });
        setUsersTweets(tweetsReq.data.length);
        setStatus({
          errMsg: "",
          isLoading: false,
          isLoadingTweets: false,
        });
      } catch (err) {
        //}catch(err: any | undefined | {}){
        // logger(err)
        setStatus({
          errMsg: "Tweets are not loading right now...",
          isLoading: false,
          isLoadingTweets: false,
        });
      }
    };
    loadTweets();
  }, [username]);

  const handleModal = () => {
    setTimeout(() => {
      setModalValues({
        ...modalValues,
        modal: "None",
        modalState: false,
      });
    }, 300);
    setModalValues({
      ...modalValues,
      modalStatus: false,
    });
  };
  const handleUpdate = () => {
    setModalValues({
      ...modalValues,
      modal: "Update",
      modalState: true,
      modalStatus: true,
    });
  };
  const handleFollow = async () => {
    try {
      if (followed) {
        setFollowed(false);
        const endpoint =
          `${process.env.REACT_APP_BASE_URL}user/` +
          paramUser._id +
          "/unfollow";
        const unfollowReq = await put(endpoint, { userId: currentUser._id });
        setAuthState({
          ...authState,
          user: {
            ...authState.user,
            user: {
              ...authState.user.user,
              following: authState.user.user.following.filter(
                (following: any) => following !== paramUser._id
              ),
            },
          },
          latestFollow: Math.random() * 10,
        });
        logger("unfollow>>", unfollowReq);
        logger(authState.user.user.following);
      } else {
        setFollowed(true);
        const endpoint =
          `${process.env.REACT_APP_BASE_URL}user/` + paramUser._id + "/follow";
        const followReq = await put(endpoint, { userId: currentUser._id });
        setAuthState({
          ...authState,
          user: {
            ...authState.user,
            user: {
              ...authState.user.user,
              following: [...authState.user.user.following, paramUser._id],
            },
          },
          latestFollow: Math.random() * 10,
        });
        logger("follow>>", followReq);
        logger(authState.user.user.following);
      }
    } catch (err) {
      logger(err);
    }
  };
  useEffect(() => {
    setFollowed(currentUser.following.includes(paramUser._id));
    console.log(
      "do i follow?  ",
      currentUser.following.includes(paramUser._id)
    );
    //logger('url user??  ', paramUser._id)
    //console.log('current context >>> ', currentUser.following)
    console.log("img>>>");
  }, [currentUser.following, paramUser._id]);

  const loadTweets = async () => {
    setStatus({
      errMsg: "",
      isLoading: false,
      isLoadingTweets: true,
    });
    try {
      const endpoint = `${process.env.REACT_APP_BASE_URL}post/tweets/${username}`;
      const tweetsReq = await get(endpoint);
      logger("tweets", tweetsReq.data);
      setTweetView({
        tweetType: "tweets",
        currentTweets: tweetsReq.data,
      });
      setStatus({
        errMsg: "",
        isLoading: false,
        isLoadingTweets: false,
      });
    } catch (err) {
      //}catch(err: any | undefined | {}){
      // logger(err)
      setStatus({
        errMsg: "Tweets are not loading right now...",
        isLoading: false,
        isLoadingTweets: false,
      });
    }
  };
  const loadRetweets = async () => {
    setStatus({
      errMsg: "",
      isLoading: false,
      isLoadingTweets: true,
    });
    try {
      const endpoint = `${process.env.REACT_APP_BASE_URL}post/retweets/${username}`;
      const tweetsReq = await get(endpoint);
      logger("tweets", tweetsReq.data);
      setTweetView({
        tweetType: "retweets",
        currentTweets: tweetsReq.data,
      });
      setStatus({
        errMsg: "",
        isLoading: false,
        isLoadingTweets: false,
      });
    } catch (err) {
      //}catch(err: any | undefined | {}){
      // logger(err)
      setStatus({
        errMsg: "Tweets are not loading right now...",
        isLoading: false,
        isLoadingTweets: false,
      });
    }
  };
  const loadLikes = async () => {
    setStatus({
      errMsg: "",
      isLoading: false,
      isLoadingTweets: true,
    });
    try {
      const endpoint = `${process.env.REACT_APP_BASE_URL}post/likes/${username}`;
      const tweetsReq = await get(endpoint);
      logger("likes", tweetsReq.data);
      setTweetView({
        tweetType: "likes",
        currentTweets: tweetsReq.data,
      });
      setStatus({
        errMsg: "",
        isLoading: false,
        isLoadingTweets: false,
      });
    } catch (err) {
      //}catch(err: any | undefined | {}){
      // logger(err)
      setStatus({
        errMsg: "Tweets are not loading right now...",
        isLoading: false,
        isLoadingTweets: false,
      });
    }
  };
  const loadMedia = async () => {
    setStatus({
      errMsg: "",
      isLoading: false,
      isLoadingTweets: true,
    });
    try {
      const endpoint = `${process.env.REACT_APP_BASE_URL}post/media/${username}`;
      const tweetsReq = await get(endpoint);
      logger("tweets", tweetsReq.data);
      setTweetView({
        tweetType: "media",
        currentTweets: tweetsReq.data,
      });
      setStatus({
        errMsg: "",
        isLoading: false,
        isLoadingTweets: false,
      });
    } catch (err) {
      //}catch(err: any | undefined | {}){
      // logger(err)
      setStatus({
        errMsg: "Tweets are not loading right now...",
        isLoading: false,
        isLoadingTweets: false,
      });
    }
  };
  return (
    <AppContainer>
      <Nav currentPage={currentPage} paramUser={paramUser} />
      {status.isLoading ? (
        <div className={style2.loaderBox}>
          <CircularProgress color="inherit" size="45px" />
        </div>
      ) : (
        <PageContent>
          {modalValues.modalState && (
            <>
              {ReactDOM.createPortal(
                <div
                  className={
                    style.overlay + " animate__animated animate__fadeIn"
                  }
                  onClick={handleModal}
                ></div>,
                portalElement
              )}
              {modalValues.modal === "Update" && (
                <Update
                  handleModal={handleModal}
                  modalState={modalValues.modalState}
                  modalStatus={modalValues.modalStatus}
                />
              )}
            </>
          )}
          <div className={style.headerPro}>
            <Link to="/" className={style.back}>
              <img src={arrow} alt="back" />
            </Link>
            <div className={style.userBox}>
              <h1>{paramUser.name}</h1>
              <p>{usersTweets} Tweets</p>
            </div>
          </div>
          <div className={style.profileBox}>
            <div className={style.coverImgBox}>
              <img src={Cover} alt="cover" />
            </div>
            <img
              className={style.avatar}
              src={paramUser.profilePicture || avi}
              alt="avi"
            />
            <div className={style.profileDesc}>
              <div className={style.pdTop}>
                {paramUser.username === currentUser.username && (
                  <button onClick={handleUpdate}>Edit Profile</button>
                )}
                {paramUser.username !== currentUser.username && (
                  <button onClick={handleFollow}>
                    {" "}
                    {followed ? "Unfollow" : "Follow"}
                  </button>
                )}
              </div>
              <div className={style.pdBody}>
                <div className={style.pdnames}>
                  <h1>{paramUser.name}</h1>
                  <p>@{paramUser.username}</p>
                </div>
                <p className={style.pdBio}>{paramUser.bio}</p>
                <div className={style.pdl}>
                  <img src={location} alt="location" />
                  <p>{paramUser.location}</p>
                </div>
              </div>
              <div className={style.pdBtm}>
                <p>
                  <span>{paramUser?.following?.length}</span>Following
                </p>
                <p>
                  <span>{paramUser?.followers?.length}</span>Followers
                </p>
              </div>
            </div>
            <div className={style.tweetTypes}>
              <div className={style.typesTop}>
                <div className={style.typeSingle} onClick={loadTweets}>
                  <h2>Tweets</h2>
                  {tweetView.tweetType === "tweets" && (
                    <div className={style.line}></div>
                  )}
                </div>
                <div className={style.typeSingle} onClick={loadRetweets}>
                  <h2>Retweets</h2>
                  {tweetView.tweetType === "retweets" && (
                    <div className={style.line}></div>
                  )}
                </div>
                <div className={style.typeSingle} onClick={loadMedia}>
                  <h2>Media</h2>
                  {tweetView.tweetType === "media" && (
                    <div className={style.line}></div>
                  )}
                </div>
                <div className={style.typeSingle} onClick={loadLikes}>
                  <h2>Likes</h2>
                  {tweetView.tweetType === "likes" && (
                    <div className={style.line}></div>
                  )}
                </div>
              </div>
              <div className={style.typesBody}>
                {status.isLoadingTweets ? (
                  <div className={style2.loaderBox}>
                    <CircularProgress color="inherit" size="45px" />
                  </div>
                ) : (
                  <>
                    {tweetView.currentTweets.length >= 1 &&
                      tweetView.currentTweets.map((tweet: any) => (
                        <Tweet key={tweet._id} tweetFull={tweet} />
                      ))}
                    {tweetView.currentTweets.length < 1 && (
                      <div className={style2.loaderBox}>
                        <p style={{ color: "#fff" }}>Nothing to see here yet</p>
                      </div>
                    )}
                    <div className={style2.loaderBox}>
                      <p style={{ color: "#fff" }}>{status.errMsg}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </PageContent>
      )}
      <RightBar />
    </AppContainer>
  );
};

export default Profile;
