import { useState } from 'react';
import {Actor, HttpAgent} from "@dfinity/agent";
import { idlFactory, Election_Actor_Class } from 'declarations/Election_Actor_Class';
import { Principal } from "@dfinity/principal";
import { Election_backend } from 'declarations/Election_backend';

function App() {


  async function createElectionFunction(event)  {
    try {
      let electionType= "parliment";
      let year = "2000";
      let newid = await Election_backend.createElection(electionType,year);
      console.log(newid.toText());


      // ElectionActorClass = await Actor.createActor(idlFactory, {
      //   agent,
      //   canisterId :id,
      // });
    
    }catch (e){
      console.log(e);
    }
   // const name = await ElectionActorClass.getThisYear();
  }

  return (
    <main>
      <label htmlFor="createIlection">Create Election</label>
      <button onClick={createElectionFunction}>Create</button>
    </main>
  );
}

export default App;
