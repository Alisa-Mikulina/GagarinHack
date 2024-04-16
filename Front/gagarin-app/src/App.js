import './App.css';
import MainPage from './components/MainPage/MainPage';
import ResultsPage from './components/ResultsPage/ResultsPage';
import MorePage from './components/MorePage/MorePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/results" element={<ResultsPage />} />
                <Route path="/more" element={<MorePage />} />
            </Routes>
        </Router>
    );
}

export default App;