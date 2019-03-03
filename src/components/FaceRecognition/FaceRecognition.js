import React from 'react';
import BoundingBox from '../BoundingBox/BoundingBox'

const FaceRecognition = ({imgLink, imgBoxes}) =>{
    return(
        <div className='centerFlex'>
            <div style={{width: '500px', position: 'relative'}}>
                <img id='inputImg' alt='result will appear here' src={imgLink} style={{width: '100%', height: 'auto'}}/>
                {
                    imgBoxes.map((box)=> <BoundingBox boxParams={box}/>)
                }
            </div>
        </div>
    );
};

export default FaceRecognition;

