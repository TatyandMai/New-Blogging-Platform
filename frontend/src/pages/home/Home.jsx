import './Home.css';
import { Link } from 'react-router-dom'


function Home() {

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <>
      <div className="first-container" id="link1">
        <div className="header">
          <div className="buttons">
            <div><Link className="signup-button" to="/register">SIGN UP</Link></div>
            <div><Link className="login-button" to="/login">LOGIN</Link></div>
          </div>
        </div>
        <img
            src={PUBLIC_FOLDER + "logo/logo.png"}
            alt='logo'
            className="homeLogo" />
      </div>
      <div className="second-container">
        <div className="about-left">
          <img src='https://images.unsplash.com/photo-1533038590840-1cde6e668a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80' alt='img'></img>
        </div>
        <div className="about-right">
          <h4>You can easily make a blog and share your information, opinions, thoughts and pictures with people all over the world</h4>
        </div>
      </div>
      <div className="last-container">
        <div className="subscription">
          <h1>SUBSCRIBE</h1>
          <input
                type='text'
                placeholder="Email"
                className='subscription-input'
            />
          <button className='subscription-btn'>SUBSCRIBE</button>
        </div>
        <div className="footer">
          <div className="signup-link"><Link className="signup-button" to="/register">SIGN UP</Link></div>
          <div className="login-link"><Link className="login-button" to="/login">LOGIN</Link></div>
        </div>
      </div>
    </>
  )
}

export default Home