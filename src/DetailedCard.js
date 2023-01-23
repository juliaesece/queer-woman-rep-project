import React, {useState, useEffect} from 'react';
import coupleService from './services/couples';

function DetailedCard(props) {
  const couplesArray = props.couples.filter(searchingCouple => searchingCouple.id === props.displayId);
  let couple = couplesArray[0];

  const [watched, setWatched] = useState(false);
  const [watchedCount, setWatchedCount] = useState(couple.watchedByUsers.length)
  const [upVotes, setUpVotes] = useState(couple.upVotes.length)
  const [downVotes, setDownVotes] = useState(couple.downVotes.length)
  const [didVoteUp, setDidVoteUp] = useState(false)
  const [didVoteDown, setDidVoteDown] = useState(false)
  const user = props.user || false;

  useEffect(() => {
    if (user != false) {
      let userId = user._id.toString();
      let index = couple.watchedByUsers.findIndex((object) => object.id == userId)
      let votedUpIndex = couple.upVotes.findIndex((id) => id == userId)
      let votedDownIndex = couple.downVotes.findIndex((id) => id == userId)
      if (index == -1) {
        // hasn't watched
        setWatched(false)
      } else {
        // watched
        setWatched(true)
      }

      if(votedUpIndex == -1) {
        // hasn't voted up
        setDidVoteUp(false)
      } else {
        // watched
        setDidVoteUp(true)
      }

      if(votedDownIndex == -1) {
        // hasn't voted down
        setDidVoteDown(false)
      } else {
        // watched
        setDidVoteDown(true)
      }
    } else {
      const user = false;
    }


}, [])

  const voteUp = "up-global-vote-id" + couple.id
  const voteDown = "down-global-vote-id" + couple.id

  const votedUp = (id, couple) => {

    if (user){
      if (didVoteUp) {
      setUpVotes(upVotes - 1)
      setDidVoteUp(false)
    } else {
      setUpVotes(upVotes + 1)
      setDidVoteUp(true)
    }

    if (didVoteDown) {
      setDownVotes(downVotes - 1)
      setDidVoteDown(false)
    }

    coupleService
    .voteUp(id, couple)
    .catch(error => {
      console.log('fail in updating couple')
      console.log(error)
    })
  } else {
    window.alert("Please log in to vote")
  }
  }

  const votedDown = (id, couple) => {
    if (user){
    if (didVoteDown) {
      setDownVotes(downVotes - 1)
      setDidVoteDown(false)
    } else {
      setDownVotes(downVotes + 1)
      setDidVoteDown(true)
    }

    if (didVoteUp) {
      setUpVotes(upVotes - 1)
      setDidVoteUp(false)
    }

    coupleService
    .voteDown(id, couple)
    .catch(error => {
      console.log('fail in updating couple')
      console.log(error)
    })

    } else {
      window.alert("Please log in to vote")
    }
  }

  const toggleWatchedLabel = () => {
    if (watched) {
      setWatched(false)
      setWatchedCount(watchedCount - 1)
    } else {
      setWatched(true)
      setWatchedCount(watchedCount + 1)
    }
  }

  const localHandleClick = () => {
    if (user) {
      props.toggleWatched(couple.id);
      toggleWatchedLabel();
    } else {
      window.alert("Please log in to mark as watched")
    }
  }

  let coupleDate = new Date(couple.year);
  let coupleYear = coupleDate.getFullYear();

  return (
    <div className="card-updated">
      <img className="card-updated--image" src={couple.image} alt={couple.altImg} />
      <div className="card-updated--content">
        <h3>{couple.person1.name} and {couple.person2.name}</h3>
        <p>{couple.originType} — {couple.origin}</p>
        <p><em>Year</em>: {coupleYear}</p>
        <p><em>Global Rating</em>: {couple.globalRating}
        <span className="contenedor-flechas">
        <svg height="20" width="30" >
		    <polygon fill="#829A41" className="flechas verde" id={voteUp} points="15,00 00,20 30,20" onClick={() => {votedUp(couple.id, couple)}}/>
        </svg>

        <span>({upVotes} total)</span>

        <svg height="20" width="30">
		    <polygon fill="#FD694B" className="flechas roja" id={voteDown} onClick={() => {votedDown(couple.id, couple)}} points="15,20 00,00 30,00"/>
        </svg>
        <span>({downVotes} total)</span>
        </span>
        </p>
        <p> <em>Watched by user? </em>
        {watched ? "Yes.":"No."}
        <button className="detailedButton" onClick={localHandleClick}>
        {watched ? "I didn't watch it tho" : "Wait. I did watch it!"}
        </button></p>
        <p>Watched by <em>{watchedCount}</em> users.</p>
        <p> <em>Desription</em>: {couple.description}</p>
        <p><em>State of the story</em>: {couple.status}</p>
        <p><em>Screen time</em>: {couple.screenTime}</p>
        <p><em>Story importance</em>: {couple.storyImportance}</p>
        <p><em>Romantic connection from 1 to 5</em>: {couple.romanticConnection}</p>
        <p><em>Chemistry from 1 to 5</em>: {couple.chemistry}</p><br/>
        <p><em>Enter spoilerland (hover to reveal spoilers)</em></p>
        <p><em>Is coming out a thing</em>: <span className="spoiler">{couple.concerns.comingOut? "Yes" : "No"}</span></p>
        <p><em>Is there cheating on a third party</em>: <span className="spoiler">{couple.concerns.cheating? "Yes" : "No"}</span></p>
        <p><em>How much homophobia from 1 to 5</em>: <span className="spoiler">{couple.concerns.homophobia}</span></p>
        <p><em>Is there death</em>: <span className="spoiler">{couple.concerns.death? "Yes" : "No"}</span></p>

        <p><em>Ending</em>: <span className="spoiler">{couple.ending}</span></p>
        <br/>
        <button  className="detailedButton" onClick={props.handleClick}>Quit</button>
    </div>
    </div>
  );
}

export default DetailedCard;
