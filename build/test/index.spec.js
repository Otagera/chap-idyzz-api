function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}
var common = require("./common.spec");
describe("index", function () {
    beforeEach(function () {
        console.log("running something before each test");
    });
    importTest("auth", "./auth.spec");
    importTest("product", "./product.spec");
    importTest("order", "./order.spec");
    after(function () {
        console.log("after all tests");
    });
});
//# sourceMappingURL=index.spec.js.map