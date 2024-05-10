// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-extensions-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
features: []
description: |
  pending
esid: pending
---*//* -*- Mode: js2; tab-width: 40; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/*
 * Any copyright is dedicated to the Public Domain.
 * https://creativecommons.org/publicdomain/zero/1.0/
 */

// Deserialize a serialization buffer containing a reference to a
// SharedArrayBuffer buffer object enough times and we will crash because of a
// reference counting bug.

if (!this.SharedArrayBuffer) {
quit(0);
}

let x = new SharedArrayBuffer(1);
let y = serialize(x, [], {SharedArrayBuffer: 'allow'});
x = null;

// If the bug is present this loop usually crashes quickly during
// deserialization because the memory has become unmapped.

for (let i=0 ; i < 50 ; i++ ) {
    let obj = deserialize(y, {SharedArrayBuffer: 'allow'});
    let z = new Int8Array(obj);
    z[0] = 0;
}

