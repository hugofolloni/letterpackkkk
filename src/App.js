import Header from "./Header"
import Home from "./Home"
import Search from "./Search"
import Movie from "./Movie"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/search/:searchText' element={<Search/>}/>
        <Route path='/movie/:movieId' element={<Movie/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
