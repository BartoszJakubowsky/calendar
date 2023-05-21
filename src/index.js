import './assets/index.css';
import {CalendarsProvider} from './context/calendars'
import {SlotsProvider} from './context/slots'

import React from "react";
import ReactDOM  from "react-dom/client";
import App from './App'
import {BrowserRouter} from 'react-router-dom';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);
const appUrl = window.appUrl || 'domyślny-adres-url';

root.render(
            <BrowserRouter>
            <CalendarsProvider>
                <SlotsProvider>
                    <App/>
                </SlotsProvider>
            </CalendarsProvider>
            </BrowserRouter>
            );