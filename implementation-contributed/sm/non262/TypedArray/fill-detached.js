// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- detachArrayBuffer.js
- non262-TypedArray-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
description: |
  pending
esid: pending
---*/// Ensure %TypedArray%.prototype.fill checks for detached buffers.

function DetachArrayBufferValue(buffer, value) {
    return {
        valueOf() {
            $DETACHBUFFER(buffer);
            return value;
        }
    };
}

function DetachTypedArrayValue(ta, value) {
    return {
        valueOf() {
            $DETACHBUFFER(ta.buffer);
            return value;
        }
    };
}

// Test when ArrayBuffer is already reified.
for (let length of [0, 1, 10, 4096]) {
    let ta = new Int32Array(length);
    let value = DetachArrayBufferValue(ta.buffer, 123);
    assertThrowsInstanceOf(() => ta.fill(value), TypeError);
}

// Test when ArrayBuffer is reified during the fill() call.
for (let length of [0, 1, 10, 4096]) {
    let ta = new Int32Array(length);
    let value = DetachTypedArrayValue(ta, 123);
    assertThrowsInstanceOf(() => ta.fill(value), TypeError);
}

