import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Bool "mo:base/Bool";
import ElectionOfficerModule "users/officer";
import CandidateModule "users/candidate";
import Type "./types/Type";
import VoteModule "./vote/vote";

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
    
    public func createElectionOfficerForThisElection(id : Principal, electionOfficerName : Text, pollingStation:Text, pollingDivision : Text, district : Text) : async Text{
        let officer : Text = await electionOfficerModuleInstance.createElectionOfficers(id, electionOfficerName,  pollingStation, pollingDivision, district);
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
    let voteModuleInstance = VoteModule.VoteClass();

    public func addVoteFunction(caller: Principal ,firstChoice: Text, secondChoice: ?Text, thirdChoice: ?Text) : async Text {
        let status : Text = await voteModuleInstance.addVote(caller, firstChoice,  secondChoice, thirdChoice);
        return status;
    };
    

    public func getVoteFunction(caller: Principal) : async [Type.Vote] {
        let votes : [Type.Vote] = await voteModuleInstance.getVotes(caller);
        return votes;
    };


    public func verifyVoteChainFunction(caller: Principal) : async Bool {
        let isValid : Bool = await voteModuleInstance.verifyChain(caller);
        return isValid;
    };


    public func calculateResultsForOfficerFunction(caller: Principal)  {
        voteModuleInstance.calculateResultsForOfficer(caller);
    };


    public func getResultsForOfficerFunction(caller: Principal) : async [(Text, [Int])] {
        var results : [(Text, [Int])] = [];
        results := await voteModuleInstance.getResultsForOfficer(caller);
        return results;
    };


    public func confirmResultsForOfficerFunction(officerId : Principal) : async Text {
        var results : Text =  await voteModuleInstance.confirmResultsForOfficer(officerId, candidateModuleInstance);
        return results;
    };


    public func getAllResultsFunction(): async [Type.ElectionCandidate] {
        return await candidateModuleInstance.getAllResults();

    };
    
};
