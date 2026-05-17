import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './Components/Header/Header.jsx'
import Nav from './Components/Nav/Nav.jsx'

import Home from './Pages/Home/Home.jsx'
import Characters from './Pages/Characters/Characters.jsx'
import CharacterDetail from './Pages/CharacterDetail/CharacterDetail.jsx'
import FilterBySpecies from './Pages/FilterBySpecies/FilterBySpecies.jsx'
import SearchResults from './Pages/SearchResults/SearchResults.jsx'
import Error from './Pages/Error/Error.jsx'

function App() {
  return (
    <Router>
      <Header />
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/characters' element={<Characters />} />
        <Route path='/characters/:id' element={<CharacterDetail />} />
        <Route path='/filter/:species' element={<FilterBySpecies />} />
        <Route path='/search/:query' element={<SearchResults />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App