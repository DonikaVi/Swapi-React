import React from "react";
import { connect } from "react-redux";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { changeMenuState } from "../../redux/actions";
import MobileMenu from "../MobileMenu";

function Wrapper({ children, headerClass, headerText, changeMenu, menuOpen }) {
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

const mapsStateToProps = (state) => {
  return {
    menuOpen: state.app.menuOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeMenu: () => {
      dispatch(changeMenuState());
    },
  };
};

export default connect(mapsStateToProps, mapDispatchToProps)(Wrapper);
