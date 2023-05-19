import React, {Suspense} from 'react';
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

import LoadingIcon from './components/ui/LoadingIcon'

const LazyCalendarPage = React.lazy(()=> import('./pages/Calendar/CalendarPage'));

function App()
{
      const {isAdmin} = useAuthenctication();
      const {login, calendars, calendarToEdit, currentPath} = useCalendars();
      const location = useLocation();

      const formsPaths = ['/logowanie', '/haslo', '/rejestracja'];
      const calendarPage = () =>         
      {
            const variantsForSuspense = 
            {
                  hidden: { opacity: 0, x: -200, y: 0 },
                  enter: { opacity: 1, x: 0, y: 0 },
                  exit: { opacity: 0, x: 0, y: -100 },
            }

            return (
                  <Suspense fallback={
                        <m.div className='absolute inset-0 justify-center bg-red-200 items-center flex' variants={variantsForSuspense} initial='hidden' animate='enter' transition={{type: 'linear'}} exit={{x: 200, transition: 0.2 }}>
                              <LoadingIcon classname={' fill-red-500'}></LoadingIcon>
                        </m.div>}>
      
                        <LazyCalendarPage/>
                  </Suspense>
            )
      }
            
      

        return (<>
                  <AnimatePresence mode='wait'>
                        <Routes key={location.pathname} location={location}>
                              <Route path='/' element={<MainPage/>}/>

                              {formsPaths.map(form =><Route path={form} key={form} element={<LoginPage replace/>}/>)}
                              
                              <Route path='/kalendarz/:calendarName' element={calendarPage()}></Route>
                              
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
                              <Route path='*'element={<NotFoundPage/>}/>

                        </Routes>

                  </AnimatePresence>
                  </>)
}

export default App; 