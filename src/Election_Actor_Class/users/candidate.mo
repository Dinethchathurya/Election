import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Type "../types/Type";

module CandidateModule {
    public class CandidateClass() {
        // Use nameEn as the key for candidates
        private var electionCandidates = HashMap.HashMap<Text, Type.ElectionCandidate>(1, Text.equal, Text.hash);

        public func createElectionCandidate(
            candidateNameEn : Text,
            candidateNameSi : Text,
            candidateNameTa : Text,
            candidateParty : Text,
            candidateSymbol : Text
        ) : async Text {

            let newElectionCandidate : Type.ElectionCandidate = {
                nameEn = candidateNameEn;
                nameSi = candidateNameSi;
                nameTa = candidateNameTa;
                hisParty = candidateParty;
                hisSymbol = candidateSymbol;
                voteCountAsFirstChoice = 0;
                voteCountAsSecondChoice = 0;
                voteCountAsThirdChoice = 0;
            };

            electionCandidates.put(candidateNameEn, newElectionCandidate);
            return "Success";
        };

        public func getElectionCandidates(nameEn : Text) : Type.ElectionCandidate {
            let notFoundCandidate : Type.ElectionCandidate = {
                nameEn = "not found";
                nameSi = "නොපැමිණි";
                nameTa = "காணவில்லை";
                hisParty = "not found";
                hisSymbol = "not found";
                voteCountAsFirstChoice = 0;
                voteCountAsSecondChoice = 0;
                voteCountAsThirdChoice = 0;
            };

            switch (electionCandidates.get(nameEn)) {
                case (null) { return notFoundCandidate };
                case (?result) { return result };
            };
        };

        public func updateElectionCandidate(updated : Type.ElectionCandidate) : async Text {
            electionCandidates.put(updated.nameEn, updated);
            return "Candidate updated";
        };

        public func getAllResults() : async [Type.ElectionCandidate] {
            var results : [Type.ElectionCandidate] = [];

            for ((_, candidate) in electionCandidates.entries()) {
                results := Array.append(results, [candidate]);
            };

            return results;
        };
    };
};