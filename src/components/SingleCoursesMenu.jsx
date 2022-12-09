import { NavLink } from 'react-router-dom';
import courses from '../data/courses';

const CoursesMenu = () => {
  return (
    <nav>
      {courses.map((link) => (
        <NavLink to={`../${link.slug}`} relative="path" key={link.id}>
          {link.slug}
        </NavLink>
      ))}
    </nav>
  );
};

export default CoursesMenu;
