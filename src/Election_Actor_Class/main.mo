import Text "mo:base/Text";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import VoterModule "vote";

actor class Election_Actor_Class() {

    public func name() : async Nat {
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

    // Store users data.

    // map all election candidates key as their own name.
    var electionCandidates = HashMap.HashMap<Text, ElectionCandidate>(1, Text.equal, Text.hash);

    var votes = [];

    public query func getElectionCandidates(name : Text) : async ElectionCandidate {

        var notfundCandidate : ElectionCandidate = {
            name = "not found";
            hisParty = "not found";
        };

        var candidate : ElectionCandidate = switch (electionCandidates.get(name)) {
            case (null) { notfundCandidate };
            case (?result) { return result };

        };
        return candidate;
    };

    public type ElectionAdmin = {
        name : Text;
        role : Text;
    };

    // create functions

    public func createElectionCandidate(candidateName : Text, candidateParty : Text) : async Text {

        let newElectionCandidate : ElectionCandidate = {
            name = candidateName;
            hisParty = candidateParty;
        };

        electionCandidates.put(candidateName, newElectionCandidate);
        return "Success";
    };

};
