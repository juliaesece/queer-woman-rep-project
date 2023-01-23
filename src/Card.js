import React from 'react';

function Card(props) {
  const imgBackground = {
    backgroundImage: "url('" + props.couple.image + "')"
  };
  return (
      <div className="card" style={imgBackground}>
        <div className="card--content" onClick={() => props.handleClick(props.couple.id)}>
          <h3>{props.couple.person1.name? props.couple.person1.name : props.couple.person1} and {props.couple.person2.name? props.couple.person2.name : props.couple.person2}</h3>
          <p className="origin">{props.couple.origin}</p>
        </div>
      </div>
  )
}

export default Card;
