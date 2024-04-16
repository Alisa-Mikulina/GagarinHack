import 'statics/FetchedFields.css';
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from '../Header/Header';
import Image from '../Image/Image';

function ResultsPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { image, data } = location.state;

    const handleMoreDetails = () => {
        navigate('/more', { state: { image, data } });
    }

    return (
        <div className='Page'>
            <Header />
            <div className="ResultsPage">
                <Image/>
                <div className="FetchBlock">
                    <p>Class: {data.class} ({data.class_sure}%)</p>
                    <p>Page: {data.page} ({data.page_sure}%)</p>
                    <p>Seria: {data.seria}</p>
                    <p>Number: {data.number}</p>
                </div>
                <div className="ResultsButtonBlock">
                    <button className="RedirectButton" onClick={handleMoreDetails}>
                        More details
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ResultsPage;
