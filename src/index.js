import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Dictionary from './routes/dictionary';
import Addwords from './routes/addwords'
import {
  // createBrowserRouter,
  HashRouter,
  Route,
  Routes,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

// const router = createBrowserRouter([
//   {
//     path:"/",
//     element: <App />,
//   },
//   {
//     path: "/dictionary",
//     element: <Dictionary />,
//   },
//   {
//     path: "/addwords",
//     element: <Addwords />,
//   }
// ])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <RouterProvider router={router} />
  <HashRouter>
    <Routes>
      <Route path='/' element={<App />}></Route>
      <Route path='/dictionary' element={<Dictionary />}></Route>
      <Route path='/addwords' element={<Addwords />}></Route>
    </Routes>
  </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
