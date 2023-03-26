import React from 'react'
import { Link } from 'react-router-dom'
import { HeaderContainer } from './styles'

const Header = () => {
  return (
    <HeaderContainer>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/perfil">Perfil</Link></li>
        </ul>
    </HeaderContainer>
  )
}

export default Header