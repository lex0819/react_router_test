import { useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import courses from '../data/courses';
import SingleCoursesMenu from './SingleCoursesMenu';
// import NotFound from './NotFound';

const Course = () => {
  const params = useParams(); //params from URL in browser (object)
  const navigate = useNavigate(); //redirect to another page
  /*   const location = useLocation(); // object with all URL location from browser
  console.log(location);
 */
  const course = courses.find((course) => course.slug === params.courseSlug);

  //redirect only into hook useEffect
  //We need to add all dependencies!
  //navigate() because it starts running in hook and
  //course because hook have to start only when it is changed.
  useEffect(() => {
    if (!course) {
      navigate('..', { relative: 'path' });
    }
  }, [course, navigate]);

  // Simply show 404 Not Found with link to all courses
  /*   if (!course) {
    return (
      <>
        <NotFound />
        <Link to=".." relative="path">
          <h3>All courses</h3>
        </Link>
      </>
    );
  }
 */
  return (
    <>
      <SingleCoursesMenu />
      <h1>{`Course ${course?.title}`}</h1>
      <h2>id is {course?.id}</h2>
      <h3>slug is {course?.slug}</h3>
    </>
  );
};

export default Course;
