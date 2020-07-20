import React from 'react';

import '../../styles/_header.scss';
import HeaderTop from "./parts/HeaderTop";

function Header({headerClass, headerText, changeMenu}) {
    return (
        <header className={`header ${headerClass}`}>
            <HeaderTop changeMenu={changeMenu}/>
            <div className="header-bottom">
                <div className="header-bottom-soldier"/>
                <div className="header-bottom-text">
                    {headerText}
                </div>
            </div>
        </header>
    );
}
Header.displayName = 'Header';
export default Header;