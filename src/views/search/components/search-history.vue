<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('update_search_history')">全部删除完成</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in SearchHistory"
      :key="index"
      @click="onSearchItemClick(item, index)"
    >
      <van-icon name="close" v-if="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    SearchHistory: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDeleteShow: false // 控制删除状态的显示隐藏
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    onSearchItemClick(item, index) {
      if (this.isDeleteShow) {
        // 删除状态，删除历史记录数据
        this.SearchHistory.splice(index, 1)
      } else {
        // 非删除状态，直接进入搜索
      }
    }
  }
}
</script>

<style scoped></style>
