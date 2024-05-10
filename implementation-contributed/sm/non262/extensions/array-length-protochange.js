// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-extensions-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
description: |
  pending
esid: pending
---*/// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/licenses/publicdomain/

//-----------------------------------------------------------------------------
var BUGNUMBER = 548671;
var summary =
  "Don't use a shared-permanent inherited property to implement " +
  "[].length or (function(){}).length";

print(BUGNUMBER + ": " + summary);

/**************
 * BEGIN TEST *
 **************/

var a = [1, 2, 3];
a.__proto__ = null;
assert.sameValue("length" in a, true, "length should be own property of array");
assert.sameValue(Object.hasOwnProperty.call(a, "length"), true,
              "length should be own property of array");
assert.sameValue(a.length, 3, "array length should be 3");

var a = [], b = [];
b.__proto__ = a;
assert.sameValue(b.hasOwnProperty("length"), true,
              "length should be own property of array");
b.length = 42;
assert.sameValue(b.length, 42, "should have mutated b's (own) length");
assert.sameValue(a.length, 0, "should not have mutated a's (own) length");


print("All tests passed!");
