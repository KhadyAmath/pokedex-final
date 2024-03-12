import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JsonDataDisplay from './Table';
import Detail from './Detail';
import jsonData from './server/pokedex.json';

function App() {
    const data = jsonData;
    return (
      <Router>
      <div className="App">
        <h1>Pokedex</h1>
        <Routes>
          <Route path="/" element={<JsonDataDisplay data={data} />} />
          <Route path="/detail/:id" element={<Detail data={data} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
            