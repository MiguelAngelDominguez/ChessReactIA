import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './reset.css'
import './normalize.css'
import './index.css'


import registerServiceWorker from "./registerServiceWorker";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="">
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>

    {/* <Header />
    <Body /> */
    /* <Footer /> */}
  </React.StrictMode>,
)
registerServiceWorker();