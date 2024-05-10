// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
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

// Symbols can be shared across realms.

if (typeof Reflect !== "undefined" && typeof Reflect.Realm === "function") {
    throw new Error("Congratulations on implementing Reflect.Realm! " +
                    "Please update this test to use it.");
}
if (typeof newGlobal === "function") {
    var g = newGlobal();
    var gj = g.eval("jones = Symbol('jones')");
    assert.sameValue(typeof gj, "symbol");
    assert.sameValue(g.jones, g.jones);
    assert.sameValue(gj, g.jones);
    assert.sameValue(gj !== Symbol("jones"), true);

    // A symbol can be round-tripped to another realm and back;
    // the result is the original symbol.
    var smith = Symbol("smith");
    g.smith = smith;  // put smith into the realm
    assert.sameValue(g.smith, smith);  // pull it back out

    // Spot-check that non-generic methods can be applied to symbols and Symbol
    // objects from other realms.
    assert.sameValue(Symbol.prototype.toString.call(gj), "Symbol(jones)");
    assert.sameValue(Symbol.prototype.toString.call(g.eval("Object(Symbol('brown'))")),
             "Symbol(brown)");

    // Symbol.for functions share a symbol registry across all realms.
    assert.sameValue(g.Symbol.for("ponies"), Symbol.for("ponies"));
    assert.sameValue(g.eval("Symbol.for('rainbows')"), Symbol.for("rainbows"));
}

