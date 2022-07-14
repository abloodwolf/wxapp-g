"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "index"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => _ctx.videoErrorCallback && _ctx.videoErrorCallback(...args)),
    b: _ctx.danmuList
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/work/workspace/demo-test/wxapp-g/pages/video-pages/index.vue"]]);
wx.createPage(MiniProgramPage);
