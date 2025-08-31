// src/types/roughjs.d.ts
declare module 'roughjs/bundled/rough.esm' {
    // RoughJS doesn't have types bundled in our project; provide a minimal shim.
    // We export `default` as any so TypeScript won't complain.
    const Rough: any;
    export default Rough;
  }
  