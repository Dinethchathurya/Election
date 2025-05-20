// types.mo
module {
public type ElectionCandidate = {
    nameEn : Text;
    nameSi : Text;
    nameTa : Text;
    hisParty : Text;
    hisSymbol : Text;
    voteCountAsFirstChoice : Nat;
    voteCountAsSecondChoice : Nat;
    voteCountAsThirdChoice : Nat;
    // icon : This will be added later
};
  public type ElectionOfficer = {
      name : Text;
      role : Text;
      pollingStation : Text;
      pollingDivision : Text;
      district : Text;
  };

  public type Vote = {
      firstChoice : Text;
      secondChoice : ?Text;
      thirdChoice : ?Text;
      previousVoteHash : ?Text;
  };

}