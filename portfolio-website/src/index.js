import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

export const GlobalImageHandler = ({ children }) => {
  useEffect(() => {
    const handleError = (e) => {
      if (e.target.tagName === "IMG") {
        e.target.src = "/assets/placeholder.png";
      }
    };
    document.addEventListener("error", handleError, true);
    return () => document.removeEventListener("error", handleError, true);
  }, []);

  return children;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalImageHandler>
      <App />
    </GlobalImageHandler>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
