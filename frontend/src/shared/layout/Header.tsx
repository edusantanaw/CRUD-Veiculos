import React from 'react'
import { Link } from 'react-router-dom'
import { HeaderContainer } from './styles'
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../hooks/useAuth';

const Header = () => {

  const {logout} = useAuth()

  return (
    <HeaderContainer>
        <ul>
            <li><Link to="/">Carro</Link></li>
            <li><Link to="/abastecimento">Abastecimento</Link></li>
            <li onClick={logout}><LogoutIcon /></li>
        </ul>
    </HeaderContainer>
  )
}

export default Header