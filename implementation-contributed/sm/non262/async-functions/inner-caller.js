// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-async-functions-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
description: |
  pending
esid: pending
---*/function g() {
      return g.caller;
}

(async function f() {
  var inner = g();
  assert.sameValue(inner, null);
})();

(async function f() {
  "use strict";
  var inner = g();
  assert.sameValue(inner, null);
})();

