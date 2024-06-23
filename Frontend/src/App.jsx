import './App.css'
import KudosCard_List from './KudosCard_List'
import CardsList from './CardsList'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function App() {

  return (

    /*
      Used browser router to create specific routes for the general board page and then their respective card page. 
    */
    <Router>
      <div className='app_container'>
      <Routes>
        <Route path='/boards' element={ //General board page
          <div>
            <header id='title_container'>
              <h1 id='title'>Kudos Board</h1>
            </header>

            <main className='content'>
              <KudosCard_List />
            </main>
            <footer id='footer_container'>
              <h3>CBN, Creations by Nick</h3>
            </footer>
          </div>
        } />
        <Route path='/boards/:id' element={ //board card page. Uses the board id. 
          <div>
          
            <CardsList />
            <footer id='footer_container'>
              <h3>CBN, Creations by Nick</h3>
            </footer>
          </div>
        } />
      </Routes>
      </div>
    </Router>
  )
}

export default App
