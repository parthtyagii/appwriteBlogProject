import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (auth) {
      authService.getCurrentUser()
        .then((userData) => {
          if (userData) {
            dispatch(login({ userData }));
          }
          else {
            dispatch(logout());
          }
        })
    }
    setLoading(false);
  }, []);

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400 '>
      <div className='w-full block '>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>

    </div>
  ) : null;
}

export default App
