import { NavLink } from 'react-router-dom';

const Menu = () => {
  return (
    <nav>
      <NavLink to=".">Home</NavLink>
      <NavLink
        to="about"
        className={({ isActive }) => (isActive ? 'activeLink' : '')}
      >
        About
      </NavLink>
      <NavLink
        to="contacts"
        style={({ isActive }) =>
          isActive
            ? {
                backgroundColor: 'lightyellow',
                textDecoration: 'none',
                cursor: 'unset',
              }
            : {}
        }
      >
        Contacts
      </NavLink>
      <NavLink to="courses" end>
        Courses
      </NavLink>
    </nav>
  );
};

export default Menu;
