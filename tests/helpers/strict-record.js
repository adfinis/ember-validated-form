// Names a WarpDrive schema record lets code read even when its schema lacks
// them.
const EXEMPT = ["then", "length", "nodeType", "setInterval", "document"];

// Like a WarpDrive schema record in development: reading a string key outside
// its schema throws, while symbol reads and `in` answer without throwing.
export default function strictRecord(fields) {
  return new Proxy(fields, {
    get(target, prop) {
      if (typeof prop === "symbol" || prop in target) {
        return Reflect.get(target, prop);
      }
      if (EXEMPT.includes(prop)) {
        return undefined;
      }
      throw new Error(`No field named ${prop} on page`);
    },
  });
}
