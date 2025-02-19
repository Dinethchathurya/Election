import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
import VoterModule "admin";
import MyModule "admin";
import HashMap "mo:base/HashMap";
import Prelude "mo:base/Prelude";
import Error "mo:base/Error";
import AdminModule "admin";
import ElectionActorClass "../Election_Actor_Class/main";
import Cycles "mo:base/ExperimentalCycles";


actor Election {

  private var mapOfElections = HashMap.HashMap<Principal, ElectionActorClass.Election_Actor_Class>(1, Principal.equal, Principal.hash);

  public shared (msg) func createElection(electionType : Text, year : Text): async Principal {
    //let isAdmin : Bool = adminClass.isAdmin(msg.caller);
    Debug.print(debug_show(Cycles.balance()));
    Cycles.add(100_500_000_000);
    let newElection = await ElectionActorClass.Election_Actor_Class(electionType, year);

    let electionCanisterId : Principal = await newElection.getCanisterId();
    
    mapOfElections.put(electionCanisterId, newElection);

    return electionCanisterId;
  };

  private func getElection_Actor_Class(electionId : Principal): async ElectionActorClass.Election_Actor_Class {
    let electionClass : ElectionActorClass.Election_Actor_Class = switch(mapOfElections.get(electionId)) {
      case(null) { return  throw Error.reject("Election not found for this electionId"); };
      case(?result) { return result};
    };
    return electionClass;
  };

  public func createElectionOfficer(electionId : Principal, electionOfficerId : Principal, electionOfficerName : Text, electionCenter :Text ): async Text {
    let electionClass : ElectionActorClass.Election_Actor_Class = await getElection_Actor_Class(electionId);
    
    let newOfficer :Text = await electionClass.createElectionOfficerForThisElection(electionOfficerId,electionOfficerName, electionCenter);
    return newOfficer;
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
      return "faild";
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
