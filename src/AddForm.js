import React, {useState} from 'react';
import coupleService from './services/couples';
import FormStatus from './FormStatus';
import Countries from './Countries';
import Notification from './Notification';

function AddForm(props) {

  const [message, setMessage] = useState("")
  const setIsAddFormFalse = props.setIsAddFormFalse;

  const updateSetCouples = props.updateSetCouples;
  const user = props.user;
  const emptyCouple = {
    person1name: "",
    person1gender: "",
    person1sexualOrientation: "",
    person1genderIdentity: "",
    person1genderExpression: "",
    person1Ethnicity: [],
    person1Nationality:"",
    person1moreThanOneCountry: false,
    person1secondNationality: "",
    person1lifeStage: "",
    person2name: "",
    person2gender: "",
    person2sexualOrientation: "",
    person2genderIdentity: "",
    person2genderExpression: "",
    person2Ethnicity: [],
    person2Nationality: "",
    person2moreThanOneCountry: false,
    person2secondNationality: "",
    person2lifeStage: "",
    origin: "",
    originType: "",
    year: "",
    status: "",
    description: "",
    isThereQueerCreators: false,
    queerDirectors: false,
    image: "",
    altImg: "",
    coupleDescription: "",
    coupleDescriptionIsSpoiler: false,
    screenTime: "",
    storyImportance: "",
    globalRating: "",
    romanticConnection: "",
    chemistry: "",
    ending: "",
    concernsComingOut: "",
    concernsDeath: "",
    concernsCheating: "",
    concernsHomophobia: ""
    }


  const [newCouple, setNewCouple] = useState(emptyCouple);


// add type and checked when different form
  const handleNoteChange = (event) => {

    const {name, value, type, checked} = event.target;

    type === "checkbox" ? setNewCouple({...newCouple, [name]: checked }) : setNewCouple({...newCouple, [name] : value});
    console.log(newCouple);
  }

  const handleCheckbox1= (event) => {

    const {name, value, type, checked} = event.target;
    let oldArray = newCouple.person1Ethnicity
    let newArray = [value]
    console.log("old array", oldArray)
    console.log("new array", newArray)
    let finalArray = oldArray.concat(newArray)
    console.log("final array", finalArray)
    setNewCouple({...newCouple, [name] : finalArray});
    console.log(newCouple)
  }

  const handleCheckbox2= (event) => {

    const {name, value, type, checked} = event.target;
    let oldArray = newCouple.person2Ethnicity
    let newArray = [value]
    console.log("old array", oldArray)
    console.log("new array", newArray)
    let finalArray = oldArray.concat(newArray)
    console.log("final array", finalArray)
    setNewCouple({...newCouple, [name] : finalArray});
    console.log(newCouple)
  }

  //validation function

  const validate = (couple) => {
    console.log("validate activated, couple: ", couple)
    if (user === null) {
      window.alert("You must be logged in to add couples to the database")
      return false;
    } else if (couple.person1.name.length <= 2) {
      window.alert("Person 1 name has to have at least 2 characters")
      return false;
    } else if (couple.person2.name.length <= 2) {
      window.alert("Person 2 name has to have at least 2 characters")
      return false;
    } else if (couple.origin.length <= 2) {
      window.alert("The origin of the couple must have at least 2 characters")
      return false;
    } else if (couple.originType.length <= 2) {
      window.alert("The type of the origin of the couple (tv show, movie, etc.) must be specified")
      return false;
    } else if (couple.image.length <= 2) {
      window.alert("An image must be provided")
      return false;
    } else {
      return true;
    }
    console.log("se llegó al fin del validate")
  }

  //add couple

const addCouple = (event) => {
  event.preventDefault()
  console.log('button clicked', event.target)
  const noteObject = {
    person1: {
      name: newCouple.person1name,
      gender: newCouple.person1gender,
      sexualOrientation: newCouple.person1sexualOrientation,
      genderIdentity: newCouple.person1genderIdentity,
      genderExpression: newCouple.person1genderExpression,
      ethnicity: newCouple.person1Ethnicity,
      nationality: newCouple.person1Nationality,
      multipleNationalities: newCouple.person1moreThanOneCountry,
      secondNationality: newCouple.person1secondNationality,
      lifeStage: newCouple.person1lifeStage},
    person2: {
      name: newCouple.person2name,
      gender: newCouple.person2gender,
      sexualOrientation: newCouple.person2sexualOrientation,
      genderIdentity: newCouple.person2genderIdentity,
      genderExpression: newCouple.person2genderExpression,
      ethnicity: newCouple.person2Ethnicity,
      nationality: newCouple.person2Nationality,
      multipleNationalities: newCouple.person2moreThanOneCountry,
      secondNationality: newCouple.person2secondNationality,
      lifeStage: newCouple.person2lifeStage},
    origin: newCouple.origin,
    originType: newCouple.originType,
    year: new Date(newCouple.year),
    status: newCouple.status,
    description: newCouple.description,
    isThereQueerCreators:  newCouple.isThereQueerCreators,
    queerDirectors: newCouple.queerDirectors,
    image: newCouple.image,
    altImg: newCouple.altImg,
    coupleDescription: newCouple.coupleDescription,
    coupleDescriptionIsSpoiler: newCouple.coupleDescriptionIsSpoiler,
    screenTime: newCouple.screenTime,
    storyImportance: newCouple.storyImportance,
    globalRating: Number(newCouple.globalRating),
    romanticConnection: Number(newCouple.romanticConnection),
    chemistry: Number(newCouple.chemistry),
    ending: newCouple.ending,
    concerns: {
      comingOut: newCouple.concernsComingOut,
      death: newCouple.concernsDeath,
      cheating: newCouple.concernsCheating,
      homophobia: Number(newCouple.concernsHomophobia)
    },
    watchedByUser: false,
    dateAdded: new Date().toISOString()
}

if (noteObject.originType === "Movie") {
  noteObject.status = "Finished"
}

if (noteObject.concerns.comingOut === "true") {
  noteObject.concerns.comingOut = true
} else {
  noteObject.concerns.comingOut = false
}

if (noteObject.concerns.death === "true") {
  noteObject.concerns.death = true
} else {
  noteObject.concerns.death = false
}

if (noteObject.concerns.cheating === "true") {
  noteObject.concerns.cheating = true
} else {
  noteObject.concerns.cheating = false
}

  console.log("noteObject", noteObject);

  if(validate(noteObject)) {
    // servicio de enviar cosas

  setMessage("Couple added successfully")
  setTimeout(() => {
    setMessage(null)
    setIsAddFormFalse(false)
  }, 5000)

  coupleService
    .create(noteObject)
    .then(returnedCouple => {
      props.updateSetCouples(returnedCouple);
      setNewCouple(emptyCouple);
    })
    .then(
      // props.handleFormClick()
    )
    .catch(error => {
      console.log('fail in creating couple')
    })
  } else {
    console.log("validate failed")
  }



}


  return (
    <div className="add-form">
      <form className="add-form--form" onSubmit={addCouple}>
      <span className="exit-form" onClick={props.handleFormClick}>&times;</span> <br />

      {user === null && <h2>You must be logged in to add couples to the database</h2>}

      <ul>

        <h3>The couple</h3> <br/>

      <p>Person 1</p> <br />
      <li className="short name">
        <label htmlFor="person1">Name:<span className="form-required">*</span></label>
        <input
          placeholder="First name"
          name="person1name"
          value={newCouple.person1name} onChange={handleNoteChange}/>
      </li>

      <li className="short name">
        <label htmlFor="person1-gender">Gender:</label>
        <select name="person1gender"  value={newCouple.person1gender} onChange={handleNoteChange}>
          <option value="default">-----</option>
          <option value="Woman">Woman</option>
          <option value="Non-Binary">Non-Binary</option>
          <option value="Other">Other</option>
        </select>
      </li>

      <li className="short name">
        <label htmlFor="person1-orientation">Sexual orientation:</label>
        <select name="person1sexualOrientation"  value={newCouple.person1sexualOrientation} onChange={handleNoteChange}>
          <option value="default">-----</option>
          <option value="Lesbian">Lesbian</option>
          <option value="Bisexual">Bisexual</option>
          <option value="Pansexual">Pansexual</option>
          <option value="Queer">Undefined, assumed wlw/queer</option>
          <option value="Other">Other</option>
        </select>
      </li>

      <li className="short">
        <label htmlFor="person1-genderidentity">Which applies?:</label>
        <select name="person1genderIdentity"  value={newCouple.person1genderIdentity} onChange={handleNoteChange}>
          <option value="default">-----</option>
          <option value="Cisgender">Cisgender</option>
          <option value="Trans">Trans</option>
          <option value="Non-Binary">Non-Binary</option>
          <option value="Other">Other</option>
        </select>
      </li>
      <li className="short">
        <label htmlFor="person1-genderexpression">Gender expression:</label>
        <select name="person1genderExpression"  value={newCouple.person1genderExpression} onChange={handleNoteChange}>
          <option value="default">-----</option>
          <option value="Femme">Femme</option>
          <option value="None">None/somewhere in between</option>
          <option value="Soft-butch">Soft-butch</option>
          <option value="Stem">Stem</option>
          <option value="Butch">Butch</option>
          <option value="Stud">Stud</option>
          <option value="Androgynous">Androgynous</option>
          <option value="Fluid or other">Fluid/other</option>
        </select>
      </li>

      <li className="short">
        <label htmlFor="person1-lifestage">Life-stage:</label>
        <select name="person1lifeStage"  value={newCouple.person1lifeStage} onChange={handleNoteChange}>
          <option value="default">-----</option>
          <option value="Children">Children</option>
          <option value="Teenager">Teenager</option>
          <option value="Young-adult">Young-adult</option>
          <option value="Adult">Adult</option>
          <option value="Senior">Senior</option>
          <option value="undefined">Not relevant (e.g. fantasy) or unknown</option>
        </select>
      </li>
      <li>
        <span> Check all which apply: </span>
        <br />
        <input type="checkbox" name="person1Ethnicity" value="black" onChange={handleCheckbox1}/>
        <label className="boxes checkbox" htmlFor="black">Black/African American</label>

        <input type="checkbox" name="person1Ethnicity" value="indigenous" onChange={handleCheckbox1}/>
        <label className="boxes checkbox" htmlFor="indigenous">Indigenous</label>

        <input type="checkbox" name="person1Ethnicity" value="white" onChange={handleCheckbox1}/>
        <label className="boxes checkbox" htmlFor="white">White</label>

        <input type="checkbox" name="person1Ethnicity" value="asian" onChange={handleCheckbox1}/>
        <label className="boxes checkbox" htmlFor="asian">Asian</label>

        <input type="checkbox" name="person1Ethnicity" value="latinx" onChange={handleCheckbox1}/>
        <label className="boxes checkbox" htmlFor="latinx">Latinx</label>

        <input type="checkbox" name="person1Ethnicity" value="other" onChange={handleCheckbox1}/>
        <label className="boxes checkbox" htmlFor="other">Other</label>
      </li>
      <li>
        <Countries version="first" newCoupleProper={newCouple.person1Nationality} name="person1Nationality" handleNoteChange={handleNoteChange} />
        <input
        type="checkbox"
        name="person1moreThanOneCountry"
        value="true" checked={newCouple.person1moreThanOneCountry}
        onChange={handleNoteChange}/>
        <label className="boxes checkbox" htmlFor="moreThanOneCountry">They are from more than one country (immigrants, travelers, etc.)</label>
        {newCouple.person1moreThanOneCountry === true && <div><br /><Countries version="second" newCoupleProper={newCouple.person1secondNationality} name="person1secondNationality" handleNoteChange={handleNoteChange} /> </div>}
      </li>

      <br />

      <p>Person 2</p> <br />
      <li className="short">
        <label htmlFor="person2">Name:<span className="form-required">*</span></label>
        <input placeholder="First name" name="person2name" value={newCouple.person2name} onChange={handleNoteChange}/>
      </li>
      <li className="short name">
        <label htmlFor="person2-gender">Gender:</label>
        <select name="person2gender"  value={newCouple.person2gender} onChange={handleNoteChange}>
          <option value="default">-----</option>
          <option value="Woman">Woman</option>
          <option value="Non-Binary">Non-Binary</option>
          <option value="Other">Other</option>
        </select>
      </li>

      <li className="short name">
        <label htmlFor="person2-orientation">Sexual orientation:</label>
        <select name="person2sexualOrientation"  value={newCouple.person2sexualOrientation} onChange={handleNoteChange}>
          <option value="default">-----</option>
          <option value="Lesbian">Lesbian</option>
          <option value="Bisexual">Bisexual</option>
          <option value="Pansexual">Pansexual</option>
          <option value="Queer">Undefined, assumed wlw/queer</option>
          <option value="Other">Other</option>
        </select>
      </li>

      <li className="short">
        <label htmlFor="person2-genderidentity">Which applies?:</label>
        <select name="person2genderIdentity"  value={newCouple.person2genderIdentity} onChange={handleNoteChange}>
          <option value="default">-----</option>
          <option value="Cisgender">Cisgender</option>
          <option value="Trans">Trans</option>
          <option value="Non-Binary">Non-Binary</option>
          <option value="Other">Other</option>
        </select>
      </li>
      <li className="short">
        <label htmlFor="person2-genderexpression">Gender expression:</label>
        <select name="person2genderExpression"  value={newCouple.person2genderExpression} onChange={handleNoteChange}>
          <option value="default">-----</option>
          <option value="Femme">Femme</option>
          <option value="None">None/somewhere in between</option>
          <option value="Soft-butch">Soft-butch</option>
          <option value="Stem">Stem</option>
          <option value="Butch">Butch</option>
          <option value="Stud">Stud</option>
          <option value="Androgynous">Androgynous</option>
          <option value="Fluid or other">Fluid/other</option>
        </select>
      </li>
      <li className="short">
        <label htmlFor="person2-lifestage">Life-stage:</label>
        <select name="person2lifeStage"  value={newCouple.person2lifeStage} onChange={handleNoteChange}>
          <option value="default">-----</option>
          <option value="Children">Children</option>
          <option value="Teenager">Teenager</option>
          <option value="Young-adult">Young-adult</option>
          <option value="Adult">Adult</option>
          <option value="Senior">Senior</option>
          <option value="undefined">Not relevant (e.g. fantasy) or unknown</option>
        </select>
      </li>
      <li>
        <span> Check all which apply: </span>
        <br />
        <input type="checkbox" name="person2Ethnicity" value="black" onChange={handleCheckbox2}/>
        <label className="boxes checkbox" htmlFor="black">Black/African American</label>

        <input type="checkbox" name="person2Ethnicity" value="indigenous" onChange={handleCheckbox2}/>
        <label className="boxes checkbox" htmlFor="indigenous">Indigenous</label>

        <input type="checkbox" name="person2Ethnicity" value="white" onChange={handleCheckbox2}/>
        <label className="boxes checkbox" htmlFor="white">White</label>

        <input type="checkbox" name="person2Ethnicity" value="asian" onChange={handleCheckbox2}/>
        <label className="boxes checkbox" htmlFor="asian">Asian</label>

        <input type="checkbox" name="person2Ethnicity" value="latinx" onChange={handleCheckbox2}/>
        <label className="boxes checkbox" htmlFor="latinx">Latinx</label>

        <input type="checkbox" name="person2Ethnicity" value="other" onChange={handleCheckbox2}/>
        <label className="boxes checkbox" htmlFor="other">Other</label>
      </li>
      <li>
        <Countries version="first" newCoupleProper={newCouple.person2Nationality} name="person2Nationality" handleNoteChange={handleNoteChange} />
        <input
        type="checkbox"
        name="person2moreThanOneCountry"
        value="true" checked={newCouple.person2moreThanOneCountry}
        onChange={handleNoteChange}/>
        <label className="boxes checkbox" htmlFor="moreThanOneCountry">They are from more than one country (immigrants, travelers, etc.)</label>
        {newCouple.person2moreThanOneCountry === true && <Countries version="second"
        newCoupleProper={newCouple.person2secondNationality} name="person2secondNationality" handleNoteChange={handleNoteChange} /> }
      </li>
      <br />

        <h3>The story they're in</h3> <br/>

      <li className="short">
        <label htmlFor="originType">Origin Type:<span className="form-required">*</span></label>
        <select name="originType" id="form-origin-type" value={newCouple.originType} onChange={handleNoteChange}>
          <option value="default">-----</option>
          <option value="TV Show">TV Show</option>
          <option value="Movie">Movie</option>
        </select>
      </li>
      <li className="short">
        <label htmlFor="origin">Name of the TV Show/Movie:<span className="form-required">*</span></label>
        <input placeholder="Title of TV Show or movie" name="origin" value={newCouple.origin} onChange={handleNoteChange}/>
      </li>
      <li className="short">
        <label htmlFor="year">Release date:</label>
        <input type="date" placeholder="Year" name="year" value={newCouple.year} onChange={handleNoteChange}/>
      </li>
      { newCouple.originType !== "Movie" && <FormStatus newCouple={newCouple} handleNoteChange={handleNoteChange} /> }
      <li>
        <label htmlFor="description">Description of the TV Show/Movie:</label>
        <textarea name="description" value={newCouple.description} onChange={handleNoteChange}>
        </textarea>
      </li>
      <li>
        <input
        type="checkbox"
        name="isThereQueerCreators"
        value="true" checked={newCouple.isThereQueerCreators}
        onChange={handleNoteChange}/>
        <label className="boxes checkbox" htmlFor="isThereQueerCreators">There is a queer woman or non-binary person among the directors or writers (leave unchecked if there isn't)</label>

        {newCouple.isThereQueerCreators === true && <div>
          <input
          type="checkbox"
          name="queerDirectors"
          value="true" checked={newCouple.queerDirectors}
          onChange={handleNoteChange}/>
          <label className="boxes checkbox" htmlFor="queerDirectors">The director (or one of the directors) is a queer women or non binary person</label>
          </div> }
      </li>


        <h3>An image</h3> <br/>


      <li>
        <label htmlFor="status">Image URL:<span className="form-required">*</span></label>
        <input type="url" placeholder="Choose a good quality image in which we can see both people" name="image" value={newCouple.image} onChange={handleNoteChange}/>
      </li>
      <li>
        <label htmlFor="status">Image description:</label>
        <input placeholder="Image description" name="altImg" value={newCouple.altImg} onChange={handleNoteChange}/>
      </li>


        <h3>Their relationship</h3> <br/>

        <li>
          <label htmlFor="coupleDdescription">Description of the story of the couple within the TV Show/Movie:</label>
          <textarea name="coupleDescription" value={newCouple.coupleDescription} onChange={handleNoteChange}
          placeholder="Here write a summary of who they are and who they are for each other. You can copy the description you made before if the story of the couple is the same as the story of the TV Show/Movie, like in a romantic movie.">



          </textarea>
          <input
          type="checkbox"
          name="coupleDescriptionIsSpoiler"
          value="true" checked={newCouple.coupleDescriptionIsSpoiler}
          onChange={handleNoteChange}/>
          <label className="boxes checkbox" htmlFor="coupleDescriptionIsSpoiler">This a spoiler for the TV Show/Movie (leave unchecked if it isn't)</label>
        </li>

      <li className="short name">
        <label htmlFor="screen-time">Give an approximate of how much screen time they have:</label>
        <select name="screenTime" id="form-ending" value={newCouple.screenTime} onChange={handleNoteChange}>
          <option value="default">-----</option>
          <option value="-10">Less than 10 minutes</option>
          <option value="10-30">10 to 30 minutes</option>
          <option value="30-60">30 minutes to 1 hour</option>
          <option value="60-90">1 hour to 1h30</option>
          <option value="+90">More than 1h30</option>
        </select>
      </li>
      <li className="short name">
        <label htmlFor="story-importance">Give an approximate of how important their relationship is for the movie/tv show:</label>
        <select name="storyImportance" id="form-ending" value={newCouple.storyImportance} onChange={handleNoteChange}>
          <option value="default">-----</option>
          <option value="Primary">Primary — it is the main subject of the content</option>
          <option value="Secondary">Secondary — it is not the main subject, but still very important</option>
          <option value="Tertiary">Tertiary — it is not important but not uninmportant either</option>
          <option value="Extras">Extras — it is a detail in the story</option>
        </select>
      </li>
      <li className="short">
        <label htmlFor="status">Global rating:</label>
        <input
        placeholder="Number from 0 to 5"
        name="globalRating"
        value={newCouple.globalRating}
        type="number"
        min="0" max="5"
        onChange={handleNoteChange}
        />
      </li>

      <li>
        <label htmlFor="romantic-connection">Romantic connection:</label>
        <select name="romanticConnection" id="form-ending" value={newCouple.romanticConnection} onChange={handleNoteChange}>
          <option value="default">-----</option>
          <option value="5">Like Romeo & Juliet, or rather, Julie & Juliet</option>
          <option value="4">Good</option>
          <option value="3">Meh</option>
          <option value="2">Bad</option>
          <option value="1">??? How are these people together?</option>
        </select>
      </li>
      <li>
        <label htmlFor="chemistry">Chemistry:</label>
        <select name="chemistry" id="form-ending" value={newCouple.chemistry} onChange={handleNoteChange}>
          <option value="default">-----</option>
          <option value="5"> 🔥🔥 </option>
          <option value="4">Very good</option>
          <option value="3">Meh</option>
          <option value="2">Not really</option>
          <option value="1">❄️❄️</option>
        </select>
      </li>

      <li className="short">
        <label htmlFor="ending">Ending:</label>
        <select name="ending" id="form-ending" value={newCouple.ending} onChange={handleNoteChange}>
          <option value="default">-----</option>
          <option value="Happy">Happy</option>
          <option value="Bittersweet">Bittersweet</option>
          <option value="Sad">Sad</option>
          <option value="Other">Other</option>
        </select>
      </li>


        <h3>General concerns and information</h3> <br/>

      <li>
        <span> Is coming out a thing in this story? </span>
          <input
          type="radio"
          name="concernsComingOut"
          value="true"
          checked={newCouple.concernsComingOut === "true"}
          onChange={handleNoteChange}/>
          <label className="boxes radius" htmlFor="Yes">Yes</label>

          <input type="radio" name="concernsComingOut" value="false"
          checked={newCouple.concernsComingOut === "false"}
          onChange={handleNoteChange}/>
          <label className="boxes radius" htmlFor="No">No</label>
      </li>
      <li>
        <span> Does someone of the couple die? </span>
          <input type="radio"
          name="concernsDeath"
          value="true"
          checked={newCouple.concernsDeath === "true"}
          onChange={handleNoteChange}/>
          <label className="boxes radius" htmlFor="Yes">Yes</label>

          <input type="radio" name="concernsDeath" value="false"
          checked={newCouple.concernsDeath === "false"}
          onChange={handleNoteChange}/>
          <label className="boxes radius" htmlFor="No">No</label>
      </li>
      <li>
        <span> Is there cheating (on a third party)? </span>

        <input type="radio" name="concernsCheating" value="true"
        checked={newCouple.concernsCheating === "true"}
        onChange={handleNoteChange}/>
        <label className="boxes radius" htmlFor="Yes">Yes</label>

        <input type="radio" name="concernsCheating" value="false"
        checked={newCouple.concernsCheating === "false"}
        onChange={handleNoteChange}/>
        <label className="boxes radius" htmlFor="No">No</label>
      </li>
      <li>
        <label htmlFor="concerns-homophobia">How much homophohic or sexist violence are they subjected to?</label>
        <select name="concernsHomophobia" value={newCouple.concernsHomophobia} onChange={handleNoteChange}>
          <option value="default">-----</option>
          <option value="1">None at all</option>
          <option value="2">A little bit</option>
          <option value="3">A solid amount</option>
          <option value="4">A considerable amount</option>
          <option value="5">Just. too. much. </option>
        </select>
      </li>
      </ul>
      <span className="form-required">*Required</span>
      <button type="submit">Save</button>
      <Notification message={message}/>
      </form>
    </div>
  );
}

export default AddForm;
