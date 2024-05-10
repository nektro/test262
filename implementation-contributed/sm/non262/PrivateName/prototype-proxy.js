// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-PrivateName-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
features:
- wrapWithProto
description: |
  pending
esid: pending
---*/
const o0 = {};
const v2 = new Proxy(o0, o0);

// v8 is a forwarding proxy with "prototype" behaviour;
// see the comment for mHasPrototype on BaseProxyHandler
// in Proxy.h.
//
// Private Fields don't interact with the hasPrototype
// behaviour (to minimize the overhead, and since private
// fields are always own properties).
const v8 = this.wrapWithProto(v2, {});
function f9(a10) {
    return v8;
}
class C11 extends f9 {
    #b = 12;
    static {
        const v13 = new this();

        const val = v8.#b; // Get
        assert.sameValue(val, 12);

        v8.#b = 0; // Set
        assert.sameValue(v8.#b, 0);

        assert.sameValue(#b in v8, true); // HasOwn.
    }
}

