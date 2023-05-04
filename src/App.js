
//to do: db
//repair back and forward 
//create create user 
//post/delete calendars
//websockets connections per calendar









import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import AdminUserPage from './pages/AdminUserPage'
import CreateCalendarPage from './pages/CreateCalendarPage'
import NotFoundPage from './pages/NotFoundPage'
import Menu from './components/Menu'
//only for test purpusses -> at the end it's goint to be admin
import useCalendars from './hooks/useCalendars';
import useAuthenctication from './hooks/useAuthentication';
import CalendarPage from './pages/calendarPage/CalendarPage'
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation} from 'react-router-dom'
function App()
{
      const {isAdmin} = useAuthenctication();
      const {login, calendars, calendarToEdit, currentPath} = useCalendars();
      const location = useLocation();

      const formsPaths = ['/logowanie', '/haslo', '/rejestracja'];

      const calendarsRoutes = calendars.map(calendar=>
            {
                  if (calendar.name === undefined || calendar.name === '')
                  return false;
                  const name = '/' + (calendar.name).replaceAll(' ', '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                  return <Route path={name} element={<CalendarPage calendar={calendar}/>}/>;
                              
            });
        
        return (<>
                  <AnimatePresence initial={false} mode='wait'>
                  {formsPaths.includes(currentPath)? false : <Menu className='flex'/>}
                  <Routes key={location.pathname} location={location}>
                        <Route path='/' element={<MainPage/>} replace/>
                        {formsPaths.map(form => {return <Route path={form} element={<LoginPage/>}/>})}
                              
                  {calendarsRoutes}
                  {/* {login &&
                  <Route path='/admin'
                         key='admin'>
                        <AdminUserPage/>
                  </Route>} */}
                  {isAdmin && <Route path='/ustawienia'
                                     element={
                                    <CreateCalendarPage 
                                    calendarName={calendarToEdit?.name} 
                                    calendarDate={calendarToEdit?.date} 
                                    calendarTime={calendarToEdit?.time} 
                                    calendarSlots={calendarToEdit?.slots}
                                    calendarId={calendarToEdit?.id}/>}/>}
                        <Route path='*'element={<NotFoundPage/>}/>
                  </Routes>
                  </AnimatePresence>
                  </>)
}

export default App; 