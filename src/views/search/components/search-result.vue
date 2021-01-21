<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="加载失败，请点击重试"
    >
      <van-cell v-for="(article, index) in list" :key="index" :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20,
      error: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    async onLoad() {
      try {
        // // 1. 请求获取数据
        // const { data } = await getSearchResult({
        //   page: this.page, // 页码
        //   per_page: this.per_page, // 每页大小
        //   q: this.searchText // 搜索关键字
        // })
        // console.log(data)
        // // 2. 将数据添加到列表中
        // const { results } = data.data
        // console.log(results)
        // this.list.push(...results)
        // // 3. 设置加载状态结束
        // this.loading = false
        // // 4. 判断数据是否加载完毕
        // if (results.length) {
        //   // 更新获取下一页数据的页码
        //   this.page++
        // } else {
        //   // 没有数据了，将加载状态设置结束，不再 onLoad
        //   this.finished = false
        // }
        // 1. 请求获取数据
        getSearchResult({
          page: this.page, // 页码
          per_page: this.per_page, // 每页大小
          q: this.searchText // 搜索关键字
        }).then(({ data }) => {
          // // 2. 将数据添加到列表中
          const { results } = data.data
          //   console.log(results)
          this.list.push(...results)
          // 3. 设置加载状态结束
          this.loading = false
          // 4. 判断数据是否加载完毕
          if (results.length) {
            // 更新获取下一页数据的页码
            this.page++
          } else {
            // 没有数据了，将加载状态设置结束，不再 onLoad
            this.finished = false
          }
        })
      } catch (err) {
        //   加载失败的提示
        this.error = true
        //  加载失败了 loading 也要停止
        this.loading = false
        // this.$toast('请求数据失败')
      }
    }
  }
}
</script>

<style scoped></style>
