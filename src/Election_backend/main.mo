//import Authentication "authentication";

import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
//import AdminModule "admin";
import VoterModule "admin";
import MyModule "admin";
import HashMap "mo:base/HashMap";
import AdminModule "admin";

actor Election {

  public func createElection() {};

  public func createElectionOfficer() {};

  public func checkDataIntegrity() {};

  public func calculateResults() {};

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

    let id : Principal = Principal.fromText("snjqz-ro3v5-a2rhs-y4jte-aaxgh-tj32a-q7w33-zudey-gm3hc-zznfb-iqe");

    let result : ElectionAdminType = adminClass.getElectionAdmins(id);
    return result;
  };

  public shared query func isAdmin() : async Bool {

    let id : Principal = Principal.fromText("snjqz-ro3v5-a2rhs-y4jte-aaxgh-tj32a-q7w33-zudey-gm3hc-zznfb-iqe");

    let result : Bool = adminClass.isAdmin(id);
    return result;
  };

};
