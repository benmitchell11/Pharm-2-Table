/**
 * @license
 *-------------------------------------------------------------------------------------------
 * Copyright © 2024 Progress Software Corporation. All rights reserved.
 * Licensed under commercial license. See LICENSE.md in the package root for more information
 *-------------------------------------------------------------------------------------------
 */
"use client";
import * as n from "react";
const u = (i, t, e) => {
  const [a, s] = n.useState(t || i), d = n.useCallback(
    (o, r) => {
      s(o), e && e.call(void 0, { ...r, value: o });
    },
    [e, s]
  );
  return [t !== void 0 ? t : a, d];
};
export {
  u as useControlledState
};
