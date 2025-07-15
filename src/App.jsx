import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CountryDetail from './pages/CountryDetail';
import Header from './components/Header';

export default function App() {
  return (
    <Router>
      <div className="app">
        <Header />

        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/country/:code" element={<CountryDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
