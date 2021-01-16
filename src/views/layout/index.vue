<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- 标签导航栏 -->
    <!-- router 开启路由模式            -->
    <van-tabbar class="layout-tabbar" router>
      <van-tabbar-item to="/">
        <template #icon>
          <i class="toutiao toutiao-shouye">
            <span class="text">首页</span>
          </i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template #icon>
          <i class="toutiao toutiao-wenda">
            <span class="text">问答</span>
          </i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon>
          <i class="toutiao toutiao-shipin">
            <span class="text">视频</span>
          </i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <template #icon>
          <i class="toutiao toutiao-wode">
            <span class="text">{{ $store.state.user ? '我的' : '未登录' }}</span>
          </i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.layout-container {
  .layout-tabbar {
    i.toutiao {
      font-size: 40px;
    }
    span.text {
      margin-top: 10px;
      display: flex;
      align-items: center;
      font-size: 20px;
    }
  }
}
</style>
