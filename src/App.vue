<template>
  <canvas style="width: 100vw; height: 100vh" id="canvas" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import { createOasis } from "./oasis";
import One3d from "./one/one";
import Two3d from "./one/two";

export default defineComponent({
  name: "App",
  components: {},
  mounted: () => {
    // new One3d("canvas");
    new Two3d("canvas");
    // createOasis();
  },
});
</script>
