import React from "react";
import HeaderTop from "./layouts/parts/HeaderTop";

function MobileMenu({ changeMenu, menuOpen }) {
    console.log(changeMenu);
    return (
        <div>
            <HeaderTop changeMenu={changeMenu} menuOpen={menuOpen} hideBtn={true}/>
        </div>
    )
}

export default MobileMenu;