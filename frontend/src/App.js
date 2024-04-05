import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Create from './Pages/Create';
import GetData from './Pages/GetData';
import Update from './Pages/Update';
function App() {
  return (
    <div className="App">
      <header className="App-header">
       <Router>
        <Routes>
          <Route path='/' element={<Create/>}/>
          <Route path='/view' element={<GetData/>}/>
          <Route path='/update' element={<Update/>}/>

        </Routes>
       </Router>
      </header>
    </div>
  );
}

export default App;
