import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css';
import brain from './brain.png';



const Logo = () =>{

    return(
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-3" options={{ max : 50 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner pa3">
                    <img src={brain} alt='brain' style={{paddingTop: '5px'}}/>
                </div>
            </Tilt>
        </div>
    );
};

export default Logo;