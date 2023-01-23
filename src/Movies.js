import React, {useEffect} from 'react';
import Section from './Section.js';
import coupleService from './services/couples';

const Movies = (props) => {
  const setCouples = props.setCouples;
  const couples = props.couples;
  const handleClick = props.handleClick;

  // load couples
  useEffect(() => {
    coupleService
      .getMovies ()
      .then(response => {
        setCouples(response)
        console.log("got movie couples")
      })
      .catch(error => {
        console.log('fail in retrieving couples')
        console.log(error)
      })
  }, [setCouples])

  return (
    <div className="section-wrapper">
      <Section handleClick={handleClick} couples={couples} />
    </div>
  )
}

export default Movies;
