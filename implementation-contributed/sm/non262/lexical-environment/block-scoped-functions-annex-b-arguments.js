// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-lexical-environment-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
description: |
  pending
esid: pending
---*/// Test that Annex B function interaction with 'arguments'.

(function() {
  assert.sameValue(typeof arguments, "object");
  { function arguments() {} }
  assert.sameValue(typeof arguments, "function");
})();

