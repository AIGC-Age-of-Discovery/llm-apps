import React,{ useState, useEffect } from 'react'
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import './App.css'

import Home from './components/Home'
import {Layout} from './components/layout'
import { Team } from './components'
import Features from './components/Features'
function App() {

  return (
    <BrowserRouter>
        <Layout>
            
        
        <Routes>
                {/* 嵌套路由 */}
                <Route path="/*" element={<Home/>}/>
                <Route path="/team" element={<Team/>}/>
                <Route path="/features" element={<Features/>}/>
            </Routes>

        </Layout>
    </BrowserRouter>
    
    // <Home/>
  )
}

export default App
