import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'

const Navbar = () => {
    return (
        <Menu 
        mode="horizontal" 
        theme="dark" 
        style={{ backgroundColor: '#000000' }}>

        <Menu.Item 
        key="logo" style={{ 
            fontWeight: 'bold', 
            fontSize: '1.2rem', 
            color: '#f5c518' 
        }}>
        <Link to="/">IMDb</Link>
        </Menu.Item>
        </Menu>
    )
}

export default Navbar
