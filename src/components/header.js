import React from 'react';
import { Link } from 'react-router-dom';
import {
  HeaderStl, 
  Div, 
  Img,
} from '../styles/header';

import logo from '../assets/logo.svg';
import camera from '../assets/camera.svg';

const Header = _ => {
  return (
    <HeaderStl>
      <Div>
        <Link to='/'>
          <Img src={logo} alt='Insta Clone' />
        </Link>
        <Link to='/new'>
          <Img src={camera} alt='Enviar' />
        </Link>
      </Div>
    </HeaderStl>
  )
};

export default Header;