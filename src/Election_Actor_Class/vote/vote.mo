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


        public func addVote(officerId : Principal, firstChoice : Text, secondChoice : ?Text, thirdChoice : ?Text) : async Text {
            let currentVotes = switch (votesByOfficer.get(officerId)) {
                case (null) { List.nil<Type.Vote>() };
                case (?votes) { votes };
            };

            // Properly destructure the head of the list
            let previousVoteHash = switch (currentVotes) {
                case (null) { null };
                case (? (headVote, _)) { ?calculateHash(headVote) }; // ✅ FIXED
            };

            let newVote : Type.Vote = {
                firstChoice = firstChoice;
                secondChoice = secondChoice;
                thirdChoice = thirdChoice;
                previousVoteHash = previousVoteHash;
            };

            let updatedVotes = List.push(newVote, currentVotes);
            votesByOfficer.put(officerId, updatedVotes);

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


        public func verifyChain(officerId : Principal) : async Bool {
            let votes = switch (votesByOfficer.get(officerId)) {
                case (null) { return false };
                case (?v) { v };
            };

            var currentHash : ?Text = null;

            // Reverse to go oldest → newest
            let voteArray = List.toArray(List.reverse(votes));

            for (vote in voteArray.vals()) {
                if (vote.previousVoteHash != currentHash) {
                    return false;
                };
                currentHash := ?calculateHash(vote);
            };

            return true;
        };

        //results calculation process

        // HashMap to store the results for each election officer

        public var resultsByOfficer = HashMap.HashMap<Principal, HashMap.HashMap<Text, List.List<Int>>>(
            1, // Initial capacity
            Principal.equal, // Equality function for Principal
            Principal.hash // Hash function for Principal
        );

        // this function refers wrong Hashmap and ai is confucing what i need to do. 
        // SO I need to code from scrach to get the result of the election



        // shared functions cannot use here because this is not inside actor class. i need to call this function inside actor class with msg as parameeter 

        // Function to calculate election results by tallying votes
        public func calculateResults() : async [(Text, Nat)] {
            var voteCounts = HashMap.HashMap<Text, Nat>(10, Text.equal, Text.hash);

            // Iterate through each officer's submitted votes
            for ((officer, voteList) in votesByOfficer.entries()) {
                let votesArray = List.toArray(voteList);

                // Go through each vote
                for (vote in votesArray.vals()) {
                    // First choice gets 3 points
                    let firstScore = switch (voteCounts.get(vote.firstChoice)) {
                        case (null) 0;
                        case (?v) v;
                    };
                    voteCounts.put(vote.firstChoice, firstScore + 3);

                    // Second choice gets 2 points (if exists)
                    switch (vote.secondChoice) {
                        case (?second) {
                            let secondScore = switch (voteCounts.get(second)) {
                                case (null) 0;
                                case (?v) v;
                            };
                            voteCounts.put(second, secondScore + 2);
                        };
                        case (null) {};
                    };

                    // Third choice gets 1 point (if exists)
                    switch (vote.thirdChoice) {
                        case (?third) {
                            let thirdScore = switch (voteCounts.get(third)) {
                                case (null) 0;
                                case (?v) v;
                            };
                            voteCounts.put(third, thirdScore + 1);
                        };
                        case (null) {};
                    };
                }
            };

            // Convert HashMap to array for return
            let resultList = Iter.toArray(voteCounts.entries());
            return resultList;
        }

        
    };
};
