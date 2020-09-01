import React from 'react';
import HeaderTop from './layouts/parts/HeaderTop';

function MobileMenu({ changeMenu, menuOpen }) {
  return (
    <div>
      <HeaderTop changeMenu={changeMenu} menuOpen={menuOpen} hideBtn />
    </div>
  );
}

export default MobileMenu;
