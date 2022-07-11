import axios from 'axios';
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { HTTP } from '../config';
import { lodingOFF, lodingON } from '../redux/loadingReducer';
import { userLogin } from '../redux/userReducer';
export default function Component() {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const userLoggedIn = async (user) => {
    dispatch(lodingON());
    // Login
    axios
      .post(`${HTTP()}/api/loginwithgoogle`, {
        email: user.email,
        userName: user.userName,
        password: user.password,
      })
      .then((response) => {
        dispatch(lodingOFF());
        console.log('response:', response);

        if (response.data.login === false) {
          return console.log(response.data.message);
        }
        let { token } = response.data;
        localStorage.setItem('token', token);
        dispatch(userLogin(response.data.user));
      })
      .catch((error) => {
        dispatch(lodingOFF());

        console.log(error);
      });
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    signIn();
  };

  useEffect(() => {
    if (session) {
      axios
        .get('https://makemeapassword.ligos.net/api/v1/passphrase/plain?pc=10&wc=8&sp=n&maxCh=100')
        .then((res) => {
          let user = {
            email: session.user.email,
            userName: session.user.name,
            password: res.data,
          };

          userLoggedIn(user);
        });
    }
  }, [session]);
  return (
    <button className='animationLogin' style={{ display: 'flex' }} onClick={handleGoogleLogin}>
      <FcGoogle style={{ fontSize: '1.7rem', marginRight: '.5rem' }} />
      <p>Sign in with Google</p>
    </button>
  );
}
