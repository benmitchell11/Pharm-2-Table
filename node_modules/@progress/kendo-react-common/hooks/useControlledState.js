/**
 * @license
 *-------------------------------------------------------------------------------------------
 * Copyright © 2024 Progress Software Corporation. All rights reserved.
 * Licensed under commercial license. See LICENSE.md in the package root for more information
 *-------------------------------------------------------------------------------------------
 */
"use client";"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const i=require("react");function l(t){const n=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const e in t)if(e!=="default"){const o=Object.getOwnPropertyDescriptor(t,e);Object.defineProperty(n,e,o.get?o:{enumerable:!0,get:()=>t[e]})}}return n.default=t,Object.freeze(n)}const s=l(i),d=(t,n,e)=>{const[o,r]=s.useState(n||t),a=s.useCallback((c,u)=>{r(c),e&&e.call(void 0,{...u,value:c})},[e,r]);return[n!==void 0?n:o,a]};exports.useControlledState=d;
