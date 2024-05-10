// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-regress-shell.js
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
 * Contributors: Christian Holler <decoder@own-hero.net> and Jason Orendorff
 */

function C(){}
C.prototype = 1;
try {
    Object.defineProperty(C, "prototype", {get: function() { throw 0; }});
    actual = "no exception";
} catch (exc) {
    actual = exc.name;
}
new C; // don't assert
assert.sameValue(actual, "TypeError");
