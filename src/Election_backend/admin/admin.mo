import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Types "../utils/types";

module AdminModule {

    public class AdminClass() {

        // store admins in election commision.
        private var mapOfElectionAdmins = HashMap.HashMap<Principal, Types.ElectionAdminType>(1, Principal.equal, Principal.hash);

        public func getElectionAdmins(id : Principal) : Types.ElectionAdminType {

            var notfundCandidate : Types.ElectionAdminType = {
                name = "not found";
                role = "not found";
            };

            let admin : Types.ElectionAdminType = switch (mapOfElectionAdmins.get(id)) {
                case (null) { return notfundCandidate };
                case (?result) { return result };
            };
            return admin;
        };

        public func createElectionAdmins(id : Principal, adminName : Text) : Text {
            let electionAdmin : Types.ElectionAdminType = {
                name = adminName;
                role = "Admin";
            };

            mapOfElectionAdmins.put(id, electionAdmin);
            return "Success";
        };

        public func isAdmin(id : Principal) : Bool {
            let isAdmin : Bool = switch (mapOfElectionAdmins.get(id)) {
                case (null) { return false };
                case (?result) { return true };
            };

            return isAdmin;
        };

    };

};
