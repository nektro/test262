// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-JSON-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
description: |
  pending
esid: pending
---*/// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/licenses/publicdomain/

var gTestfile = 'parse-mega-huge-array.js';
//-----------------------------------------------------------------------------
var BUGNUMBER = 667527;
var summary = "JSON.parse should parse arrays of essentially unlimited size";

print(BUGNUMBER + ": " + summary);

/**************
 * BEGIN TEST *
 **************/

var body = "0,";
for (var i = 0; i < 21; i++)
  body = body + body;
var str = '[' + body + '0]';

var arr = JSON.parse(str);
assert.sameValue(arr.length, Math.pow(2, 21) + 1);

/******************************************************************************/

print("Tests complete");
