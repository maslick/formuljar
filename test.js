const assert = require('assert');

describe("Simple test", () => {
  it("should return 2", done => {
    assert.strictEqual(1 + 1, 2);
    done();
  });

  it("should run", done => {
    done();
  });
});

