// import Axios from 'axios';
import React, {useEffect, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from "../../context/UserContext";
// import Log from './Log';
import TimeLogger from './TimeLogger';
// import Axios from "axios";


export default function Home() {
  const {userData} = useContext(UserContext);
  const history = useHistory();

  console.log("user data: " + userData.username);
  // if (!userData.user) {
  //   history.push("/login");
  // }

  useEffect(() => {
    // console.log("USER DATA: " + userData.user);
    if (!userData.username) {
      history.push("/login")
    }
  });

  return (
    <div>
      {/* Hello <strong>{userData.user.username}</strong>, your logs are: */}
      <TimeLogger />
      {/* <Log /> */}

    </div>
  )

  
}

