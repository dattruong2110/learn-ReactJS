import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { AppCounter } from './App';
import { Mounted } from './App';
import ChangeTheme from './App';
import { ThemeProvider } from './ThemeContext';
import { AppCountDown } from './App';
import { UpDownCount } from './App';
import { ReactMemo } from './App';
import { Order } from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Fragment>
    <AppCounter />
    <Mounted />
    <ThemeProvider>
    <ChangeTheme />
    </ThemeProvider>
    <AppCountDown />
    <UpDownCount />
    <ReactMemo />
    <Order />
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
