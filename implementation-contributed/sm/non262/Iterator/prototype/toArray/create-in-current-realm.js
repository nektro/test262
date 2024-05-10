// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-shell.js
- shell.js
flags:
- noStrict
features:
- Iterator
info: |
  Iterator is not enabled unconditionally
description: |
  pending
esid: pending
---*/
const otherGlobal = newGlobal({newCompartment: true});

let array = [1, 2, 3].values().toArray();
assert.sameValue(array instanceof Array, true);
assert.sameValue(array instanceof otherGlobal.Array, false);

array = otherGlobal.Iterator.prototype.toArray.call([1, 2, 3].values());
assert.sameValue(array instanceof Array, false);
assert.sameValue(array instanceof otherGlobal.Array, true);

