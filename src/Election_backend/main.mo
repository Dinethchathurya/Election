import Principal "mo:base/Principal";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import AdminModule "admin/admin";
import ElectionActorClass "../Election_Actor_Class/main";
import List "mo:base/List";
import ElectionModule "election/election"

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

  public func createElectionAdmin(id : Principal, name : Text) : async Text {

    let admin : Text = adminClass.createElectionAdmins(id, name);
    if (admin == "Success") {
      return "success";
    } else {
      return "fail";
    }

  };

  public shared query func name() : async ElectionAdminType {

    let id : Principal = Principal.fromText("a5uvy-7ojr2-iyefm-n22mq-hxn6l-l6dbq-5n2yy-b67g2-6apqn-u5u5u-uqe");

    let result : ElectionAdminType = adminClass.getElectionAdmins(id);
    return result;
  };

  public shared query func isAdmin(caller : Principal) : async Bool {
    //let id : Principal = Principal.fromText("snjqz-ro3v5-a2rhs-y4jte-aaxgh-tj32a-q7w33-zudey-gm3hc-zznfb-iqe");
    let result : Bool = adminClass.isAdmin(caller);
    return result;
  };


  //candidate
  public func createCandidate() {};

  public func checkDataIntegrity() {};

  public func calculateResults() {};

};
