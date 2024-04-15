// App.js
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Create from './pages/Create';
import Mynfts from './pages/Mynfts';
// import Marketplace from './pages/Marketplace';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/create" component={Create} />
        <Route path="/mynfts" component={Mynfts} />
        <Route path="/home" component={Home} />
      </div>
    </Router>
  );
}

export default App;
