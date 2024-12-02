import Text "mo:base/Text";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";

module _Authentication {

    type User = {
      id: Principal;
      name: Text;
      role: Text;
      electionCenter: Text;
    };

    public func login(){};
    public func register(){};
    public func checkIsElectionMember(){};
    public func checkIsAdmin(){};
};
