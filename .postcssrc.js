module.exports = {
  plugins: {
    //生成浏览器css样式规则前缀，vue-cli内部配置了，起冲突，所有注释掉
    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },

    //把css转化成rem
    'postcss-pxtorem': {
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      //配置要转换的css属性， * 表示所有
      propList: ['*']
    }
  }
}
