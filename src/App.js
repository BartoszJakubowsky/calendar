import React, {lazy,Suspense} from 'react';
import { Route, Routes, useLocation} from 'react-router-dom';
import {motion as m} from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

import useCalendars from './hooks/useCalendars';
import useAuthenctication from './hooks/useAuthentication';

import LoginPage from './pages/Login/LoginPage'
import MainPage from './pages/Main/MainPage'
import AdminPage from './pages/Admin/AdminPage'
import CreateCalendarPage from './pages/Create/CreateCalendarPage'
import NotFoundPage from './pages/NotFound/NotFoundPage'

import LoadingPage from './pages/Loading/LoadingPage';
const LazyCalendarPage = lazy(()=> import('./pages/Calendar/CalendarPage'));

function App()
{
      const {isAdmin} = useAuthenctication();
      const {login, calendars, calendarToEdit, currentPath} = useCalendars();
      const location = useLocation();

      const formsPaths = ['/logowanie', '/haslo', '/rejestracja'];

        return (<>
                  <AnimatePresence mode='wait'>
                        <Routes key={location.pathname} location={location}>
                              <Route path='/' element={<MainPage/>}/>

                              {formsPaths.map(form =><Route path={form} key={form} element={<LoginPage replace/>}/>)}
                              
                        
                              <Route path='/kalendarz/:calendarName' element={<Suspense fallback={<LoadingPage/>}><LazyCalendarPage/></Suspense>}></Route>
                              
                              {isAdmin && 
                              <>
                              <Route path='/ustawienia' element={
                                    <CreateCalendarPage 
                                    calendarName={calendarToEdit?.name} 
                                    calendarDate={calendarToEdit?.date} 
                                    calendarTime={calendarToEdit?.time} 
                                    calendarSlots={calendarToEdit?.slots}
                                    calendarId={calendarToEdit?.id}/>}/>
                              <Route path='/admin' element={<AdminPage/>}/>   
                              </>}
                              <Route path='*'element={<NotFoundPage replace/>}/>

                        </Routes>
                  </AnimatePresence>
                  </>)
}

export default App; 