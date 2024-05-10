// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-Map-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
description: |
  pending
esid: pending
---*//*
 * Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/licenses/publicdomain/
 */

//-----------------------------------------------------------------------------
var BUGNUMBER = 722260;
var summary = 'All NaNs must be treated as identical keys for Map';

print(BUGNUMBER + ": " + summary);

/**************
 * BEGIN TEST *
 **************/

/* Avoid constant-folding that would happen were |undefined| to be used. */
var key = -/a/g.missingProperty;

var m = new Map();
m.set(key, 17);
assert.sameValue(m.get(key), 17);
assert.sameValue(m.get(-key), 17);
assert.sameValue(m.get(NaN), 17);

m.delete(-key);
assert.sameValue(m.has(key), false);
assert.sameValue(m.has(-key), false);
assert.sameValue(m.has(NaN), false);

m.set(-key, 17);
assert.sameValue(m.get(key), 17);
assert.sameValue(m.get(-key), 17);
assert.sameValue(m.get(NaN), 17);

m.delete(NaN);
assert.sameValue(m.has(key), false);
assert.sameValue(m.has(-key), false);
assert.sameValue(m.has(NaN), false);

m.set(NaN, 17);
assert.sameValue(m.get(key), 17);
assert.sameValue(m.get(-key), 17);
assert.sameValue(m.get(NaN), 17);

m.delete(key);
assert.sameValue(m.has(key), false);
assert.sameValue(m.has(-key), false);
assert.sameValue(m.has(NaN), false);

/******************************************************************************/

print("Tests complete");
