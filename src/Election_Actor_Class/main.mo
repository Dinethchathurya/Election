import Text "mo:base/Text";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import VoterModule "vote";

actor class Election_Actor_Class (){

    public func name() : async Nat{
        let nameInstance = VoterModule.Vote();

        // Call the 'names' method and pass "kjn" as the input
        let result = nameInstance.names("kjn");
        let state = nameInstance.state;
        return state;
    };


// data types
private type finalResult = {};

// this data type for store election candidats details. 
private type ElectionCandidate = {
    name : Text;
    hisParty : Text;
    //icon : Blob; this will add later
};



// this data type for store election Officers details. 
private type ElectionOfficer = {
    name : Text;
    electionCenter : Text;
    role : Text
};


// Store users data.

// map all election candidates key as their own name.
var electionCandidates = HashMap.HashMap<Text, ElectionCandidate>(1, Text.equal, Text.hash);

var electionOfficers = HashMap.HashMap<Principal, ElectionOfficer>(1, Principal.equal, Principal.hash);
var votes = [];

public query func getElectionCandidates (name : Text): async ElectionCandidate {

    var notfundCandidate  : ElectionCandidate = {
        name = "not found";
        hisParty = "not found";
    };

    var candidate : ElectionCandidate = switch(electionCandidates.get(name)) {
        case(null) { notfundCandidate };
        case(?result) { return result};
        
    }; 
    return candidate;
};

public query func getElectionOfficers (id : Principal) : async ElectionOfficer {
    var notfundCandidate  : ElectionOfficer = {
        name = "not found";
        electionCenter = "not found";
        role = "not found";
    };

    let offier : ElectionOfficer = switch(electionOfficers.get(id)) {
        case(null) { return notfundCandidate };
        case(?result) { return result };
    };
    return offier;
};
  public type ElectionAdmin = {
        name : Text;
        role : Text;
  };



// create functions

public func createElectionCandidate (candidateName : Text, candidateParty : Text): async Text{
    
    let newElectionCandidate : ElectionCandidate = { 
        name = candidateName; 
        hisParty = candidateParty; 
    };

    electionCandidates.put(candidateName, newElectionCandidate);
    return "Success";
};

public func createElectionOfficers ( id : Principal, electionOfficername: Text, electionCenter:Text ): async Text{

    let electionOfficer : ElectionOfficer = { 
        name = electionOfficername; 
        electionCenter = electionCenter; 
        role = "ElectionOfficer";
    };

    electionOfficers.put(id,electionOfficer );
    return "Success";

};
};