import React, {useEffect} from 'react';
// import React, {useState, useEffect} from 'react';7
import Section from './Section.js';
import coupleService from './services/couples';

const TvShows = (props) => {
  const setCouples = props.setCouples;
  const couples = props.couples;
  const handleClick = props.handleClick;

  // load couples
  useEffect(() => {
    coupleService
      .getTvShows()
      .then(response => {
        setCouples(response)
        console.log("got tvshow couples")
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

export default TvShows;
