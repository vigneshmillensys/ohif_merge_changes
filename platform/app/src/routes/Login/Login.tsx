import React, { useState } from 'react';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import { userActions } from '../../../../ui/src/redux/actions/user';
import { Icon } from '@ohif/ui';

//'platform/ui/src/redux/actions/user';

//import { userActions } from '../../redux/actions/user';
// import { useDispatch } from "react-redux";

export default function Login() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: '',
    password: '',
  });
  const [email, setEmail] = useState('');
  const [errorSendEmailList, setSendEmailErrorList] = useState([]);
  const [errorList, setErrorList] = useState([]);
  const [isForgetPassword, setForgetPassword] = useState(false);
  const [reSendEmail, setReSendEmail] = useState(false);
  const [errorWhileSendEmail, setErrorWhileSendEmail] = useState(false);

  function getUser(e) {
    const copyUser = { ...user };
    copyUser[e.target.name] = e.target.value;
    setUser(copyUser);
  }

  async function submitForm(e) {
    e.preventDefault();
    const validationForm = validationLogin();
    if (validationForm.error) {
      setErrorList(validationForm.error.details);
    } else {
      userActions.login(user.userName, user.password);
    }
    // dispatch(userActions.login(user.email, user.password));
  }
  async function submitSendForm(e) {
    e.preventDefault();
    const schema = Joi.string()
      .email({ tlds: { allow: false } })
      .required();
    const validationForm = schema.validate(email, { abortEarly: false });

    if (validationForm.error) {
      setSendEmailErrorList(validationForm.error.details);
    } else {
      //localStorage.setItem('token', JSON.stringify(user));
      //navigate('/login');
      setReSendEmail(true);
    }
    // dispatch(userActions.login(user.email, user.password));
  }
  function forgetPassword(e) {
    setForgetPassword(true);
  }
  function validationLogin() {
    const schema = Joi.object({
      userName: Joi.string().required().messages({
        'string.empty': 'User Name is not allowed to be empty',
      }),
      password: Joi.string().required().messages({
        'string.empty': 'Password is not allowed to be empty',
      }),
    });
    return schema.validate(user, { abortEarly: false });
  }
  function navigateToLogin() {
    setReSendEmail(false);
    setForgetPassword(false);
    navigate('/');
  }
  return (
    <div
      className="loginCard"
      style={{ display: 'flex' }}
    >
      <div style={{ flex: 1 }}>
        {isForgetPassword && (
          <div
            style={{
              display: 'inline-block',
              float: 'left',
              marginTop: '30px',
              marginLeft: '30px',
            }}
          >
            <p
              style={{ color: '#b1b5b5' }}
              onClick={navigateToLogin}
            >
              &#60; back
            </p>
          </div>
        )}
      </div>
      <div
        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        className="cardLogo"
      >
        {!isForgetPassword && (
          <div style={{ flex: 1 }}>
            <div className="cardLogo">
              {' '}
              <img
                // src="/assets/DacsLogo.png"
                src="/assets/millensys LOGO.png"
                style={{
                  width: '20rem',
                  verticalAlign: 'bottom',
                  marginRight: '2rem',
                }}
                alt="Logo"
              />
            </div>
            <div style={{ textAlign: '-webkit-left', margin: 'auto' }}>
              <div>
                <span className="Sign-in-to-Neureveal-DACS">Welcome to</span>
              </div>
              <div style={{ marginBottom: '30px' }}>
                <span className="Sign-in-to-Neureveal-DACS">
                  {/* <span className="text-style-2">Neureveal PACS</span> */}
                  <span className="text-style-2">Millensys PACS</span>
                </span>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <form onSubmit={submitForm}>
                <div style={{ textAlign: '-webkit-left' }}>
                  <input
                    onChange={getUser}
                    type="text"
                    className="textBox-highlighted"
                    name="userName"
                    id="exampleInputEmail1"
                    placeholder="User Name"
                    autoComplete="off"
                    required
                    autoFocus
                  />
                </div>
                <div style={{ textAlign: '-webkit-left' }}>
                  <input
                    onChange={getUser}
                    type="password"
                    className="textBox-highlighted"
                    name="password"
                    id="exampleInputEmail1"
                    placeholder="Password"
                    autoComplete="off"
                    required
                  />
                </div>
                <div style={{ textAlign: '-webkit-left' }}>
                  {errorList.map((error, index) => (
                    <div
                      key={index}
                      className="alert alert-danger w-100 errorStyle p-2"
                    >
                      {' '}
                      {error.message}{' '}
                    </div>
                  ))}
                </div>
                <div style={{ textAlign: '-webkit-left' }}>
                  <input
                    id="submitButton"
                    type="submit"
                    value="Sign in"
                    className="login-button-style Sign-in"
                  />
                </div>
              </form>
            </div>
          </div>
        )}
        {isForgetPassword && !reSendEmail && (
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src="/assets/email.png"
                style={{
                  height: '4rem',
                  width: '4rem',
                  verticalAlign: 'bottom',
                  marginRight: '2rem',
                }}
                alt="email"
              />
              <div className="enterEmail">Enter E-mail</div>
            </div>

            <div
              className="Sign-in-to-Neureveal-DACS"
              style={{ fontSize: '1.5rem', textAlign: 'center' }}
            >
              Password change link will be send to your email
            </div>

            {errorWhileSendEmail && (
              <div className="alert alert-danger w-100 errorStyle p-2">
                <div style={{ width: '46rem' }}>
                  Error while send link on your email, please retry
                </div>
              </div>
            )}
            <form onSubmit={submitSendForm}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div>
                  <input
                    type="email"
                    onChange={e => setEmail(e.target.value)}
                    id="emailSend"
                    name="emailSend"
                    placeholder="Enter your email"
                    className="textBox-highlighted "
                    autoComplete="off"
                    autoFocus
                  />
                </div>
                <div style={{ textAlign: 'center' }}>
                  {errorSendEmailList.map((error, index) => (
                    <div
                      key={index}
                      className="alert alert-danger w-100 errorStyle p-2"
                    >
                      {' '}
                      {error.message}{' '}
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '1.5rem' }}>
                  <input
                    id="submitSendButton"
                    type="submit"
                    value="Send"
                    className="login-button-style Sign-in"
                  />
                </div>
              </div>
            </form>
          </div>
        )}
        {isForgetPassword && reSendEmail && (
          <div style={{ flex: 1 }}>
            <div className="reSendContainer">
              <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img
                    src="/assets/success.png"
                    style={{
                      height: '4rem',
                      width: '4rem',
                      verticalAlign: 'bottom',
                      marginRight: '2rem',
                    }}
                    alt="success"
                  />
                  <div className="emailSentSuccessfully">Email sent successfully</div>
                </div>
                <div className="linkToUpdateYourPassword">
                  <div style={{ width: '46rem' }}>
                    Find the link to update your password in the inbox or the spam
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '3rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ marginTop: '1rem' }}>
                    <input
                      id="submitResendButton"
                      type="submit"
                      value="Re-send email"
                      className="login-button-style Sign-in"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div style={{ flex: 1 }}>
          {!isForgetPassword && (
            <div
              className="Forget-your-password-"
              onClick={forgetPassword}
            >
              <a>Forgot Password ?</a>
            </div>
          )}
        </div>
      </div>
      <div style={{ flex: 1 }}></div>
    </div>
  );
}
