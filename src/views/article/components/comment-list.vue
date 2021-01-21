<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-cell v-for="(item, index) in list" :key="index" :title="item.content" />
  </van-list>
</template>

<script>
import { getComment } from '@/api/comment'
import JSONBig from 'json-bigint'
export default {
  name: 'CommentList',
  components: {},
  props: {
    source: {
      type: [Object, String, Number],
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        // 1.请求获取数据
        const { data } = await getComment({
          type: 'a',
          source: JSONBig.stringify(this.source),
          offset: this.offset,
          limit: this.limit
        })
        // 2.将数据添加到列表中
        const { results } = data.data
        this.list.push(...results)
        // 3.将loding关闭
        this.loading = false
        // 4.判断是否还有数据
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
        console.log(data)
      } catch (err) {
        console.log('凉了', err)
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
