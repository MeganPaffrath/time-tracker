import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from "../../context/UserContext";
import Logs from './Logs';
import TimeLogger from './TimeLogger';
import LogSelector from './LogSelector';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';


export default function Home() {
  const {userData} = useContext(UserContext);
  const history = useHistory();
  const [logs, setLogs] = useState([]);
  const [update, setUpdate] = useState(0);
  const [view, setView] = useState("all");


  if (!userData.username) {
    history.push("/login");
  }

  return (
    <Container className="logs-component">
      <Row>
        <Col>
          <TimeLogger userData={userData}/>
        </Col>
        <Col>
          <LogSelector logs={logs} setLogs={setLogs} 
            update={update} setUpdate={setUpdate}
            view={view} setView={setView}
            userData={userData}
          />
        </Col>
        <Col>
          <Logs logs={logs} setLogs={setLogs} 
            update={update} setUpdate={setUpdate}
            view={view} setView={setView}
          />
        </Col>
        <Col>Test</Col>
        {/* <div className="section-divider"></div> */}
        
      </Row>
    </Container>
  )

  
}

