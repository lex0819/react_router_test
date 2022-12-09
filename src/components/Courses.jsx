import { Link, useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import courses from '../data/courses';
import CoursesMenu from './CoursesMenu';

// const SORT_KEYS = ['title', 'id', 'slug']; //allowed keys for sort
const SORT_KEYS = Object.keys(courses[0]); //allowed keys for sort
// console.log('SORT_KEYS', SORT_KEYS);

function sortCourses(courses, key) {
  if (!key || !SORT_KEYS.includes(key)) {
    // console.log('key', key);
    return courses;
  }
  let sortedCourses = [...courses];
  sortedCourses.sort((a, b) => (a[key] > b[key] ? 1 : -1));
  return sortedCourses;
}

const Courses = () => {
  const location = useLocation();
  const query = queryString.parse(location.search);
  // console.log(query); get query.sort because we put query string parametr 'sort' to URL
  const navigate = useNavigate();
  const [sortKey, setSortKey] = useState(query?.sort);
  const [sortedCourses, setSortedCourses] = useState(
    sortCourses(courses, sortKey)
  );

  useEffect(() => {
    if (!SORT_KEYS.includes(sortKey)) {
      //only if sortKey equal one of elements allowed keys for sort
      setSortKey(); //we set sortKey = undefined
      setSortedCourses([...courses]);
      navigate('.', { relative: 'path' }); //redirect to page fro all courses
    }
  }, [sortKey, navigate]);

  function selectSortCourses(sortKey) {
    setSortKey(sortKey);
    setSortedCourses(sortCourses(courses, sortKey));
    navigate(`?sort=${sortKey}`, { relative: 'path' });
  }

  return (
    <>
      <CoursesMenu />
      {
        <select
          onChange={(e) => selectSortCourses(e.target.value)}
          value={sortKey ? sortKey : 'unsorted'}
        >
          <option value="unsorted">unsorted</option>
          {SORT_KEYS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      }
      <h1>{sortKey ? `Courses was sorted by ${sortKey}` : 'Courses'}</h1>
      {sortedCourses.map((course) => (
        <div key={course.id} className="coursesList">
          <Link to={course.slug}>{course.title}</Link>
        </div>
      ))}
    </>
  );
};

export default Courses;
