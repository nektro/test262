// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-global-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
features: []
info: |
  preventExtensions on global
description: |
  pending
esid: pending
---*/// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/licenses/publicdomain/

//-----------------------------------------------------------------------------
var BUGNUMBER = 621432;
var summary =
  "If a var statement can't create a global property because the global " +
  "object isn't extensible, and an error is thrown while decompiling the " +
  "global, don't assert";

print(BUGNUMBER + ": " + summary);

/**************
 * BEGIN TEST *
 **************/

var toSource = [];
Object.preventExtensions(this);

try
{
  eval("var x;");
  throw new Error("no error thrown");
}
catch (e)
{
  assert.sameValue(e instanceof TypeError, true, "expected TypeError, got: " + e);
}

/******************************************************************************/

print("All tests passed!");
