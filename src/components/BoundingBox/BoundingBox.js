import React from 'react';
import './BoundingBox.css';

const BoundingBox = ({boxParams}) =>{
    return(
        <div className='bounding-box'
             style={{
                 top: `${boxParams.top_row}%`,
                 right: `${boxParams.right_col}%`,
                 bottom: `${boxParams.bottom_row}%`,
                 left: `${boxParams.left_col}%`}}>

        </div>
    );
};

export default BoundingBox;

