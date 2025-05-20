import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import List "mo:base/List";
import Type "../types/Type";
import Nat32 "mo:base/Nat32";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import CandidateModule "../users/candidate";

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
                case (?(headVote, _)) { ?calculateHash(headVote) }; // ✅ FIXED
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
            # "|secondChoice:" # debug_show (vote.secondChoice)
            # "|thirdChoice:" # debug_show (vote.thirdChoice)
            # "|previousVoteHash:" # debug_show (vote.previousVoteHash);

            // Calculate the hash using Text.hash
            let hash = Text.hash(voteString);
            return Nat32.toText(hash); // Convert Nat32 to Text for consistency
        };

        // Function to retrieve all votes for an election officer
        public func getVotes(officerId : Principal) : async [Type.Vote] {
            switch (votesByOfficer.get(officerId)) {
                case (null) { [] }; // Return an empty array if no votes exist
                case (?votes) { List.toArray(votes) }; // Convert the list to an array
            };
        };

        public func verifyChain(officerId : Principal) : async Bool {
            let votes = switch (votesByOfficer.get(officerId)) {
                case (null) { return false };
                case (?v) { v };
            };

            var currentHash : ?Text = null;

            // Reverse to go oldest --> newest
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

        public func calculateResultsForOfficer(officerId : Principal) {
            let votes = switch (votesByOfficer.get(officerId)) {
                case (null) return; // No votes to process
                case (?list) list;
            };

            // Get or create inner map for this officer
            let innerResults = switch (resultsByOfficer.get(officerId)) {
                case (null) {
                    let newMap = HashMap.HashMap<Text, List.List<Int>>(10, Text.equal, Text.hash);
                    resultsByOfficer.put(officerId, newMap);
                    newMap;
                };
                case (?existing) existing;
            };

            // Convert list to array
            let votesArray = List.toArray(votes);

            for (vote in votesArray.vals()) {
                // --- 1st Choice ---
                updateCandidate(innerResults, vote.firstChoice, 0);

                // --- 2nd Choice ---
                switch (vote.secondChoice) {
                    case (?second) updateCandidate(innerResults, second, 1);
                    case null {};
                };

                // --- 3rd Choice ---
                switch (vote.thirdChoice) {
                    case (?third) updateCandidate(innerResults, third, 2);
                    case null {};
                };
            };
        };

        // Updates the vote count for a candidate at a specific index
        // Update the candidate result at a particular vote index
        private func updateCandidate(
            innerMap : HashMap.HashMap<Text, List.List<Int>>,
            name : Text,
            index : Nat,
        ) {
            let list = switch (innerMap.get(name)) {
                case (null) {
                    let fresh = initializeList();
                    innerMap.put(name, fresh);
                    fresh;
                };
                case (?existing) existing;
            };

            // ✅ Properly get the current value at index
            let currentCount = getAtIndex(list, index);
            let updated = replaceNth(list, index, currentCount + 1);
            innerMap.put(name, updated);
        };

        // Return list with 3 zeroes for [first, second, third]
        private func initializeList() : List.List<Int> {
            return List.push(0, List.push(0, List.push(0, List.nil<Int>())));
        };

        // Replace the element at index `idx` with `newVal`
        private func replaceNth(l : List.List<Int>, idx : Nat, newVal : Int) : List.List<Int> {
            var result = List.nil<Int>();
            var current = l;
            var i = 0;

            while (List.size(current) > 0) {
                switch (current) {
                    case (?(head, tail)) {
                        if (i == idx) {
                            result := List.push(newVal, result);
                        } else {
                            result := List.push(head, result);
                        };
                        current := tail;
                        i += 1;
                    };
                    case null {}; // ✅ Explicitly handle null case even though it should never happen
                };
            };

            return List.reverse(result);
        };

        // ✅ Safe function to get value at index
        private func getAtIndex(l : List.List<Int>, idx : Nat) : Int {
            var current = l;
            var i = 0;

            while (List.size(current) > 0) {
                switch (current) {
                    case (?(head, tail)) {
                        if (i == idx) {
                            return head;
                        };
                        current := tail;
                        i += 1;
                    };
                    case null {}; // ✅ Required by compiler: handle all variants
                };
            };

            return 0; // Default if index is out of bounds
        };

        public func getResultsForOfficer(officerId : Principal) : async [(Text, [Int])] {
            switch (resultsByOfficer.get(officerId)) {
                case null {
                    return []; // No results for this officer
                };
                case (?innerMap) {
                    var results : [(Text, [Int])] = [];

                    for ((candidate, list) in innerMap.entries()) {
                        // Convert the List<List<Int>> to [Int]
                        let voteList = List.toArray(list);
                        let first = if (voteList.size() > 0) voteList[0] else 0;
                        let second = if (voteList.size() > 1) voteList[1] else 0;
                        let third = if (voteList.size() > 2) voteList[2] else 0;

                        results := Array.append(results, [(candidate, [first, second, third])]);
                    };

                    return results;
                };
            };
        };

public func confirmResultsForOfficer(
    officerId : Principal,
    candidateClass : CandidateModule.CandidateClass,
) : async Text {
    switch (resultsByOfficer.get(officerId)) {
        case null {
            return "❌ No results found for this officer.";
        };
        case (?innerMap) {
            for ((candidateName, voteList) in innerMap.entries()) {
                let votesArray = List.toArray(voteList);
                let first = if (votesArray.size() > 0) votesArray[0] else 0;
                let second = if (votesArray.size() > 1) votesArray[1] else 0;
                let third = if (votesArray.size() > 2) votesArray[2] else 0;

                let candidate = candidateClass.getElectionCandidates(candidateName);

                if (candidate.nameEn != "not found") {
                    let updatedCandidate : Type.ElectionCandidate = {
                        nameEn = candidate.nameEn;
                        nameSi = candidate.nameSi;
                        nameTa = candidate.nameTa;
                        hisParty = candidate.hisParty;
                        hisSymbol = candidate.hisSymbol;
                        voteCountAsFirstChoice = Nat32.toNat(Nat32.fromIntWrap(first));
                        voteCountAsSecondChoice = Nat32.toNat(Nat32.fromIntWrap(second));
                        voteCountAsThirdChoice = Nat32.toNat(Nat32.fromIntWrap(third));
                    };

                    ignore candidateClass.updateElectionCandidate(updatedCandidate);
                };
            };
            return "✅ Results confirmed and candidates updated.";
        };
    };
}

    };

    // End of VoteModule
    // Return results as [(candidateName, [firstVotes, secondVotes, thirdVotes])]

};
