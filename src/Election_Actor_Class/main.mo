import Text "mo:base/Text";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import VoterModule "vote";

actor class Election_Actor_Class() {

    public func name() : async Nat {
        let nameInstance = VoterModule.Vote();

        // Call the 'names' method and pass "kjn" as the input
        let result = nameInstance.names("kjn");
        let state = nameInstance.state;
        return state;
    };

    // data types
    private type finalResult = {};

    var votes = [];

};
