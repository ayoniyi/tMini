import { useState } from "react";
import style from "./RightBar.module.scss";
import style2 from "../Feed/Feed.module.scss";

import Search from "../../images/icons/search.svg";
import Search2 from "../../images/icons/search-a.svg";
import { logger } from "../../utils/logger";
import { get } from "../../utils/axiosLib";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import avi from "../../images/others/avatar.jpeg";

const RightBar = () => {
  const [focus, setFocus] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async (e: any) => {
    setIsLoading(true);
    const username = e.target.value.trim();
    setSearchTerm(e.target.value.trim());
    if (username.length >= 1) {
      try {
        const endpoint = `${process.env.REACT_APP_BASE_URL}user/${username}`;
        const usersReq = await get(endpoint);
        logger(usersReq);
        setResults(usersReq.data);
      } catch (err) {
        logger(err);
      }
    }
    if (username.length === 0) {
      setResults([]);
    }
    setIsLoading(false);
  };

  return (
    <section className={style.container}>
      <div className={style.content}>
        <div className={style.top}>
          <div className={style.searchBx}>
            <div className={style.search}>
              <input
                type="text"
                placeholder="Search"
                onFocusCapture={() => setFocus(!focus)}
                onBlur={() => setFocus(!focus)}
                onChange={handleSearch}
                value={searchTerm}
              />
              <img src={focus ? Search2 : Search} alt="search" />
            </div>{" "}
          </div>
          {results.length >= 1 && (
            <div className={style.results}>
              {isLoading ? (
                <div className={style2.loaderBox}>
                  <CircularProgress color="inherit" size="45px" />
                </div>
              ) : (
                <>
                  {results.length >= 1 &&
                    results.map((result: any) => (
                      <Link
                        to={`/profile/${result.username}`}
                        className={style.resultSingle}
                        key={result._id}
                      >
                        <div className={style.imgB}>
                          <img src={result.profilePicture || avi} alt="avi" />
                        </div>
                        <div className={style.userInfo}>
                          <h3>{result.name}</h3>
                          <p>@{result.username}</p>
                        </div>
                      </Link>
                    ))}
                  {!results && (
                    <div className={style2.loaderBox}>
                      <p style={{ color: "#fff" }}>Type a username...</p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RightBar;
