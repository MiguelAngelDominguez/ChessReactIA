import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { PlayChess } from "./pages/PlayChess.jsx";

export const App = () => {
    return (
        <>
            <Routes>
                <Route path="/">
                    <Route index element={<Home />} />
                    <Route path="/play" element={<PlayChess />} />
                </Route>
            </Routes>
        </>
    )
}