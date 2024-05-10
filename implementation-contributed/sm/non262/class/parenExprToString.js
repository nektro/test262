// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-class-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
description: |
  pending
esid: pending
---*/// Test that parenthesized class expressions don't get their toString offsets
// messed up.

assert.sameValue((class {}).toString(), "class {}");
assert.sameValue(((class {})).toString(), "class {}");

