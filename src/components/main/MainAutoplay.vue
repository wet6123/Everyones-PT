<template>
  <div>
    <div class="embed-youtube">
      <div>
        <img
          :src="`${videos[0].url}`"
          alt=""
          :class="[{ autoimg: true }, { hideIt: hide }]"
          @load="hideimg()"
        />
      </div>
      <div class="fader"></div>
      <div class="noTouch"></div>
      <div class="channelAndTitle">
        <!-- channel & title -->
        <div class="Ychannel">{{ videos[0].channelName }}</div>
        <div class="Ytitle">{{ videos[0].title }}</div>
      </div>
      <iframe
        width="700"
        height="440"
        :src="`https://www.youtube.com/embed/${videos[0].videoKey}?autoplay=1&mute=1&controls=0&disablekb=1&modestbranding=1&loop=1&start=20`"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        class="mainVideo"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MainAutoplay",
  data() {
    return {
      hide: false,
    };
  },
  computed: {
    ...mapState(["videos"]),
  },
  methods: {
    hideimg() {
      setTimeout(() => (this.hide = true), 4000);
    },
  },
};
</script>

<style>
:root {
  --main-text-color: rgb(248, 47, 98);
  --sub-text-color: #fff;
  --background-color: #fff;
  --logo-color: rgb(248, 47, 98);
}

.autoimg {
  visibility: visible;
  opacity: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 3;
  transition: 1s;
}
.hideIt {
  visibility: hidden;
  opacity: 0;
}
.fader {
  position: absolute;
  top: 81%;
  background: linear-gradient(
    to top,
    var(--background-color),
    var(--background-color) 10%,
    transparent
  );
  width: 100%;
  height: 20%;
  z-index: 3;
}
/* css for prevent click video */
.noTouch {
  position: absolute;
  top: 0%;
  background-color: transparent;
  width: 100%;
  height: 100%;
  z-index: 2;
}
.channelAndTitle {
  position: absolute;
  top: 50%;
  left: 5%;
  z-index: 2;
}
.Ychannel {
  font-size: 60px;
  color: var(--main-text-color);
}
.Ytitle {
  word-break: keep-all;
  font-size: 30px;
  color: var(--sub-text-color);
  width: 40%;
}
</style>
