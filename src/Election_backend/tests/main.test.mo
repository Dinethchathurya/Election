
// Replace with the actual path to the module containing createElection

// await suite("my async test suite", func() : async () {
//     await test("async test", func() : async () {
//         let res = await createElection("presidential", "2022");
//         assert Result.isOk(res);
//     });
// });


// create new module and put this function in it and lets see if it works

import { test; suite } "mo:test/async";
import Debug "mo:base/Debug";// ✅ adjust path if needed
import Nat "mo:base/Nat";

await suite("Basic Math Tests", func() : async () {

  await test("addition works", func() : async () {
    let sum = 30;
    Debug.print("10 + 20 = " # Nat.toText(sum));
    assert (sum == 30);
  });



});