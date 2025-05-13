// create elections
// get election
import Debug "mo:base/Debug";
import Cycles "mo:base/ExperimentalCycles";
import ElectionActorClass "../../Election_Actor_Class/main";
import HashMap "mo:base/HashMap";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Error "mo:base/Error";
import AdminModule "../admin/admin";

// this is the module for the election class
module ElectionModule{
  public class ElectionClass() {
    let adminClass = AdminModule.AdminClass();

    public var mapOfElections = HashMap.HashMap<Principal, ElectionActorClass.Election_Actor_Class>(1, Principal.equal, Principal.hash);
    public var principals : List.List<Principal> = List.nil<Principal>();


    public func createElectionFunction(electionType : Text, year : Text, caller: Principal): async Principal {
      let isAdminResult : Bool = adminClass.isAdmin(caller);
      Debug.print(debug_show(Cycles.balance()));
      Cycles.add(100_500_000_000);
      let newElection = await ElectionActorClass.Election_Actor_Class(electionType, year);

      let electionCanisterId : Principal = await newElection.getCanisterId();
      
      mapOfElections.put(electionCanisterId, newElection);
      principals := List.push(electionCanisterId, principals);

      return electionCanisterId;
    };

    public func getElection_Actor_ClassFunction(electionId : Principal): async ElectionActorClass.Election_Actor_Class {
      let electionClass : ElectionActorClass.Election_Actor_Class = switch(mapOfElections.get(electionId)) {
        case(null) { return  throw Error.reject("Election not found for this electionId"); };
        case(?result) { return result};
      };
      return electionClass;
    };

    public func createElectionOfficerFunction(electionId : Principal, electionOfficerId : Principal, electionOfficerName : Text, pollingStation:Text, pollingDivision : Text, district : Text ): async Text {
      let electionClass : ElectionActorClass.Election_Actor_Class = await getElection_Actor_ClassFunction(electionId);
      
      let newOfficer :Text = await electionClass.createElectionOfficerForThisElection(electionOfficerId,electionOfficerName,pollingStation, pollingDivision, district );
      return newOfficer;
    };

    public func getAllElectionPrincipalsFunction() : async List.List<Principal> {
      return principals;
    }

  }
}