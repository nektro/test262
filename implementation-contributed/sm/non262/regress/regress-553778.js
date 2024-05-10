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
 * This should compile without triggering the following assertion:
 * 
 * Assertion failure: cg->fun->u.i.skipmin <= skip, at ../jsemit.cpp:2346
 */

function f() {
    function g() {
        function h() {
            g; x;
        }
        var [x] = [];
    }
}

