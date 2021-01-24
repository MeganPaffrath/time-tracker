// import Axios from 'axios';
import React, { useContext} from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from "../../context/UserContext";
import Log from './Log';
import TimeLogger from './TimeLogger';
// import Axios from "axios";


export default function Home() {
  const {userData} = useContext(UserContext);
  const history = useHistory();
  // let {update, setUpdate} = useState(0);

  console.log("user data: " + userData.username);
  if (!userData.username) {
    history.push("/login");
  }

  // useEffect(() => {
  //   console.log("USER DATA from HOME: " + userData.username);
  //   if (!userData.username) {
  //     history.push("/login")
  //   }
  // });

  return (
    <div>
      {/* Hello <strong>{userData.user.username}</strong>, your logs are: */}
      <TimeLogger />
      <Log />

    </div>
  )

  
}

