import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import { changeMenuState } from '../../redux/actions';
import MobileMenu from '../MobileMenu';

function Wrapper({
  children, headerClass, headerText, changeMenu, menuOpen,
}) {
  return (
    <>
      {menuOpen ? (
        <MobileMenu changeMenu={changeMenu} menuOpen={menuOpen} />
      ) : (
        <>
          <Header
            changeMenu={changeMenu}
            headerClass={headerClass}
            headerText={headerText}
          />
          {children}
          <Footer />
        </>
      )}
    </>
  );
}

const mapsStateToProps = (state) => ({
  menuOpen: state.app.menuOpen,
});

const mapDispatchToProps = (dispatch) => ({
  changeMenu: () => {
    dispatch(changeMenuState());
  },
});

export default connect(mapsStateToProps, mapDispatchToProps)(Wrapper);
