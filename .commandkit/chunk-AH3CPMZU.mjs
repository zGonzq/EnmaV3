import {
  __commonJS,
  __require,
  init_esm_shims
} from "./chunk-M3OKE2XU.mjs";

// src/models/levels.js
var require_levels = __commonJS({
  "src/models/levels.js"(exports, module) {
    init_esm_shims();
    var { Schema, model } = __require("mongoose");
    var levelSchema = new Schema({
      guildId: { type: String, required: true },
      userId: { type: String, required: true },
      xp: { type: Number, default: 0 },
      level: { type: Number, default: 0 }
    });
    module.exports = model("Level", levelSchema);
  }
});

export {
  require_levels
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL21vZGVscy9sZXZlbHMuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IHsgU2NoZW1hLCBtb2RlbCB9ID0gcmVxdWlyZSgnbW9uZ29vc2UnKTtcclxuXHJcbmNvbnN0IGxldmVsU2NoZW1hID0gbmV3IFNjaGVtYSh7XHJcbiAgICBndWlsZElkOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcclxuICAgIHVzZXJJZDogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXHJcbiAgICB4cDogeyB0eXBlOiBOdW1iZXIsIGRlZmF1bHQ6IDAgfSxcclxuICAgIGxldmVsOiB7IHR5cGU6IE51bWJlciwgZGVmYXVsdDogMCB9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbW9kZWwoJ0xldmVsJywgbGV2ZWxTY2hlbWEpOyJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUFNLEVBQUUsUUFBUSxNQUFNLElBQUksVUFBUSxVQUFVO0FBRTVDLFFBQU0sY0FBYyxJQUFJLE9BQU87QUFBQSxNQUMzQixTQUFTLEVBQUUsTUFBTSxRQUFRLFVBQVUsS0FBSztBQUFBLE1BQ3hDLFFBQVEsRUFBRSxNQUFNLFFBQVEsVUFBVSxLQUFLO0FBQUEsTUFDdkMsSUFBSSxFQUFFLE1BQU0sUUFBUSxTQUFTLEVBQUU7QUFBQSxNQUMvQixPQUFPLEVBQUUsTUFBTSxRQUFRLFNBQVMsRUFBRTtBQUFBLElBQ3RDLENBQUM7QUFFRCxXQUFPLFVBQVUsTUFBTSxTQUFTLFdBQVc7QUFBQTtBQUFBOyIsCiAgIm5hbWVzIjogW10KfQo=