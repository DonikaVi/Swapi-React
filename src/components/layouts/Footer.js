import React from 'react';
import '../../styles/_footer.scss';
import logo from '../../styles/images/logo.svg';

function Footer() {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <footer className="footer">
      <div className="footer-blue">
        <div className="footer-form">
          <form className="footer-form-wrapper" action="/">
            <input
              className="footer-form-input"
              type="email"
              id="email"
              name="email"
              placeholder="EMAIL"
            />
            <input
              className="footer-form-input"
              type="text"
              id="phone"
              name="phone"
              placeholder="PHONE"
            />
          </form>
          <button className="footer-coupon" type="submit">
            <div className="footer-coupon-text">GET YOUR 20% OFF COUPON</div>
            <div className="footer-coupon-icon" />
          </button>
        </div>
      </div>
      <div className="footer-bottom">
        <a className="logo-url" href="/">
          <img src={logo} alt="" />
        </a>
        <div className="footer-right">
          <nav className="footer-menu">
            <ul className="footer-menu-list">
              <li className="footer-menu-list-item">
                <a href="/">Hero</a>
              </li>
              <li className="footer-menu-list-item">
                <a href="/">List</a>
              </li>
              <li className="footer-menu-list-item">
                <a href="/">CTA Block</a>
              </li>
              <li className="footer-menu-list-item">
                <a href="/">Footer</a>
              </li>
            </ul>
          </nav>
        </div>
        <button onClick={scrollTop} className="footer-signup" type="button">
          Povishe pleze
        </button>
      </div>
      <div className="footer-mobile">
        <button onClick={scrollTop} className="scroll-top-btn" type="button">
          Povishe pleze
        </button>
        <a className="footer-logo" href="/">
          <img src={logo} alt="" />
        </a>
      </div>
    </footer>
  );
}

Footer.displayName = 'Footer';
export default Footer;
