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
import CreateCalendarPage from './pages/CreateCalendarPage'


//only for test purpusses -> at the end it's goint to be admin
import useCalendars from './hooks/useCalendars';
import useAuthenctication from './hooks/useAuthentication';
import CalendarCard from './components/CalendarCard'
import CalendarPage from './pages/calendarPage/CalendarPage'

function App()
{
      const {isAdmin} = useAuthenctication();
      const {login, calendars} = useCalendars();

      const calendarsRoutes = calendars.map(calendar=>
            {
                  const name = (calendar.name).replaceAll(' ', '_');

                  return(<Route path={name}
                               key={name}> 
                              <CalendarPage calendar={calendar}/>
                        </Route>) 
            });
      return <div className='flex justify-center items-center'>
                  <Route path='/'
                         key='/'>
                        <MainPage/>
                  </Route>
                  <Route path='login'
                         key='login'>
                        <LoginPage/>      
                  </Route>
                  {calendarsRoutes}
                  {login &&
                  <Route path='admin'
                         key='admin'>
                        <AdminUserPage/>
                  </Route>}
                  {isAdmin && <Route path='stwórz_wózek'
                                     key='stwórz_wózek'>
                                    <CreateCalendarPage/>
                              </Route>}
            </div>
}

export default App; 