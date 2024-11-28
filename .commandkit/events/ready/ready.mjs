import {
  __commonJS,
  __require,
  init_esm_shims
} from "../../chunk-M3OKE2XU.mjs";

// src/events/ready/ready.js
var require_ready = __commonJS({
  "src/events/ready/ready.js"(exports, module) {
    init_esm_shims();
    var mongoose = __require("mongoose");
    module.exports = (client) => {
      console.log(`Estado de la base de datos: ${mongoose.connection.readyState === 1 ? "Conectada" : "No conectada"}`);
      console.log(`Activo en: ${client.guilds.cache.size} servidores`);
      console.log(`${client.user.tag} est\xE1 listo`);
    };
  }
});
export default require_ready();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL2V2ZW50cy9yZWFkeS9yZWFkeS5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgbW9uZ29vc2UgPSByZXF1aXJlKCdtb25nb29zZScpO1xuLyoqICogQHBhcmFtIHtpbXBvcnQoJ2Rpc2NvcmQuanMnKS5DbGllbnR9IGNsaWVudCAqL1xubW9kdWxlLmV4cG9ydHMgPSAoY2xpZW50KSA9PiB7XG4gICAgY29uc29sZS5sb2coYEVzdGFkbyBkZSBsYSBiYXNlIGRlIGRhdG9zOiAke21vbmdvb3NlLmNvbm5lY3Rpb24ucmVhZHlTdGF0ZSA9PT0gMSA/ICdDb25lY3RhZGEnIDogJ05vIGNvbmVjdGFkYSd9YCk7XG4gICAgY29uc29sZS5sb2coYEFjdGl2byBlbjogJHtjbGllbnQuZ3VpbGRzLmNhY2hlLnNpemV9IHNlcnZpZG9yZXNgKTtcbiAgICBjb25zb2xlLmxvZyhgJHtjbGllbnQudXNlci50YWd9IGVzdFx1MDBFMSBsaXN0b2ApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUFNLFdBQVcsVUFBUSxVQUFVO0FBRW5DLFdBQU8sVUFBVSxDQUFDLFdBQVc7QUFDekIsY0FBUSxJQUFJLCtCQUErQixTQUFTLFdBQVcsZUFBZSxJQUFJLGNBQWMsY0FBYyxFQUFFO0FBQ2hILGNBQVEsSUFBSSxjQUFjLE9BQU8sT0FBTyxNQUFNLElBQUksYUFBYTtBQUMvRCxjQUFRLElBQUksR0FBRyxPQUFPLEtBQUssR0FBRyxnQkFBYTtBQUFBLElBQy9DO0FBQUE7QUFBQTsiLAogICJuYW1lcyI6IFtdCn0K