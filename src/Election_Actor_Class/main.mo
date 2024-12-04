import Text "mo:base/Text";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Bool "mo:base/Bool";
import ElectionOfficerModule  "users/officer";
import CandidateModule "users/candidate";



actor class Election_Actor_Class(elecionType: Text, year : Text) = this{

    private type ElectionOfficer = {
        name : Text;
        electionCenter : Text;
        role : Text;
    };
    
    private type ElectionCandidate = {
        name : Text;
        hisParty : Text;
        //icon :this will add later
    };

    // canister related 
    private let thisElecionType : Text = elecionType;
    private let thisYear :Text = year;

    public shared query func getThisElectionType(): async Text{
        return thisElecionType;
    };
    public shared query func getThisYear(): async Text{
        return thisYear;
    };
    public query func getCanisterId() : async Principal {
        return Principal.fromActor(this);
    };

    // election Officer related
    let electionOfficerModuleInstance = ElectionOfficerModule.ElectionOfficerClass();
    
    public func createElectionOfficerForThisElection(id : Principal, electionOfficername : Text, electionCenter : Text) : async Text{
        let officer : Text = await electionOfficerModuleInstance.createElectionOfficers(id, electionOfficername, electionCenter);
        return officer;
    };

    public query func isOfficer(id : Principal): async Bool {
        let isOfficer : Bool = electionOfficerModuleInstance.isElectionOfficer(id);
        return isOfficer;
    };
    
    public query func getElectionOfficers(id : Principal): async ElectionOfficer{
        let isOfficer : ElectionOfficer = electionOfficerModuleInstance.getElectionOfficers(id);
        return isOfficer;
    };

    // eletion candidate related
    let candidateModuleInstance = CandidateModule.CandidateClass();

    public func createElectionCandidate(candidateName : Text, candidateParty : Text) : async Text {
        let status : Text =await candidateModuleInstance.createElectionCandidate(candidateName,candidateParty);
        return status;
    };
    public query func getElectionCandidates(name : Text) :async  ElectionCandidate {
        let candidate : ElectionCandidate = candidateModuleInstance.getElectionCandidates(name);
        return candidate;
    };


};
