import {test; suite} "mo:test/async";
import {createElection} "../main"; // Replace with the actual path to the module containing createElection

await suite("my async test suite", func() : async () {
    await test("async test", func() : async () {
        let res = await createElection("presidential", "2022");
        assert Result.isOk(res);
    });
});


// create new module and put this function in it and lets see if it works