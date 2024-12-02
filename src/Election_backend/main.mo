//import Authentication "authentication";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";

actor Election{

  private type Election = {
    year : Nat;
    date : Text;
    electionId : Principal;
  };

  var mapOfElections = HashMap.HashMap<Principal, Election>(1, Principal.equal, Principal.hash);


  public func createElection(){};

  public func createElectionOfficer(){};

  public func checkDataIntegrity(){};

  public func calculateResults(){};

};
