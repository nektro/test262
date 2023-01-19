// Copyright (C) 2022 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.duration.prototype.total
description: A number as calendar in relativeTo property bag is converted to a string, then to a calendar
features: [Temporal]
---*/

const instance = new Temporal.Duration(1, 0, 0, 0, 24);

const calendar = 19970327;

const relativeTo = { year: 2019, monthCode: "M11", day: 1, calendar };
const result = instance.total({ unit: "days", relativeTo });
assert.sameValue(result, 367, "19970327 is a valid ISO string for relativeTo.calendar");

const numbers = [
  1,
  -19970327,
  1234567890,
];

for (const calendar of numbers) {
  const relativeTo = { year: 2019, monthCode: "M11", day: 1, calendar };
  assert.throws(
    RangeError,
    () => instance.total({ unit: "days", relativeTo }),
    `Number ${calendar} does not convert to a valid ISO string for relativeTo.calendar`
  );
}
