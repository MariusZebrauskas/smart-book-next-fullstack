import Link from 'next/link';
import axios from 'axios';
import { useState } from 'react';
import { HTTP } from '../config'; 


export default function test() {
  const [data, setData] = useState<any>('');
  const [postData, setPostData] = useState(' ');
  const [err, setErr] = useState(' ');
  const [path, setPath] = useState(' ');
  
  
  const getData = async () => {
    axios
      .get('http://localhost:3000/api/test')
      .then((data) => setData(data.data))
      .catch((err) => {
        setPath(err.config.url)
        setErr(JSON.stringify(err));
        
      })
    //   const res = await fetch()
    // await fetch('http://localhost:5001')
    // .then(response => response.json())
    // .then(data => setData(data))
    // .catch((err) => console.log(err) );
    // const res = await fetch('http://localhost:5000');
    // const data = await res.json();
    // console.log('data:', data)
    // setData(data);
  };

  let url = 'http://localhost:5000/api/login';

  const postDataDB = () => {
    axios
      .post(url, {
        email: 'zebrauskas.mar@gmail.com',
        password: 'Sincila9*',
      })
      .then((data) => setPostData(data.data.token))
      .catch((err) => setErr(JSON.stringify(err)));
  };
  return (
    <div>
      <button>
        <Link href='/test'>test</Link>
      </button>
      <br />
      <br />
      <button onClick={getData}>get</button>
      <br />
      <br />
      <br />
      <button onClick={postDataDB}>post</button>
      <br />

      <br />
      <br />
      <p style={{ color: 'red' }}>data: {data.message}</p>
      <p style={{ color: 'red' }}>path:{path}</p>
      <br />

      <br />
      <br />
      <p style={{ color: 'blue' }}>{postData}</p>
      <p style={{ color: 'red' }}>err: {err}</p>
    </div>
  );
}


