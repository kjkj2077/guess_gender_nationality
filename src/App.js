import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Flug } from './component/Flug';
import { faPercent, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function App() {
  const [gender, setGender] = useState(null);
  const [nationality, setNationality] = useState(null);
  const [name, setName] = useState("jinkyu");
  const [count, setCount] = useState(null);

  async function getApi(name) {
    let url2 = `https://api.nationalize.io?name=${name}` //국적 //하루천개 제한
    console.log(url2)
    let res2 = await axios.get(url2);
    console.log("nationality res", res2)
    setNationality(res2.data)

    let url = `https://api.genderize.io?name=${name}` //성별찾기 하루 1000개 제한
    let res = await axios.get(url);
    console.log('gender', res)
    setCount(res);
    setGender(res.data);
  }
  const clickSearch = () => {
    getApi(name, nationality)
  }

  useEffect((name, nationality) => {
    getApi(name, nationality);
    
  }, []);
  //429에러 너무 많은요청.
  return (
    <div className="App">
      <Container>
        <h1>Guessing gender and nationality by name</h1>
        <div className='input_button'>
          <input className='input' placeholder='First name or Last name (eng)' value={name} onChange={(e) => setName(e.target.value)} />
          <Button id="button" variant="outline-secondary" onClick={() => { clickSearch(); }} > <FontAwesomeIcon icon={faSearch} className='search-icon' /> </Button>
        </div>
        <h1>Your Name: {name}</h1>
        <div className='result'>
          {count?.status == 429
            ? <h1> Sorry. Only 1000 times per day including other people's attempts.</h1>
            :
            <div>
              <Row>
                <Col>
                  <h2>Gender: {gender?.gender} &nbsp; {(gender?.probability * 100).toFixed(1)} <FontAwesomeIcon icon={faPercent} className='search-icon' /></h2>
                </Col>
              </Row>
              <br />
              <Row>
                {nationality?.country.map((item) => { return <Col> <Flug item={item} /> </Col> })}
              </Row>
            </div>
          }

        </div>
      </Container>
      <footer className='footer'>Jinkyu KO<br />
        Copyright © Jinkyu KO.  All rights reserved.<br />
        kjkj2077@naver.com
      </footer>
    </div>
  );
}
export default App;

