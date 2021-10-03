export const shouldPolyfill =
  typeof globalThis.ETS_PLUGIN === "undefined" || !globalThis.ETS_PLUGIN
