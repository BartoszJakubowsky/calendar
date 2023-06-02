import React, {lazy,Suspense, useEffect} from 'react';
import { Route, Routes, useLocation, useNavigate, Navigate} from 'react-router-dom';
import { AnimatePresence, visualElementStore } from 'framer-motion';

import useCalendars from './hooks/useCalendars';
import useAuthentication from './hooks/useAuthentication';

import LoginPage from './pages/Login/LoginPage'
import MainPage from './pages/Main/MainPage'
import NotFoundPage from './pages/NotFound/NotFoundPage'
import LoadingPage from './pages/Loading/LoadingPage';
import UserPage from './pages/User/UserPage';
const CreateCalendarPage = lazy(()=> import( './pages/Create/CreateCalendarPage'));
const AdminPage = lazy(()=> import( './pages/Admin/AdminPage'));
const LazyCalendarPage = lazy(()=> import('./pages/Calendar/CalendarPage'));

function App()
{
      const {isAdmin, isAuthenticated} = useAuthentication();
      const {calendarToEdit} = useCalendars();
      const formsPaths = ['/logowanie', '/haslo', '/rejestracja'];
      const location = useLocation();
      const navigate = useNavigate();
      console.log(location.pathname);
      useEffect(()=>
      {
            if (isAuthenticated)
            {
                  if (location.pathname === '/logowanie')
                        navigate('/', { replace: true });
                  else
                  {
                        navigate(location.pathname)
                  }
                  
            }

      }, [isAuthenticated])

      const suspenseElement = (child) =>
      {
            return (
            <Suspense fallback={<LoadingPage/>}>
                  {child}
            </Suspense>
            )
      }             
      




      if (isAuthenticated === false)
      return (
            <AnimatePresence mode='wait'>
                        <Routes key={location.pathname} location={location}>
                              <Route path='/logowanie'element={<LoginPage replace/>}/>
                              <Route path='*'element={<Navigate to='/logowanie' replace/>}/>
                        </Routes>
                  </AnimatePresence>
      )

      if (isAuthenticated === null)
      return (
            <AnimatePresence mode='wait'>
                        <Routes key={location.pathname} location={location}>
                              <Route path='/'element={<LoadingPage replace/>}/>
                              <Route path='*'element={<Navigate to='/' replace/>}/>
                        </Routes>
                  </AnimatePresence>
      )
      return (<>
                  <AnimatePresence mode='wait'>
                        <Routes key={location.pathname} location={location}>
                              <Route path='/' element={<MainPage/>}/>
                              {formsPaths.map(form =><Route path={form} key={form} element={<LoginPage replace/>}/>)}
                              <Route path='/kalendarz/:calendarName' element={suspenseElement(<LazyCalendarPage/>)}></Route>
                              <Route path='/konto' element={<UserPage/>}></Route>
                              {isAdmin && 
                              <>
                              {calendarToEdit? <Route path='/ustawienia' element={
                                    suspenseElement(<CreateCalendarPage 
                                    calendarName={calendarToEdit?.name} 
                                    calendarDate={calendarToEdit?.date} 
                                    calendarTime={calendarToEdit?.time} 
                                    calendarSlots={calendarToEdit?.slots}
                                    calendarBannedDays={calendarToEdit?.bannedDays}
                                    calendarAutoMonth={calendarToEdit?.autoMonth}
                                    calendarId={calendarToEdit?._id}
                                    />)}
                                    /> : <Route path='/ustawienia' element={suspenseElement(<CreateCalendarPage/>)}
                                          />}
                              <Route path='/admin' element={suspenseElement(<AdminPage/>)}/>   
                              </>}
                              <Route path='/'element={<NotFoundPage replace/>}/>
                              
                        </Routes>
                  </AnimatePresence>
                  </>)
}

export default App; 