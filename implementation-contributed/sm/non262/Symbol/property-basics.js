// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- deepEqual.js
- non262-Symbol-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
description: |
  pending
esid: pending
---*//* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/licenses/publicdomain/ */

var symbols = [
    Symbol(),
    Symbol("one"),
    Symbol.for("two"),
    Symbol.iterator,
    Object(Symbol())
];

for (var sym of symbols) {
    var obj = {};

    // access a nonexistent property
    assert.sameValue(sym in obj, false);
    assert.sameValue(obj.hasOwnProperty(sym), false);
    assert.sameValue(obj[sym], undefined);
    assert.sameValue(typeof obj[sym], "undefined");
    assert.sameValue(Object.getOwnPropertyDescriptor(obj, sym), undefined);

    // assign, then try accessing again
    obj[sym] = "ok";
    assert.sameValue(sym in obj, true);
    assert.sameValue(obj.hasOwnProperty(sym), true);
    assert.sameValue(obj[sym], "ok");
    assert.deepEqual(Object.getOwnPropertyDescriptor(obj, sym), {
        value: "ok",
        writable: true,
        enumerable: true,
        configurable: true
    });

    // assign again, observe value is overwritten
    obj[sym] = 12;
    assert.sameValue(obj[sym], 12);

    // increment
    assert.sameValue(obj[sym]++, 12);
    assert.sameValue(obj[sym], 13);
}

