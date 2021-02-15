import React from 'react';
import UserContext from "../../context/UserContext";
import LogsAndTracker from './LogsAndTracker';
import { useHistory } from 'react-router-dom';

export default function Home() {

  return (
    <div>
      <LogsAndTracker />
    </div>
  )
}

