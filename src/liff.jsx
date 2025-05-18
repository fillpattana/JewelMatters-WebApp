// src/liff.js
import liff from "@line/liff";

let liffReady; // cache across HMR

export function initLiff(liffId) {
  if (!liffReady) {
    liffReady = liff.init({ liffId }); // returns a Promise
  }
  return liffReady;
}

export { liff };
