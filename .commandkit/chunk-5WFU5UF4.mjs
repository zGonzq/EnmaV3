import {
  __commonJS,
  __require,
  init_esm_shims
} from "./chunk-M3OKE2XU.mjs";

// src/models/shop.js
var require_shop = __commonJS({
  "src/models/shop.js"(exports, module) {
    init_esm_shims();
    var mongoose = __require("mongoose");
    var shopSchema = new mongoose.Schema({
      guildId: { type: String, required: true, unique: true },
      roles: [
        {
          id: String,
          price: Number
        }
      ]
    });
    module.exports = mongoose.model("Shop", shopSchema);
  }
});

export {
  require_shop
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL21vZGVscy9zaG9wLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBtb25nb29zZSA9IHJlcXVpcmUoJ21vbmdvb3NlJyk7XHJcblxyXG5jb25zdCBzaG9wU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYSh7XHJcbiAgZ3VpbGRJZDogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlLCB1bmlxdWU6IHRydWUgfSxcclxuICByb2xlczogW1xyXG4gICAge1xyXG4gICAgICBpZDogU3RyaW5nLFxyXG4gICAgICBwcmljZTogTnVtYmVyLFxyXG4gICAgfSxcclxuICBdLFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbW9uZ29vc2UubW9kZWwoJ1Nob3AnLCBzaG9wU2NoZW1hKTsiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFBTSxXQUFXLFVBQVEsVUFBVTtBQUVuQyxRQUFNLGFBQWEsSUFBSSxTQUFTLE9BQU87QUFBQSxNQUNyQyxTQUFTLEVBQUUsTUFBTSxRQUFRLFVBQVUsTUFBTSxRQUFRLEtBQUs7QUFBQSxNQUN0RCxPQUFPO0FBQUEsUUFDTDtBQUFBLFVBQ0UsSUFBSTtBQUFBLFVBQ0osT0FBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBRUQsV0FBTyxVQUFVLFNBQVMsTUFBTSxRQUFRLFVBQVU7QUFBQTtBQUFBOyIsCiAgIm5hbWVzIjogW10KfQo=