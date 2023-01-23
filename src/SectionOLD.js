import React from 'react';
import Card from './Card.js';

function Section(props) {
  // aca es cuando se renderean las couples de la seccion principal
  const couples = props.couples;
  const couplesComponents = couples.map(couple => <Card key={couple.id} couple={couple} handleClick={props.handleClick}/>);
  // const displayedCouples = couplesComponents.slice(0,9);
  const displayedCouples = couplesComponents;

  // para updatear a tv
  // para updatear a tv

    return (
      <section className="Section updated-section">
        <h2 id="section-name">Couples</h2>
        <div className="card-list">
          {displayedCouples}
        </div>
        <p> Soon: pages</p>
        <div className="pagination">
          <a href="/home">&laquo;</a>
          <a className="active" href="/home">1</a>
          <a href="/home/1">2</a>
          <a href="/home/2">3</a>
          <a href="/home/3">4</a>
          <a href="/home/4">5</a>
          <a href="/home/5">6</a>
          <a href="/home/6">&raquo;</a>
         </div>
      </section>
    )

}

export default Section;
