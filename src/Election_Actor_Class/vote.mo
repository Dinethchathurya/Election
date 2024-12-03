import Nat "mo:base/Nat";

module VoterModule {
    public class Vote() {
        public var state = 30;
        
        // Public method of the class to accept input
        public func names(input: Text): Text {
            state += 1;  // Modify the state to show it's working
            return "Received input";
        };
    };
};
