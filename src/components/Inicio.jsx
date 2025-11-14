import { createContext, useState } from 'react'
import Footer from "./Footer";
import { Outlet } from 'react-router-dom';

export const UserContext = createContext(null)

function App() {
  const [count, setCount] = useState(0);
  const [prefUser, setPrefUser] = useState([])

  return (
    <>
      <UserContext value={[prefUser, setPrefUser]}>
        <Outlet></Outlet>
        <Footer />
      </UserContext>
    </>
  )
}

export default App
