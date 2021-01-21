<template>
  <van-button
    v-if="isFollowed"
    class="follow-btn"
    round
    size="small"
    :loading="Loading"
    @click="onFollow"
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="Loading"
    @click="onFollow"
    >关注</van-button
  >
</template>

<script>
import { deleteFollow, addFollow } from '@/api/user'

export default {
  name: '',
  components: {},
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Object, Number, String],
      required: true
    }
  },
  data() {
    return {
      Loading: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onFollow() {
      this.Loading = true // 展示关注按钮的 Loading 状态
      try {
        if (this.isFollowed) {
          // 如果已关注，则取消关注
          await deleteFollow(this.userId)
        } else {
          // 否则添加关注
          await addFollow(this.userId)
        }
        // 更新视图
        // this.article.is_followed = !this.article.is_followed
        this.$emit('update_is_followed', !this.isFollowed)
      } catch (err) {
        let message = '操作失败，请重试！'
        if (err.response && err.response === 400) {
          message = '你不能关注你自己'
        }
        // console.log('凉了', err)
        this.$toast(message)
      }
      this.Loading = false // 展示关注按钮的 Loading 状态
    }
  }
}
</script>

<style lang="less" scoped></style>
