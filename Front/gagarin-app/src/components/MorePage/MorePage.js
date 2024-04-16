import 'statics/FetchedFields.css';
import React from "react";
import { useLocation } from "react-router-dom";
import Header from '../Header/Header';
import Image from '../Image/Image';

function MorePage() {
    const location = useLocation();
    const { data } = location.state;


    return (
        <div className='Page'>
            <Header />
            <div className="ResultsPage">
                <Image/>
                <div className="FetchBlock">
                    <p>Class: {data.class}</p>
                    <p>Page: {data.page}</p>
                </div>
                <div className="FetchBlock">
                    {data.boxes.map((box, index) => (
                        <div key={index} className="BoxInfo">
                            <p>Label: {box.label}</p>
                            <p>Confidence: {box.confidence}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MorePage;
