<template>
  <div>
    <!-- <div>여기는 mainview입니다</div> -->
    <main-autoplay />
    <main-carousel></main-carousel>
    <!-- main video에 부위랑 비디오 출력 있음 -->
    <main-video></main-video>
  </div>
</template>

<script>
import MainAutoplay from "@/components/main/MainAutoplay.vue";
import MainCarousel from "@/components/main/MainCarousel.vue";
import MainVideo from "@/components/main/MainVideo.vue";

export default {
  components: {
    MainAutoplay,
    MainCarousel,
    MainVideo,
  },
};
</script>
