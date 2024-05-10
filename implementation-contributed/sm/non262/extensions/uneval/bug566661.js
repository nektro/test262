// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-extensions-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
features: []
description: |
  pending
esid: pending
---*/
var f = function (q) { return q['\xC7']; }
var d = eval(uneval(f));
assert.sameValue(d({'\xC7': 'good'}), 'good');

