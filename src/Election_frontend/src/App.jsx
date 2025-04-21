import { useState } from 'react';
import {Actor, HttpAgent} from "@dfinity/agent";
import { idlFactory, Election_Actor_Class } from 'declarations/Election_Actor_Class';
import { Principal } from "@dfinity/principal";
import { Election_backend } from 'declarations/Election_backend';
import './index.css';

function App() {

  async function createElectionFunction(event)  {
    try {
      let electionType= "parliment";
      let year = "2000";
      let newid = await Election_backend.createElection(electionType,year);
      console.log(newid.toText());

    }catch (e){
      console.log(e);
    }

  }

  return (
    <main>
      <label htmlFor="createIlection">Create Election</label>
      <button onClick={createElectionFunction}>Create</button>

      <h1 className="text-2xl font-bold underline text-red-500 ">Hello world!</h1>
      <div className="p-4">
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
        Click Me
      </button>

      <h1 className="bg-green-500 text-white text-3xl p-4">Tailwind Test</h1>

      <div className="bg-black text-white p-6">Tailwind Working ✅</div>
    </div>
    </main>
  );
}

export default App;
