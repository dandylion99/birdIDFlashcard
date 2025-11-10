import { useState } from 'react'
import {allColors} from './birds.js'
import {allBirds} from './birds.js'

import './App.css'

function CardDisplay({birds, isBacks, setIsBacks}){
  const cards = [];

  function handleClick(b){
    let id = b.id;
    let newIsBacks = [...isBacks];

    if(!isBacks[id]){
      newIsBacks[id]=true;
    }else{
      newIsBacks[id]=false;
    }
    setIsBacks(newIsBacks);
  }
  
  birds.forEach((item)=>{
    cards.push(
      <Card bird={item} key={item.id} revealed={isBacks[item.id]} onCardClick={()=>handleClick(item)}/>
    );
  });

  return(
    <div className="card-display">
      {cards}
    </div>
  );
}

function Card({bird, revealed, onCardClick}){
  let src="/"+bird.name+".png";
  let color = allColors[bird.color];

  return(
    <>
    <div className={`card ${revealed?"flipped":""}`} onClick={onCardClick}>
      <div className="card-inner">
        <div className="card-front">
          <img src={src} />
        </div>
        <div className='card-back' style={{backgroundColor:color}}>
          <div>{bird.name}</div>
        </div>
      </div>
    </div>
    
    </>
  );
}

function ShuffleButton({birdList, handleShuffle, isFlipped}){
  return(
    <button onClick = {handleShuffle}>Shuffle</button>

  );
}

function App() {
  const [currentBirds, setCurrentBirds] = useState(()=>generateRandom(allBirds));
  const [isBacks, setIsBacks] = useState(Array(6).fill(false));

  function generateRandom(list){    
    let randomBirdIDs = [];
    let newBirdList = [];
    let number = 0;
    let i = 0;

    while(i<6){
      number = Math.floor(Math.random()*list.length);
        if(!(randomBirdIDs.includes(number))){
          randomBirdIDs.push(number);
          i = i+1;
        }    
    }
    randomBirdIDs.forEach((number)=>{
      newBirdList.push(allBirds[number]);
    });

    return(newBirdList);
  }

  function handleDisplay(){
    let newList = generateRandom(allBirds);
    setCurrentBirds(newList);
    setIsBacks(Array(6).fill(false));
  }

  return (
    <>
      <div>
        <h1>Bird ID Flashcard</h1>
        <div>
        <p>Click on a card to reveal its ID.</p>       
         <ShuffleButton birdList={allBirds} handleShuffle= {()=>handleDisplay()} />
        </div>
      </div>
      <CardDisplay birds={currentBirds} isBacks={isBacks} setIsBacks={setIsBacks}/>
    </>
  )
}

export default App
