
//to do: db
//repair back and forward 
//create create user 
//post/delete calendars
//websockets connections per calendar









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
import { useEffect } from 'react'

function App()
{
      const {isAdmin} = useAuthenctication();
      const {login, calendars, calendarToEdit} = useCalendars();


        
      const calendarsRoutes = calendars.map(calendar=>
            {
                  if (calendar.name === undefined)
                  return false;
                  
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
                  {isAdmin && <Route path='ustawienia'
                                     key='ustawienia'>
                                    <CreateCalendarPage 
                                    calendarName={calendarToEdit?.name} 
                                    calendarDate={calendarToEdit?.date} 
                                    calendarTime={calendarToEdit?.time} 
                                    calendarSlots={calendarToEdit?.slots}/>
                              </Route>}
            </div>
}

export default App; 