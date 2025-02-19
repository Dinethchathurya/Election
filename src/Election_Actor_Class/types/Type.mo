// types.mo
module {
  public type ElectionCandidate = {
      name : Text;
      hisParty : Text;
      voteCountAsFirstChoice : Nat;
      voteCountAsSecondChoice : Nat;
      voteCountAsThirdChoice : Nat;
      //icon :this will add later
  };

  public type ElectionOfficer = {
      name : Text;
      electionCenter : Text;
      role : Text;
  };

  public type Vote = {
      firstChoice : Text;
      secondChoice : ?Text;
      thirdChoice : ?Text;
      previousVoteHash : ?Text;
  };

}