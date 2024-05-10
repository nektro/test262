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
---*/// -*- Mode: C++; tab-width: 8; indent-tabs-mode: nil; c-basic-offset: 4 -*-
// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/licenses/publicdomain/

var a = [new Boolean(true),
         new Boolean(false),
         new Number(0),
         new Number(-0),
         new Number(Math.PI),
         new Number(0x7fffffff),
         new Number(-0x7fffffff),
         new Number(0x80000000),
         new Number(-0x80000000),
         new Number(0xffffffff),
         new Number(-0xffffffff),
         new Number(0x100000000),
         new Number(-0x100000000),
         new Number(Number.MIN_VALUE),
         new Number(-Number.MIN_VALUE),
         new Number(Number.MAX_VALUE),
         new Number(-Number.MAX_VALUE),
         new Number(1/0),
         new Number(-1/0),
         new Number(0/0),
         new String(""),
         new String("\0123\u4567"),
         new Date(0),
         new Date(-0),
         new Date(0x7fffffff),
         new Date(-0x7fffffff),
         new Date(0x80000000),
         new Date(-0x80000000),
         new Date(0xffffffff),
         new Date(-0xffffffff),
         new Date(0x100000000),
         new Date(-0x100000000),
         new Date(1286523948674),
         new Date(8.64e15), // hard-coded in ES5 spec, hard-coded here
         new Date(-8.64e15),
         new Date(NaN)];

function primitive(a) {
    return a instanceof Date ? +a : a.constructor(a);
}

for (var i = 0; i < a.length; i++) {
    var x = a[i];
    if (x.toSource) {
        var expectedSource = x.toSource();
    }
    var expectedPrimitive = primitive(x);
    var expectedProto = x.__proto__;
    var expectedString = Object.prototype.toString.call(x);
    x.expando = 1;
    x.__proto__ = {};

    var y = deserialize(serialize(x));
    if (x.toSource) {
        assert.sameValue(y.toSource(), expectedSource);
    }
    assert.sameValue(primitive(y), expectedPrimitive);
    assert.sameValue(y.__proto__, expectedProto);
    assert.sameValue(Object.prototype.toString.call(y), expectedString);
    assert.sameValue("expando" in y, false);
}

