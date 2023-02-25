import React from 'react';
import cl from './Header.module.css'
import logo from '../../assets/images/logo.svg'

const Header = () => {
    return (
        <header>
            <div className={cl.headerContent}>
                <div className={cl.headerName}>
                    <div className={cl.headerNameSvg}><img src={logo} alt=""/></div>
                    <div className={cl.headerNameTitle}><a href="https://rovlweb.ru/">Weather by Rovl Web</a></div>
                </div>
                {/*<nav>*/}
                {/*    <a href="/weather" className={cl.navLinks}>GitHub</a>*/}
                {/*    <a href="/weather" className={cl.navLinks}>About</a>*/}
                {/*</nav>*/}
            </div>
        </header>
    );
};

export default Header;
