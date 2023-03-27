import React from 'react'
import { Link } from 'react-router-dom'
import { HeaderContainer } from './styles'

const Header = () => {
  return (
    <HeaderContainer>
        <ul>
            <li><Link to="/">Carro</Link></li>
            <li><Link to="/abastecimento">Abastecimento</Link></li>
        </ul>
    </HeaderContainer>
  )
}

export default Header