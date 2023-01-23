import React, {useEffect, useState}  from 'react';
import coupleService from './services/couples';
import Card from './Card.js';
import DetailedCard from './DetailedCard.js';
import Pagination from './Pagination.js';

function Section(props) {
  const [couples, setCouples] = useState([])
  const [display, setDisplay] = useState(0);
  const [popUp, setPopUp] = useState(false);

  useEffect(() => {
    if (props.initialCoupleType != '') {
      console.log("modifying to initial couple type")
      props.modifyCoupleType(props.initialCoupleType)
    }
    console.log("first section useEffect finished running")
  }, [])

  useEffect(() => {
    coupleService
      .expGet(props.coupleType)
      .then(response => {
        setCouples(response)
      })
      .catch(error => {
        console.log('fail in retrieving couples')
        console.log(error)
      })
      console.log("second section useEffect finished running (watches coupleType)")
  }, [props.coupleType])

  // handle clicks for modal
  const handleClick = (newId) => {
    // esto dice que hay que mostrar la detailed card
    setPopUp(popUp => !popUp);
    // esto le comunica a detailed card qué card mostrar
    setDisplay(newId);
  }

  //toggle watched in modal/detaled card
  const toggleWatchedOf = id => {
    // encuentra la couple al que hay que toggle el watch
    const couple = couples.find(c => c.id === id)
    console.log("toggleWatchedOf activado desde App.js")

    // cambia la couple en el servidor, luego cambia la variable (couples) con el que está funcionando la página
    coupleService
      .toggleWatchedDB(id, couple)
      // .then(response => {
      //   setCouples(couples.map(couple => couple.id !== id ? couple : response.data))
      // })
      .catch(error => {
        console.log('fail in updating couple')
        console.log(error)
      })
  }

  // aca es cuando se renderean las couples de la seccion principal

  const couplesComponents = couples.map(couple => <Card key={couple.id} couple={couple} handleClick={handleClick}/>);
  const displayedCouples = couplesComponents;

    return (
      <section className="Section updated-section">
        {popUp && <DetailedCard
          handleClick={handleClick}
          displayId={display}
          couples={couples}
          toggleWatched={toggleWatchedOf}
          user={props.user} />}

        <div className="card-list">
          {displayedCouples}
        </div>

        <Pagination />

      </section>
    )
}

export default Section;
