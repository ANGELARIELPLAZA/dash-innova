import './asssets/css/App.css';
//importamos los componentes
import CompShowDatas from './data/ShowDatas';
//importamos el router
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='/' element={ <CompShowDatas />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
