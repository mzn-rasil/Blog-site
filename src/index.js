import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { UserProvider } from './store/UserContext';
import "overlayscrollbars/css/OverlayScrollbars.css";
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <OverlayScrollbarsComponent
      options={{
        scrollbars: {
          visibility: "auto",
          autoHide: "move"
        }
      }}
    >
      <UserProvider>
        <App />
      </UserProvider>
    </OverlayScrollbarsComponent>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
