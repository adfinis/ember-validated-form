// Whether reading `key` off `obj` is safe. A WarpDrive schema record throws on
// a name outside its schema, so ask with `in` before reading. Ember proxies
// answer keys that `in` cannot see, through `unknownProperty`.
export default function hasProperty(obj, key) {
  return (
    obj !== null &&
    (typeof obj === "object" || typeof obj === "function") &&
    (key in obj || "unknownProperty" in obj)
  );
}
