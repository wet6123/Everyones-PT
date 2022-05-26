<template>
  <div>
    <div class="embed-youtube">
      <div>
        <img
          :src="`${recommend[0].url}`"
          alt=""
          :class="[{ autoimg: true }, { hideIt: hide }]"
          @load="hideimg()"
        />
      </div>
      <div class="fader"></div>
      <div class="noTouch"></div>
      <div :class="[{ channelAndTitle: true }, { hideIt: !hide }]">
        <!-- channel & title -->

        <div class="Ychannel">
          <router-link :to="`/vdetail/${recommend[0].id}`">
            <button class="playBtn">
              <font-awesome-icon icon="fas fa-play-circle" />
            </button>
          </router-link>

          {{ recommend[0].channelName }}
        </div>
        <div class="Ytitle">{{ recommend[0].title }}</div>
      </div>
      <iframe
        width="700"
        height="440"
        :src="`https://www.youtube.com/embed/${recommend[0].videoKey}?autoplay=1&mute=1&controls=0&disablekb=1&modestbranding=1&loop=1&playlist=${recommend[0].videoKey}&start=20end=300`"
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
    ...mapState(["recommend"]),
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
  z-index: 2;
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
  top: 40%;
  left: 5%;
  z-index: 4;

  /* no drag */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.Ychannel {
  font-size: calc(0.75em + 4vw);
  color: var(--main-text-color);
}
.Ytitle {
  visibility: visible;
  word-break: keep-all;
  font-size: calc(2vw);
  color: var(--sub-text-color);
  width: 50%;
}
.playBtn {
  color: var(--main-text-color);
}
.playBtn:hover {
  color: var(--sub-text-color);
}

@media screen and (max-width: 768px) {
  .Ytitle {
    visibility: hidden;
  }
}
</style>
