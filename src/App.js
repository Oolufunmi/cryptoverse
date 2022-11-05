import React from 'react'
import {Switch, Route, Link} from 'react-router-dom';
import {Layout,Typography,Space} from 'antd';
import {Navbar} from './components';
import ResponsiveDrawer from './components/Drawer';




const App = () => {
  return (
    <div className="">
    <div className="main">
    <ResponsiveDrawer />
    </div>
    <div >

    </div>
    </div>
  )
}

export default App