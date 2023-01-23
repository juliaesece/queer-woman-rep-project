import React, {useEffect} from 'react';
// import React, {useState, useEffect} from 'react';
import Section from './Section.js';
import coupleService from './services/couples';

const GlobalCouples = (props) => {
  const couples = props.couples;
  const setCouples = props.setCouples;
  const handleClick = props.handleClick;

  // load couples
  useEffect(() => {
    coupleService
      .getAll()
      .then(response => {
        setCouples(response)
        console.log("got global couples")
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

export default GlobalCouples;
