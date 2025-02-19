import Text "mo:base/Text";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Bool "mo:base/Bool";
import ElectionOfficerModule  "users/officer";
import List "mo:base/List";
import CandidateModule "users/candidate";
import Type "./types/Type";

actor class Election_Actor_Class(electionType: Text, year : Text) = this{

    // canister related 
    private let thisElectionType : Text = electionType;
    private let thisYear :Text = year;

    public shared query func getThisElectionType(): async Text{
        return thisElectionType;
    };
    public shared query func getThisYear(): async Text{
        return thisYear;
    };
    public query func getCanisterId() : async Principal {
        return Principal.fromActor(this);
    };

    // election Officer related
    let electionOfficerModuleInstance = ElectionOfficerModule.ElectionOfficerClass();
    
    public func createElectionOfficerForThisElection(id : Principal, electionOfficerName : Text, electionCenter : Text) : async Text{
        let officer : Text = await electionOfficerModuleInstance.createElectionOfficers(id, electionOfficerName, electionCenter);
        return officer;
    };

    public query func isOfficer(id : Principal): async Bool {
        let isOfficer : Bool = electionOfficerModuleInstance.isElectionOfficer(id);
        return isOfficer;
    };
    
    public query func getElectionOfficers(id : Principal): async Type.ElectionOfficer{
        let isOfficer : Type.ElectionOfficer = electionOfficerModuleInstance.getElectionOfficers(id);
        return isOfficer;
    };

    // elation candidate related
    let candidateModuleInstance = CandidateModule.CandidateClass();

    public func createElectionCandidate(candidateName : Text, candidateParty : Text) : async Text {
        let status : Text =await candidateModuleInstance.createElectionCandidate(candidateName,candidateParty);
        return status;
    };
    public query func getElectionCandidates(name : Text) :async  Type.ElectionCandidate {
        let candidate : Type.ElectionCandidate = candidateModuleInstance.getElectionCandidates(name);
        return candidate;
    };

    //voter related



};
