// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-Intl-DateTimeFormat-shell.js
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
const hourCycleToH12Map = {
  "h11": true,
  "h12": true,
  "h23": false,
  "h24": false,
};

for (const key of Object.keys(hourCycleToH12Map)) {
  const langTag = "en-US";
  const loc = `${langTag}-u-hc-${key}`;

  const dtf = new Intl.DateTimeFormat(loc, {hour: "numeric"});
  const dtf2 = new Intl.DateTimeFormat(langTag, {hour: "numeric", hourCycle: key});
  assert.sameValue(dtf.resolvedOptions().hourCycle, dtf2.resolvedOptions().hourCycle);
}


/* Legacy hour12 compatibility */

// When constructed with hourCycle option, resolvedOptions' hour12 is correct.
for (const key of Object.keys(hourCycleToH12Map)) {
  const dtf = new Intl.DateTimeFormat("en-US", {hour: "numeric", hourCycle: key});
  assert.sameValue(dtf.resolvedOptions().hour12, hourCycleToH12Map[key]);
}

// When constructed with hour12 option, resolvedOptions' hourCycle is correct
for (const [key, value] of Object.entries(hourCycleToH12Map)) {
  const dtf = new Intl.DateTimeFormat("en-US", {hour: "numeric", hour12: value});
  assert.sameValue(hourCycleToH12Map[dtf.resolvedOptions().hourCycle], value);
}

// When constructed with both hour12 and hourCycle options that don't match
// hour12 takes a precedence.
for (const [key, value] of Object.entries(hourCycleToH12Map)) {
  const dtf = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hourCycle: key,
    hour12: !value
  });
  assert.sameValue(hourCycleToH12Map[dtf.resolvedOptions().hourCycle], !value);
  assert.sameValue(dtf.resolvedOptions().hour12, !value);
}

// When constructed with hourCycle as extkey, resolvedOptions' hour12 is correct.
for (const [key, value] of Object.entries(hourCycleToH12Map)) {
  const langTag = "en-US";
  const loc = `${langTag}-u-hc-${key}`;

  const dtf = new Intl.DateTimeFormat(loc, {hour: "numeric"});
  assert.sameValue(dtf.resolvedOptions().hour12, value);
}

const expectedValuesENUS = {
  h11: "0 AM",
  h12: "12 AM",
  h23: "00",
  h24: "24"
};

const exampleDate = new Date(2017, 10-1, 10, 0);
for (const [key, val] of Object.entries(expectedValuesENUS)) {
  assert.sameValue(
    Intl.DateTimeFormat("en-US", {hour: "numeric", hourCycle: key}).format(exampleDate),
    val
  );
}

const invalidHourCycleValues = [
  "h28",
  "f28",
];

for (const key of invalidHourCycleValues) {
  const langTag = "en-US";
  const loc = `${langTag}-u-hc-${key}`;

  const dtf = new Intl.DateTimeFormat(loc, {hour: "numeric"});
  assert.sameValue(dtf.resolvedOptions().hour12, true); // default value for en-US
  assert.sameValue(dtf.resolvedOptions().hourCycle, "h12"); //default value for en-US
}

{
  // hourCycle is not present in resolvedOptions when the formatter has no hour field
  const options = Intl.DateTimeFormat("en-US", {hourCycle:"h11"}).resolvedOptions();
  assert.sameValue("hourCycle" in options, false);
  assert.sameValue("hour12" in options, false);
}

{
  // Make sure that hourCycle option overrides the unicode extension
  let dtf = Intl.DateTimeFormat("en-US-u-hc-h23", {hourCycle: "h24", hour: "numeric"});
  assert.sameValue(
    dtf.resolvedOptions().hourCycle,
    "h24"
  );
}

{
  // Make sure that hour12 option overrides the unicode extension
  let dtf = Intl.DateTimeFormat("en-US-u-hc-h23", {hour12: true, hour: "numeric"});
  assert.sameValue(
    dtf.resolvedOptions().hourCycle,
    "h12"
  );
}

{
  // Make sure that hour12 option overrides hourCycle options
  let dtf = Intl.DateTimeFormat("en-US",
    {hourCycle: "h12", hour12: false, hour: "numeric"});
  assert.sameValue(
    dtf.resolvedOptions().hourCycle,
    "h23"
  );
}

{
  // Make sure that hour12 option overrides hourCycle options
  let dtf = Intl.DateTimeFormat("en-u-hc-h11", {hour: "numeric"});
  assert.sameValue(
    dtf.resolvedOptions().locale,
    "en-u-hc-h11"
  );
}

{
  // Make sure that hour12 option overrides unicode extension
  let dtf = Intl.DateTimeFormat("en-u-hc-h11", {hour: "numeric", hourCycle: "h24"});
  assert.sameValue(
    dtf.resolvedOptions().locale,
    "en"
  );
  assert.sameValue(
    dtf.resolvedOptions().hourCycle,
    "h24"
  );
}

