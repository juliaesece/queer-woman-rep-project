import React from 'react';

function DetailedCard(props) {
  const couplesArray = props.couples.filter(searchingCouple => searchingCouple.id === props.displayId);
  let couple = couplesArray[0];

  const voteUp = "up-global-vote-id" + couple.id
  const voteDown = "down-global-vote-id" + couple.id

  const voted = (e) => {
    console.log("voted on ")
    console.log(e.target.id)
  }

  const watchedLabel = couple.watchedByUser? "I didn't watch it tho" : "Wait. I did watch it!";
  let coupleDate = new Date(couple.year);
  let coupleYear = coupleDate.getFullYear();

  return (
    <div className="card-updated">
      <img className="card-updated--image" src={couple.image} alt={couple.altImg} />
      <div className="card-updated--content">
        <h3>{couple.person1} and {couple.person2}</h3>
        <p>{couple.originType} — {couple.origin}</p>
        <p><em>Year</em>: {coupleYear}</p>
        <p><em>Global Rating</em>: {couple.globalRating}
        <span className="contenedor-flechas">
        <svg height="20" width="30" >
		    <polygon className="flechas verde" id={voteUp} points="15,00 00,20 30,20" onClick={voted}/>
        </svg>
        <svg height="20" width="30">
		    <polygon className="flechas roja" id={voteDown} onClick={voted} points="15,20 00,00 30,00"/>
        </svg>
        </span>
        </p>
        <p> <em>Watched by user?</em> {couple.watchedByUser? "Yes.":"No."}   <button onClick={() => props.toggleWatched(couple.id)}> {watchedLabel}</button></p>
        <p> <em>Desription</em>: {couple.description}</p>
        <p><em>State of the story</em>: {couple.status}</p>
        <p><em>Ending</em> (hover to reveal): <span className="spoiler">{couple.ending}</span></p>
        <button onClick={props.handleClick}>Quit</button>
    </div>
    </div>
  );
}

export default DetailedCard;
