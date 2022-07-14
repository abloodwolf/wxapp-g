"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.ref("hello word");
    common_vendor.reactive({});
    const imgList = common_vendor.reactive([
      { id: 1, src: "/static/dog.png" },
      { id: 2, src: "/static/dog.png" },
      { id: 3, src: "/static/dog.png" }
    ]);
    const gotoAudio = () => {
      console.log(333);
      common_vendor.index.navigateTo({
        url: "/pages/audio-pages/index?id=1&name=uniapp"
      });
    };
    common_vendor.reactive([
      {
        text: "\u7B2C 1s \u51FA\u73B0\u7684\u5F39\u5E55",
        color: "#ff0000",
        time: 1
      },
      {
        text: "\u7B2C 3s \u51FA\u73B0\u7684\u5F39\u5E55",
        color: "#ff00ff",
        time: 3
      }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(imgList, (item, k0, i0) => {
          return {
            a: item.src,
            b: item.id
          };
        }),
        b: common_vendor.o(gotoAudio),
        c: common_vendor.o(gotoAudio)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-71e217db"], ["__file", "D:/work/workspace/demo-test/uniapp-vue/pages/home/index.vue"]]);
wx.createPage(MiniProgramPage);
