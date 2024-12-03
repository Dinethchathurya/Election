import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";

// this data type for store election Officers details.

module ElectionOfficerModule {
    class ElectionOfficerClass() {

        private type ElectionOfficer = {
            name : Text;
            electionCenter : Text;
            role : Text;
        };

        var electionOfficers = HashMap.HashMap<Principal, ElectionOfficer>(1, Principal.equal, Principal.hash);

        public func getElectionOfficers(id : Principal) : ElectionOfficer {
            var notfundCandidate : ElectionOfficer = {
                name = "not found";
                electionCenter = "not found";
                role = "not found";
            };

            let offier : ElectionOfficer = switch (electionOfficers.get(id)) {
                case (null) { return notfundCandidate };
                case (?result) { return result };
            };
            return offier;
        };

        public func createElectionOfficers(id : Principal, electionOfficername : Text, electionCenter : Text) : async Text {

            let electionOfficer : ElectionOfficer = {
                name = electionOfficername;
                electionCenter = electionCenter;
                role = "ElectionOfficer";
            };

            electionOfficers.put(id, electionOfficer);
            return "Success";

        };

    };

};
