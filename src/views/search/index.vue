<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form class="search_form" action="/">
      <van-search
        v-model="searchText"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :search-text="searchText" />

    <!-- 联想建议 -->
    <search-suggestion v-else-if="searchText" :search-text="searchText" @search="onSearch" />

    <!-- 搜索历史记录 -->
    <search-history
      v-else
      :search-history="SearchHistory"
      @update_search_history="SearchHistory = []"
    />
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchPage',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  props: {},
  data() {
    return {
      searchText: '',
      isResultShow: false, // 控制显示结果
      SearchHistory: getItem('toutiao_search_hist') || [] // 历史记录的数组
    }
  },
  computed: {},
  watch: {
    SearchHistory(value) {
      setItem('toutiao_search_hist', value)
    }
  },
  created() {},
  methods: {
    onSearch(val) {
      // 更新文本框内容
      this.searchText = val
      // 存储搜索历史记录
      // 要求：不要有重复历史记录、最新的排在最前面
      const index = this.SearchHistory.indexOf(val)
      if (index !== -1) {
        this.SearchHistory.splice(index, 1)
      }
      this.SearchHistory.unshift(val)
      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel() {
      // this.SearchHistory
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search_form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
