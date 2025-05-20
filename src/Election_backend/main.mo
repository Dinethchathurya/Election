import Principal "mo:base/Principal";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import AdminModule "admin/admin";
import ElectionActorClass "../Election_Actor_Class/main";
import List "mo:base/List";
import ElectionModule "election/election";
import Type "../Election_Actor_Class/types/Type";


actor Election {

  //election
  let electionClass = ElectionModule.ElectionClass();

  //create Elections functions using election module 
  public shared (msg) func createElection(electionType : Text, year : Text): async Principal {
    let newElection: Principal = await electionClass.createElectionFunction(electionType, year, msg.caller);
    return newElection;
  };


  private func getElection_Actor_Class(electionId : Principal): async ElectionActorClass.Election_Actor_Class {
    let thisElectionClass : ElectionActorClass.Election_Actor_Class = await electionClass.getElection_Actor_ClassFunction(electionId);
    return thisElectionClass;
  };

  public func createElectionOfficer(electionId : Principal, electionOfficerId : Principal, electionOfficerName : Text, pollingStation:Text, pollingDivision : Text, district : Text ): async Text {
    let electionClass : ElectionActorClass.Election_Actor_Class = await getElection_Actor_Class(electionId);
    
    let newOfficer :Text = await electionClass.createElectionOfficerForThisElection(electionOfficerId,electionOfficerName,pollingStation, pollingDivision, district );
    return newOfficer;
  };


  //get all elections
  public shared func getAllElectionPrincipals() : async List.List<Principal> {
    let principalsList: List.List<Principal> = await electionClass.getAllElectionPrincipalsFunction();
    return principalsList;
  };


  // Admin
  let adminClass = AdminModule.AdminClass();

  private type ElectionAdminType = {
    name : Text;
    role : Text;
  };

  public func createElectionAdmin(internetId : Principal, name : Text) : async Text {

    let admin : Text = adminClass.createElectionAdmins(internetId, name);
    if (admin == "Success") {
      return "success";
    } else {
      return "fail";
    }

  };

  //get election admin
  public shared query func name(msg : { caller : Principal }) : async ElectionAdminType {
    let result : ElectionAdminType = adminClass.getElectionAdmins(msg.caller);
    return result;
  };

  public shared query func isAdmin(caller : Principal) : async Bool {
    //let id : Principal = Principal.fromText("snjqz-ro3v5-a2rhs-y4jte-aaxgh-tj32a-q7w33-zudey-gm3hc-zznfb-iqe");
    let result : Bool = adminClass.isAdmin(caller);
    return result;
  };


  //candidate
  public func createCandidate(electionId : Principal, candidateName : Text, candidateParty : Text) : async Text{
    let electionClass : ElectionActorClass.Election_Actor_Class = await getElection_Actor_Class(electionId);
    let status :Text = await electionClass.createElectionCandidate(candidateName,candidateParty);
    return status;

  };

  public func checkDataIntegrity() {};

  public func calculateResults() {};



  //Authentication
  public query (message) func whoami() : async Principal {
    message.caller;
  };


   //voter related
  public shared(msg) func addVote(electionId: Principal, firstChoice : Text, secondChoice : ?Text, thirdChoice : ?Text) : async Text{
    let electionClass : ElectionActorClass.Election_Actor_Class = await getElection_Actor_Class(electionId);
    let status :Text = await electionClass.addVoteFunction(msg.caller, firstChoice, secondChoice, thirdChoice);
    return status;

  };

  public shared(msg) func getVotesFunction(electionId: Principal) : async [Type.Vote]{
    let electionClass : ElectionActorClass.Election_Actor_Class = await getElection_Actor_Class(electionId);
    let status :[Type.Vote] = await electionClass.getVoteFunction(msg.caller);
    return status;

  };

  public shared(msg) func verifyVoteChain(electionId: Principal) : async Bool {
    let electionClass : ElectionActorClass.Election_Actor_Class = await getElection_Actor_Class(electionId);
    let isValid : Bool = await electionClass.verifyVoteChainFunction(msg.caller);
    return isValid;

  };

  public shared(msg) func calculateResultsForOfficer(electionId: Principal): async [(Text, [Int])] {
    let electionClass : ElectionActorClass.Election_Actor_Class = await getElection_Actor_Class(electionId);
    electionClass.calculateResultsForOfficerFunction(msg.caller);

    let result :[(Text, [Int])] = await getResultsForOfficer(electionId);
    return result;

  };

  public shared(msg) func getResultsForOfficer(electionId: Principal) : async [(Text, [Int])]{
    let electionClass : ElectionActorClass.Election_Actor_Class = await getElection_Actor_Class(electionId);
    return await electionClass.getResultsForOfficerFunction(msg.caller);

  };

  public shared(msg) func confirmResultsForOfficer(electionId: Principal) : async Text{
    let electionClass : ElectionActorClass.Election_Actor_Class = await getElection_Actor_Class(electionId);
    return await electionClass.confirmResultsForOfficerFunction(msg.caller);

  };

  public shared func getAllResults(electionId : Principal) : async [Type.ElectionCandidate] {
    let electionClass = await getElection_Actor_Class(electionId);
    return await electionClass.getAllResultsFunction();
  };

};
