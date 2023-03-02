import './index.css';
import {CartsProvider} from './context/carts'

import React from "react";
import ReactDOM  from "react-dom/client";
import App from './App'

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(
            <CartsProvider>
                <App/>
            </CartsProvider>
            );