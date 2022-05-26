<template>
  <div class="allThing">
    <div class="embed-youtube">
      <div>
        <img
          :src="`${mainVideo.url}`"
          alt=""
          :class="[{ autoimg: true }, { hideIt: hide }]"
          @load="hideimg"
        />
      </div>
      <div class="fader"></div>
      <div class="noTouch"></div>
      <div :class="[{ channelAndTitle: true }, { hideIt: !hide }]">
        <!-- channel & title -->

        <div class="Ychannel">
          <router-link :to="`/vdetail/${mainVideo.id}`">
            <button class="playBtn">
              <font-awesome-icon icon="fas fa-play-circle" />
            </button>
          </router-link>

          {{ mainVideo.channelName }}
        </div>
        <div class="Ytitle">{{ mainVideo.title }}</div>
      </div>
      <iframe
        width="700"
        height="440"
        :src="`https://www.youtube.com/embed/${mainVideo.videoKey}?autoplay=1&mute=1&controls=0&disablekb=1&modestbranding=1&loop=1&playlist=${mainVideo.videoKey}&start=20end=300`"
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
    ...mapState(["mainVideo"]),
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
    var(--v-primary-base),
    var(--v-primary-base) 10%,
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
.allThing {
  margin-bottom: 20px;
}

@media screen and (max-width: 768px) {
  .allThing {
    display: none;
  }
}
</style>
