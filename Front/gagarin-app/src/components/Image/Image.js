import './Image.css';
import React from "react";
import { useLocation } from "react-router-dom";

function Image() {
    const location = useLocation();
    const { image, data } = location.state;

    const renderBoundingBoxes = (box) => {
        return (
            <div 
                key={box.label} 
                className="BoundingBox"
                style={{
                    position: 'absolute',
                    top: `${box.box_coords[1] * 100}%`,
                    left: `${box.box_coords[0] * 100}%`,
                    width: `${(box.box_coords[2] - box.box_coords[0]) * 100}%`,
                    height: `${(box.box_coords[3] - box.box_coords[1]) * 100}%`,
                    border: '2px solid red',
                }}
            ></div>
        );
    };

    return (
        <div className="PhotoBlock">
            <div className="PhotoWithBoxes">
                <img src={image} alt="Uploaded" className="RoundedImage"/>
                {data.boxes.map((box) => renderBoundingBoxes(box))}
            </div>
        </div>
    )
}

export default Image;