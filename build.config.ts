import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  declaration: true,
  rollup: {
    emitCJS: true,
  },
  entries: ["src/index",
    "src/scopes/index",
    "src/types/index"
  ],
  externals: ["undici"],
});