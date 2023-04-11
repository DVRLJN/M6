import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import Context from './components/Context';
import reportWebVitals from './reportWebVitals';
import {RouterProvider, createBrowserRouter } from 'react-router-dom';
import Lists from './pages/Lists';
import Search from './pages/Search';
import DirectorDetail from './pages/DirectorDetail';


const root = ReactDOM.createRoot(document.getElementById('root')); 
const router = createBrowserRouter([
  { path: "/",
    element:  <App/>
  },
  { path:"/lists",
    element:  <Lists/>
  },
  { path:"/search",
    element:  <Search/>
  },
  {
    path:"director-detail/:id/:nom",
    element: <DirectorDetail/>
  }
])

root.render(
  <React.StrictMode>
    <Context>
      <RouterProvider router={router} />
    </Context>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
