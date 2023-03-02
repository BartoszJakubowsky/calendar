//import MainPage
//import LoginPage

//check admin -> dynamic require


//check in cookies if user is cerivied -> 
//set login
//set MainPage

import Route from './components/Route'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import AdminUserPage from './pages/AdminUserPage'

//only for test purpusses -> at the end it's goint to be admin
import useCarts from './hooks/useCarts';

function App()
{

      const {login} = useCarts();

      return <div className='flex justify-center items-center'>
                  <Route path='/'>
                        <MainPage/>
                  </Route>
                  <Route path='login'>
                        <LoginPage/>
                  </Route>
                  {login &&
                  <Route path='admin'>
                        <AdminUserPage/>
                  </Route>}
            </div>
}

export default App; 