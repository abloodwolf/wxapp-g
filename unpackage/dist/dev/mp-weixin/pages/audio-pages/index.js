"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.reactive({});
    let innerAudioContext = common_vendor.reactive({});
    const audioList = common_vendor.reactive([
      {
        poster: "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/7fbf26a0-4f4a-11eb-b680-7980c8a877b8.png",
        name: "\u81F4\u7231\u4E3D\u4E1D",
        author: "\u6682\u65E0",
        src: "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3"
      },
      {
        poster: "http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000",
        name: "\u6DCB\u96E8\u4E00\u76F4\u8D70",
        author: "\u5F20\u97F6\u6DB5",
        src: "http://m701.music.126.net/20220714203038/8a21e60614b728be71d566fc2dc18e06/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/14096596906/2457/b1ac/7081/26cab2b46533edb592924e5b4c949aa0.mp3"
      }
    ]);
    common_vendor.onMounted(() => {
      innerAudioContext = common_vendor.index.createInnerAudioContext();
      innerAudioContext.autoplay = true;
    });
    const playAudio = (item) => {
      innerAudioContext.src = item.src;
      innerAudioContext.onPlay(() => {
        console.log("\u5F00\u59CB\u64AD\u653E");
      });
      innerAudioContext.onError((res) => {
        console.log(res.errMsg);
        console.log(res.errCode);
      });
    };
    const stopAudio = () => {
      innerAudioContext.onStop(() => {
        console.log("\u505C\u6B62\u64AD\u653E");
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(audioList, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.o(($event) => stopAudio()),
            c: common_vendor.o(($event) => playAudio(item))
          };
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-289f1427"], ["__file", "D:/work/workspace/demo-test/uniapp-vue/pages/audio-pages/index.vue"]]);
wx.createPage(MiniProgramPage);
