import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import List "mo:base/List";
import Type "../types/Type";
import Nat32 "mo:base/Nat32";
import Iter "mo:base/Iter";

module VoteModule {
    
    public class VoteClass() {

        private var votesByOfficer = HashMap.HashMap<Principal, List.List<Type.Vote>>(1, Principal.equal, Principal.hash);
        //Function to add a new vote for an election officer
        //shared functions cannot use here because this is not inside actor class. i need to call this function inside actor class with msg as parameeter 
        public func addVote(officerId  : Principal, firstChoice : Text, secondChoice : ?Text, thirdChoice : ?Text) : async Text {
            //let officerId = msg.caller; // Get the Principal of the election officer

            // Get the current list of votes for the officer (or an empty list if none exists)
            let currentVotes = switch (votesByOfficer.get(officerId)) {
                case (null) { List.nil<Type.Vote>() };
                case (?votes) { votes };
            };

            // Calculate the previous vote hash (hash of the last vote in the list)
            let previousVoteHash = switch (List.last(currentVotes)) {
                case (null) { null };
                case (?lastVote) { ?calculateHash(lastVote) };
            };

            // Create the new vote
            let newVote : Type.Vote = {
                firstChoice = firstChoice;
                secondChoice = secondChoice;
                thirdChoice = thirdChoice;
                previousVoteHash = previousVoteHash;
            };

            // Add the new vote to the list
            let updatedVotes = List.push(newVote, currentVotes);

            // Update the HashMap with the new list of votes
            votesByOfficer.put(officerId, updatedVotes);

            // Return the hash of the new vote for verification
            return calculateHash(newVote);
        };

        // Function to calculate the hash of a vote using Text.hash
        private func calculateHash(vote : Type.Vote) : Text {
            // Convert the vote to a string representation for hashing
            let voteString = Text.concat("firstChoice:", vote.firstChoice)
                # "|secondChoice:" # debug_show(vote.secondChoice)
                # "|thirdChoice:" # debug_show(vote.thirdChoice)
                # "|previousVoteHash:" # debug_show(vote.previousVoteHash);

            // Calculate the hash using Text.hash
            let hash = Text.hash(voteString);
            return Nat32.toText(hash); // Convert Nat32 to Text for consistency
        };
        // Function to retrieve all votes for an election officer
        public func getVotes(officerId : Principal) : async [Type.Vote] {
            switch (votesByOfficer.get(officerId)) {
                case (null) { [] }; // Return an empty array if no votes exist
                case (?votes) { List.toArray(votes) }; // Convert the list to an array
            }
        };

        // Function to verify the integrity of the vote chain for an election officer
        public func verifyChain(officerId : Principal) : async Bool {
            let votes = switch (votesByOfficer.get(officerId)) {
                case (null) { return false }; // No votes to verify
                case (?votes) { votes };
            };

            var currentHash : ?Text = null;
            var isValid = true;

            // Convert the list of votes to an array for easier traversal
            let voteArray = List.toArray(votes);

            // Traverse the array in reverse order (from newest to oldest)
            for (vote in voteArray.vals()) {
                let calculatedHash = calculateHash(vote);
                if (vote.previousVoteHash != currentHash) {
                    isValid := false;
                    return isValid; // Exit early if the chain is invalid
                };
                currentHash := ?calculatedHash;
            };

            return isValid;
        };

        //results calculation process

        // HashMap to store the results for each election officer

        private var resultsByOfficer = HashMap.HashMap<Principal, HashMap.HashMap<Text, List.List<Int>>>(
            1, // Initial capacity
            Principal.equal, // Equality function for Principal
            Principal.hash // Hash function for Principal
        );

        // this function refers wrong Hashmap and ai is confucing what i need to do. 
        // SO I need to code from scrach to get the result of the election



        // shared functions cannot use here because this is not inside actor class. i need to call this function inside actor class with msg as parameeter 

        // public shared(msg) func calculateAndStoreResults(votes : [Type.Vote]) : async () {
        //     let officerId = msg.caller; // Get the Principal ID of the election officer

        //     // Create or retrieve the inner HashMap for this officer
        //     let innerHashMap = switch (resultsByOfficer.get(officerId)) {
        //         case (null) {
        //             // If no inner HashMap exists, create a new one
        //             let newInnerHashMap = HashMap.HashMap<Text, List.List<Int>>(1, Text.equal, Text.hash);
        //             resultsByOfficer.put(officerId, newInnerHashMap); // Store it in the outer HashMap
        //             newInnerHashMap; // Return the new inner HashMap
        //         };
        //         case (?existingInnerHashMap) {
        //             existingInnerHashMap; // Return the existing inner HashMap
        //         };
        //     };
        // };
        
    };
};
