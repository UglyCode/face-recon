import React from 'react';
import './imgLink.css';


const ImageLinkForm = ({onInputChange, onSubmit}) =>{

    return(
        <div className='ma4 mt0'>
            <p className='f3'>
                {'New magic tricks available at this face-recognition app. Try it!'}
            </p>
            <div className='centerFlex'>
                <div className='centerFlex form pa4 br3 shadow-5'>
                    <input className='f5 pa2 w-70 center' type='text'
                           onChange={onInputChange}
                    />
                    <button className='w-30 grow f5 link ph3 dib white bg-green'
                        onClick={onSubmit}>
                        Detect
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageLinkForm;