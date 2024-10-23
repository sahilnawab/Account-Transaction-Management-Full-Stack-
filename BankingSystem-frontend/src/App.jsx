
import { Outlet } from 'react-router-dom'
import './App.css'
import { Header } from './components/index'

function App() {
  

  return (
    <>   
    <div>
      <header><Header/></header>
      </div>
      <div>
      <main>
       <Outlet/>
      </main>
      </div>
    </>
  )
}

export default App
