<template>
  <div class="carousel">
    <div class="block text-center">
      <el-carousel height="500px" motion-blur>
        <el-carousel-item
          v-for="item in imgList"
          :key="item.id"
          :style="{
            backgroundImage: `url(${item.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }"
        >
          <!-- <img :src="item.src" /> -->
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'my-carousel ',
}
</script>

<script setup lang="ts">
import { nanoid } from 'nanoid'

import banner1 from '@/assets/img/banner1.png'
import banner2 from '@/assets/img/banner2.jpg'
import banner3 from '@/assets/img/banner3.jpg'

const imgList = [
  {
    src: banner1,
    id: nanoid(),
  },
  {
    src: banner2,
    id: nanoid(),
  },
  {
    src: banner3,
    id: nanoid(),
  },
]
</script>

<style scoped lang="scss">
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel__item {
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
</style>
