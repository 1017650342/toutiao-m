<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <template #title>
        <span class="title_text">我的频道</span>
        <van-button
          class="edit_btn"
          type="danger"
          plain
          round
          size="mini"
          @click="isEdit = !isEdit"
          >{{ isEdit ? '完成' : '编辑' }}</van-button
        >
      </template>
    </van-cell>
    <van-grid class="my_gird" :gutter="10">
      <van-grid-item
        class="grid_item"
        v-for="(channel, index) in myChannels"
        :key="index"
        @click="onMyChannelClick(channel, index)"
      >
        <template #icon>
          <van-icon v-show="isEdit && !fiexChannels.includes(channel.id)" name="clear"></van-icon>
        </template>
        <template #text>
          <span class="text" :class="{ active: index === active }">{{ channel.name }}</span>
        </template>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <template #title>
        <span class="title_text">频道推荐</span>
      </template>
    </van-cell>
    <van-grid class="bom_grid" :gutter="10">
      <van-grid-item
        class="grid_item"
        icon="plus"
        v-for="(channel, index) in recommendChannel"
        :key="index"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addAllChannels, deleteAllChannels } from '@/api/chaanel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      active: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [], // 所有频道
      isEdit: false, // 控制编辑的显示
      fiexChannels: [0] // 固定频道，不允许删除
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannel() {
      // filter 数组方法，遍历数组，把符合条件的元素存储到新的数组中
      return this.allChannels.filter((channel) => {
        //   some  方法返回布尔值
        // find  方法返回一个元素
        return !this.myChannels.find((myChannels) => {
          return myChannels.id === channel.id
        })
      })
    }

    // recommendChannel() {
    //   const channels = []
    //   this.allChannels.forEach((channel) => {
    //     //   find遍历数组，找到满足条件的元素项
    //     const ret = this.myChannels.find((myChannels) => {
    //       return myChannels.id === channel.id
    //     })
    //     // 如果我的频道种不包含该频道，则收集到推荐频道中
    //     if (!ret) {
    //       channels.push(channel)
    //     }
    //   })
    //   // 把计算属性结果返回
    //   return channels
    // }
  },
  watch: {},
  created() {
    this.loadAllChannels()
  },
  mounted() {},
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels()
        // console.log(data)
        this.allChannels = data.data.channels
      } catch (err) {
        console.log('凉了', err)
      }
    },
    async onAddChannel(channel) {
      this.myChannels.push(channel)

      // 数据持久化
      if (this.user) {
        // 已登录，数据存储到线上
        try {
          await addAllChannels([
            {
              id: channel.id, // 频道 id
              seq: this.myChannels.length // 频道的 序号
            }
          ])
        } catch (err) {
          this.$toast('添加失败')
        }
      } else {
        // 未登录，数据存储到本地
        setItem('Toutiao', this.myChannels)
      }
    },
    onMyChannelClick(channel, index) {
      if (this.isEdit) {
        // 编辑状态，执行删除频道
        if (this.fiexChannels.includes(channel.id)) {
          return
        }
        // 删除频道
        this.myChannels.splice(index, 1)
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        // 处理持久化
        this.dateleChannel(channel)
      } else {
        // 非编辑状态，执行切换频道
        this.$emit('update-active', index, false)
      }
    },
    async dateleChannel(channle) {
      try {
        if (this.user) {
          // 已登录，将数据存储到线上
          await deleteAllChannels(channle.id)
        } else {
          // 未登录，将数据存储到本地    直接覆盖
          setItem('Toutiao', this.myChannels)
        }
      } catch (err) {
        this.$toast('删除失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
  .van-cell__title {
    display: flex;
    justify-content: space-between;
  }
  .title_text {
    font-size: 32px;
    color: #333;
  }
  .edit_btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/.grid_item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        color: #222;
        font-size: 28px;
      }
      .van-grid-item__text {
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/.my_gird {
    .grid_item {
      .van-icon-clear {
        position: absolute;
        top: -10px;
        right: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/.bom_grid {
    .grid_item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
