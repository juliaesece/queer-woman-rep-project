import React from 'react';
import coupleService from './services/couples';

function Aside(props) {

const handleHappies = () => {
  props.modifyCoupleType('/happy-ending')
}

const moreDiversity = () => {
  props.modifyCoupleType('/more-diversity')
}

const getPopularity = () => {
    props.modifyCoupleType('/popularity')
}

const getMostLiked = () => {
  props.modifyCoupleType('/most-liked')
}

const getRecentlyAdded = () => {
  props.modifyCoupleType('/recently-added')
}

const getNewest = () => {
  props.modifyCoupleType('/newest')
}


  return (
    <aside className="Aside">
      <ul>
        <li className="notReady"> Most popular and liked</li>
        <li className="Left" onClick={getPopularity}>Most popular</li>
        <li className="Left" onClick={getMostLiked}>Most liked</li>
        <li className="Left" onClick={getRecentlyAdded}>Recently added</li>
        <li className="Left" onClick={getNewest}>Most recent releases</li>
        <li className="Left" onClick={moreDiversity}>Give me more diversity!</li>
        <li className="notReady">Hidden gems?</li>
        <li className="Left" onClick={handleHappies}>Happy endings </li>
      </ul>
    </aside>
  );
}

export default Aside;
