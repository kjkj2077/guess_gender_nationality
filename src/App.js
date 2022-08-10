import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [gender, setGender] = useState(null);
  const [nationality, setNationality] = useState(null);
  const [name, setName] = useState("jinyku");


  async function getApi(name, nationality) {
    let url2 = `https://api.nationalize.io?name=${name}` //국적 //하루천개 제한
    console.log(url2)
    let res2 = await axios.get(url2);
    console.log("nationality res", res2.data)
    setNationality(res2.data)

    let url = `https://api.genderize.io?name=${name}` //성별찾기 하루 1000개 제한
    let res = await axios.get(url);
    setGender(res.data);
  }
  const clickSearch = () => {
    getApi(name, nationality)
  }

  useEffect((name,nationality) => {
    getApi(name, nationality);
    console.log("nationality", nationality)
  }, []);
  // 429에러 너무 많은요청.
  return (
    <div className="App">
      <Container>
        <h1>Guessing gender and nationality by name</h1>
        <div className='input_button'>
          <input  className='input'   value={name} onChange={(e) => setName(e.target.value)} />
          <Button id ="button"variant="outline-secondary" onClick={() => clickSearch()} > Search </Button>
        </div>
        <h1>name: {name}</h1>
        <Row>
          {/* <Col> <h2>gender: {gender.gender}</h2></Col>
          <Col> <h2>probability: {(gender.probability*100).toFixed(2)}%</h2></Col> */}
        </Row>
        <br />
        <Row>
          <Col> {nationality?.country.map((item) => { return <h1>{item.country_id}</h1> })}</Col>
          <Col> {nationality?.country.map((item) => { return <h1> {(item.probability * 100).toFixed(2)}</h1> })}</Col>
        </Row>
      </Container>
      <footer>Jinkyu KO<br/>
            Copyright © Jinkyu KO.  All rights reserved.    
      </footer>
    </div>
  );
}
export default App;
