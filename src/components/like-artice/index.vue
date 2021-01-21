<template>
  <van-icon
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    :color="value === 1 ? '#e5645f' : ''"
    @click="onLikeCollect"
    :loading="loading"
  />
</template>

<script>
import { addLikeCollect, deleteLikeCollect } from '@/api/article'
export default {
  name: 'LikeArtice',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, Object, String],
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  component: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLikeCollect() {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          await deleteLikeCollect(this.articleId)
        } else {
          await addLikeCollect(this.articleId)
          status = 1
        }
        // 更新视图
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        this.$toast.fail('操作失败')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped></style>
