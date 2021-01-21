<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(text, index) in suggestipons"
      :key="index"
      @click="$emit('search', text)"
    >
      <template #title> <div v-html="hightlight(text)"></div> </template
    ></van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestipons: [] //
    }
  },
  computed: {},
  watch: {
    searchText: {
      //   handler(value) {
      //     this.loadSearchSuggestion(value)
      //   },

      // debounce 函数
      // 参数1：函数
      // 参数2：防抖时间
      // 返回值：防抖之后的函数，和参数1功能是一样的
      handler: debounce(function(value) {
        this.loadSearchSuggestion(value)
      }, 200),
      //   handler(value) {
      //   console.log(value);
      //   },
      immediate: true // 监听开始立即调用
    }
  },
  created() {},
  methods: {
    async loadSearchSuggestion(q) {
      try {
        const { data } = await getSearchSuggestion(q)
        this.suggestipons = data.data.options
      } catch (err) {
        console.log('凉了', err)
        this.$toast('获取数据失败')
      }
    },
    // 参数 source: 原始字符串
    // 参数 keyword: 需要高亮的关键词
    // 返回值：替换之后的高亮字符串
    hightlight(text) {
      // /searchContent/ 正则表达式中的一切内容都会当做字符串使用
      // 这里可以 new RegExp 方式根据字符串创建一个正则表达式
      // RegExp 是原生 JavaScript 的内置构造函数
      // 参数1：字符串，注意，这里不要加 //
      // 参数2：匹配模式，g 全局，i 忽略大小写
      const hightlightStr = `<span style="color:#3296fa">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, hightlightStr)
    }
  }
}
</script>

<style scoped></style>
