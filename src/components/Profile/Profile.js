import React from 'react';
import './profile.css'

const Profile = ({isProfileOpen, toggleProfile})=>{
    return (
        <div className='profile-modal'>
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
                <main className="pa4 black-80">
                        <img
                            src="http://tachyons.io/img/logo.jpg"
                            className="h3 w3 dib" alt="avatar" />

                        <h1>{'Anton'}</h1>
                        <h4>{'Images recon: 11'}</h4>
                        <p>{'Mambered: June'}</p>
                        <hr />
                            <div className="mt3">
                                <input
                                    className="pa2 b--black-10 w-100"
                                    type="text"
                                    name="user-name"
                                    id="user-name"
                                    placeholder="Anton"
                                ></input>
                            </div>
                            <div className="mt3">
                                <input
                                    className="pa2 b--black-10 w-100"
                                    type="text"
                                    name="user-pet"
                                    id="user-pet"
                                    placeholder="cute kitty"
                                ></input>
                            </div>
                            <div className="mv3">
                                <input
                                    className="b pa2 b--black-10 w-100"
                                    type="number"
                                    name="user-age"
                                    id="user-age"
                                    placeholder="29"
                                ></input>
                            </div>
                    <div className='mt4' style={{display: 'flex', justifyContent: 'space-evenly'}}>
                        <button className={'b pa2 pointer grow hover-white w-40 bg-light-green b--black-30'}>
                            Save
                        </button>
                        <button className={'b pa2 pointer grow hover-white w-40 bg-light-red b--black-30'}
                            onClick={toggleProfile}>
                            Cancel
                        </button>
                    </div>
                </main>
            </article>
        </div>
    )
};

export default Profile;