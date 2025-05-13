import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Type "../types/Type";

module ElectionOfficerModule {
    public class ElectionOfficerClass() {

        private var electionOfficers = HashMap.HashMap<Principal, Type.ElectionOfficer>(1, Principal.equal, Principal.hash);

        public func getElectionOfficers(id : Principal) : Type.ElectionOfficer {
            var notFundCandidate : Type.ElectionOfficer = {
                name = "not found";
                role = "not found";
                pollingStation = "not found";
                pollingDivision = "not found";
                district = "not found";

            };

            let officer : Type.ElectionOfficer = switch (electionOfficers.get(id)) {
                case (null) { return notFundCandidate };
                case (?result) { return result };
            };
            return officer;
        };

        public func createElectionOfficers(id : Principal, electionOfficerName : Text, pollingStation:Text, pollingDivision : Text, district : Text) : async Text {

            let electionOfficer : Type.ElectionOfficer = {
                name = electionOfficerName;
                pollingStation = pollingStation;
                pollingDivision = pollingDivision;
                district = district;
                role = "ElectionOfficer";
            };

            electionOfficers.put(id, electionOfficer);
            return "Success";

        };

        public func isElectionOfficer(id : Principal): Bool{
            let isOfficer : Bool = switch (electionOfficers.get(id)) {
                case (null) { return false };
                case (?result) { return true };
            };
            return isOfficer;
        };

    };

};
