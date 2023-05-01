import './index.css';
import {CalendarsProvider} from './context/calendars'

import React from "react";
import ReactDOM  from "react-dom/client";
import App from './App'

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);
const appUrl = window.appUrl || 'domyślny-adres-url';

root.render(
            <CalendarsProvider>
                <App/>
            </CalendarsProvider>
            );