// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- compareArray.js
- non262-Intl-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
features:
- Intl
description: |
  pending
esid: pending
---*/
// Language tags are processed case-insensitive, but unconditionally calling
// the built-in String.prototype.toLowerCase() or toUpperCase() function
// before parsing a language tag can map non-ASCII characters into the ASCII
// range.
//
// Validate the Unicode BCP 47 locale identifier parser handles this case
// (pun intended) correctly by passing language tags which contain
// U+212A (KELVIN SIGN) and U+0131 (LATIN SMALL LETTER DOTLESS I) to
// Intl.getCanonicalLocales().

// The lower-case form of "i-ha\u212A" is "i-hak".
assert.sameValue("i-hak", "i-ha\u212A".toLowerCase());

// The upper-case form of "\u0131-hak" is "I-HAK".
assert.sameValue("I-HAK", "\u0131-hak".toUpperCase());

// "i-hak" is not a valid Unicode BCP 47 locale identifier.
assertThrowsInstanceOf(() => Intl.getCanonicalLocales("i-hak"), RangeError);

// And neither is "i-ha\u212A".
assertThrowsInstanceOf(() => Intl.getCanonicalLocales("i-ha\u212A"), RangeError);

// And also "\u0131-hak" isn't valid.
assertThrowsInstanceOf(() => Intl.getCanonicalLocales("\u0131-hak"), RangeError);

// The lower-case form of "zh-ha\u212A\u212Aa" is "zh-hakka".
assert.sameValue("zh-hakka", "zh-ha\u212A\u212Aa".toLowerCase());

// "zh-hakka" is a valid Unicode BCP 47 locale identifier.
assert.compareArray(Intl.getCanonicalLocales("zh-hakka"), ["hak"]);

// But "zh-ha\u212A\u212Aa" is not a valid locale identifier.
assertThrowsInstanceOf(() => Intl.getCanonicalLocales("zh-ha\u212A\u212Aa"), RangeError);

// The lower-case form of "zh-x\u0131ang" is "ZH-XIANG".
assert.sameValue("ZH-XIANG", "zh-x\u0131ang".toUpperCase());

// "zh-xiang" is a valid Unicode BCP 47 locale identifier.
assert.compareArray(Intl.getCanonicalLocales("zh-xiang"), ["hsn"]);

// But "zh-x\u0131ang" is not a valid locale identifier.
assertThrowsInstanceOf(() => Intl.getCanonicalLocales("zh-x\u0131ang"), RangeError);

