import { borrarSesion } from '../utiles/SessionUtil';
import { useNavigate } from 'react-router';
import '../css/hilarystyle.css';
import 'boxicons';


const Header = () => {
  const navegation = useNavigate();

  const handleClick = () => {
    borrarSesion();
    navegation('/login');
    // EN revision xddddddddddddddddddddddddddddddddddddd
  }
  return (


    <header className='header'>
      <input type="checkbox" id='check' />
      <label htmlFor="check" className='icons'>
        <i className='bx bx-menu' id='menu-icon'></i>
        <i className='bx bx-x' id='close-icon'></i>
      </label>
      <nav className='navbar'>
        <a href="/principal" >Home</a>
        <a href="/login">Login</a>
        <a href="/sobreapi">Sobre el API</a>
        <a href="/contactos">Contactos</a>
      </nav>

      {/** <form action="#" className="search-bar">
      <input type="text" placeholder='Buscar...' />
      <button type='submit'><i className='bx bx-search-alt-2'></i></button>
  </form> */}

    </header>
  )
}

export default Header;