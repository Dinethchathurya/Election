import Nat "mo:base/Nat";

module VoteModule {
    public class VoteClass() {
        public var state = 30;
        
        // Public method of the class to accept input
        public func vote(input: Text): Text {
            state += 1;  // Modify the state to show it's working
            return "Received input";
        };
    };
};
