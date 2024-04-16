import './MainPage.css';
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from '../Header/Header';
import { Buffer } from 'buffer';

function MainPage() {
    
    const navigate = useNavigate();
    const serverHost = "192.168.31.219";
    const serverPort = 8000;

    const inputRef = React.useRef(null);
    const handleClick = React.useCallback(() => inputRef.current?.click(), []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

            fetch(`http://${serverHost}:${serverPort}/detect/phone`, {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                    'Access-Control-Allow-Credentials': true
                },
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                navigate('/results', { state: { image: URL.createObjectURL(file), data: data } });
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className='Page'>
            <Header />
            <div className="MainPage">
                <div className="PageText">
                    Мы предоставляем самый<br />
                    точный сервис<br />
                    по распознаванию<br />
                    информации на<br />
                    документах с<br />
                    помощью AI-driven<br />
                    решений
                </div>
                <div className="ButtonBlock">
                    <div className="UploadButton" onClick={handleClick}>
                        <img src="/PhonePlus.svg" className="PhonePlus" alt="plus" />
                        <input type="file" src="/PhonePlus.svg" id="FileInput" ref={inputRef} onChange={handleFileChange} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;