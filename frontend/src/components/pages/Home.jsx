import React, { useEffect } from 'react';
import UserContext from "../../context/UserContext";
import LogsAndTracker from './LogsAndTracker';
import { useHistory } from 'react-router-dom';

export default function Home() {
  const history = useHistory();

  useEffect(() => {
    let token = localStorage.getItem("auth-token");
    if (token === "") {
      history.push("/login");
    }
  }, [])

  return (
    <div>
      <LogsAndTracker />
    </div>
  )
}

