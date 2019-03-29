import React from 'react';
import ProfileIcon from '../Profile/ProfileIcon';

const Navigation = ({onRouteChange, isSignedIn, toggleProfile}) =>{


        if(isSignedIn){
            return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <ProfileIcon onRouteChange={onRouteChange}
                             toggleProfile={toggleProfile}/>
            </nav>
            )
        } else {
            return(

                    <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <p
                            onClick={() => onRouteChange('signIn')}
                            className='f5 link dim black underline pa3 pointer'>
                            Sign in
                        </p>
                        <p
                        onClick={() => onRouteChange('register')}
                        className='f5 link dim black underline pa3 pointer'>
                            Register
                        </p>
                    </nav>

            )
        }
};

export default Navigation;