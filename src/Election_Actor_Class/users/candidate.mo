import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Type "../types/Type";

module CandidateModule {
    public class CandidateClass() {
        // map all election candidates key as their own name.
        private var electionCandidates = HashMap.HashMap<Text, Type.ElectionCandidate>(1, Text.equal, Text.hash);

        public func createElectionCandidate(candidateName : Text, candidateParty : Text) : async Text {

            let newElectionCandidate : Type.ElectionCandidate = {
                name = candidateName;
                hisParty = candidateParty;
                voteCountAsFirstChoice = 0;
                voteCountAsSecondChoice = 0;
                voteCountAsThirdChoice = 0;
            };

            electionCandidates.put(candidateName, newElectionCandidate);
            return "Success";
        };

        public func getElectionCandidates(name : Text) : Type.ElectionCandidate {

            var notFundCandidate : Type.ElectionCandidate = {
                name = "not found";
                hisParty = "not found";
                voteCountAsFirstChoice = 0;
                voteCountAsSecondChoice = 0;
                voteCountAsThirdChoice = 0
            };

            var candidate : Type.ElectionCandidate = switch (electionCandidates.get(name)) {
                case (null) { notFundCandidate };
                case (?result) { return result };

            };
            return candidate;
        };

    };
};
