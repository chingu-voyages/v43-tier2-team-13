/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useState, useEffect } from 'react';
import logo from '../../assets/images/logo2.png';

import { Row, Col, Button } from 'antd';

import { Link } from 'react-router-dom';

const profile = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
      fill="#111827"
    ></path>
  </svg>,
];

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => window.scrollTo(0, 0));

  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 2000);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setLoggedIn(true);
        console.log(uid, 'logged in');
        // ...
      } else {
        enterLoading(2);
        setTimeout(() => {
          setLoggedIn(false);
        }, 2000);
        // User is signed out
        // ...
      }
    });
  }, []);

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('sign out successful');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <div className="header-logo">
            <img src={logo} alt="Application logo" style={{ height: 60 }} />
            <span style={{ textTransform: 'capitalize' }}>CryptoWorld</span>
          </div>
        </Col>
        <Col span={24} md={18} className="header-control">
          {loggedIn ? (
            <div>
              {profile}
              <Button
                type="default"
                size="large"
                loading={loadings[2]}
                onClick={handleSignOut}
                style={{ cursor: 'pointer', marginLeft: '10px' }}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <Link
              to="/sign-in"
              className="btn-sign-in"
              style={{ marginLeft: '10px' }}
            >
              {profile}
              <span>Sign in</span>
            </Link>
          )}
        </Col>
      </Row>
    </>
  );
}

export default Header;
