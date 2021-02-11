import React, { useContext} from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from "../../context/UserContext";
import Logs from './Logs';
import TimeLogger from './TimeLogger';


export default function Home() {
  const {userData} = useContext(UserContext);
  const history = useHistory();

  if (!userData.username) {
    history.push("/login");
  }

  return (
    <div>

      <TimeLogger userData={userData}/>
      <div className="section-divider"></div>
      <Logs />

    </div>
  )

  
}

