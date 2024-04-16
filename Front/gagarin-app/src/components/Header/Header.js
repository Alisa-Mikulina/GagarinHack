import './Header.css';
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    const handleHomeRedirect = () => {navigate('/');}

    return (
        <div className="FullHeader">
            <div className="Header" onClick={handleHomeRedirect}> 
                <img src="/rocket.svg" className="Rocket-logo" alt="logo" />
                <h2 className="Header-name">кыр сосичка</h2>
            </div>
        </div>
    );
}

export default Header;
