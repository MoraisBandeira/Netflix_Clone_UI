import React from 'react';
import './Header.css';

export default ({black})=>{


    return(
        <header className={black ? 'black':''}>
            <div className="header--logo">
                    <a href="#">
                        <img src="https://logos-world.net/wp-content/uploads/2020/04/Netflix-Logo.png"/>
                    </a>
            </div>
            <div className="header--user">
                    <a href="#">
                        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/e70b1333850498.56ba69ac32ae3.png"/>
                    </a>
            </div>
        </header>
    )
}