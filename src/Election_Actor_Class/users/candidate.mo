import HashMap "mo:base/HashMap";
import Text "mo:base/Text";

module CandidateModule {
    public class CandidateClass() {
        // this data type for store election candidats details.
        private type ElectionCandidate = {
            name : Text;
            hisParty : Text;
            //icon :this will add later
        };
        // map all election candidates key as their own name.
        private var electionCandidates = HashMap.HashMap<Text, ElectionCandidate>(1, Text.equal, Text.hash);

        public func createElectionCandidate(candidateName : Text, candidateParty : Text) : async Text {

            let newElectionCandidate : ElectionCandidate = {
                name = candidateName;
                hisParty = candidateParty;
            };

            electionCandidates.put(candidateName, newElectionCandidate);
            return "Success";
        };

        public func getElectionCandidates(name : Text) : ElectionCandidate {

            var notfundCandidate : ElectionCandidate = {
                name = "not found";
                hisParty = "not found";
            };

            var candidate : ElectionCandidate = switch (electionCandidates.get(name)) {
                case (null) { notfundCandidate };
                case (?result) { return result };

            };
            return candidate;
        };

    };
};
