import './App.css'
import KudosCard_List from './KudosCard_List'
import CardsList from './CardsList'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function App() {

  return (
      <Router>
        <Routes>
          <Route path='/' element={
            <div>
                  <header id='title_container'>
                    <h1 id='title'>Kudos Board</h1>
                  </header>
                  <main>
                    <KudosCard_List />
                  </main>
                  <footer id='footer_container'>
                    <h3>CBN, Creations by Nick</h3>
                  </footer>
            </div>
          } />
          <Route path='/:id' element={
            <div>
              <header id="title_container">
                <h1>Board</h1>
              </header>
              <CardsList />
              
            </div>
          }/>
        </Routes>
      </Router>
  )
}

export default App
