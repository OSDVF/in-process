<template>
<div class="personal-info-wrapper">
  <h4><i class="fas fa-headphones" style="color:gray"/>&ensp;Tady nás najdete</h4>
  <ul class="social-links">
    <li
      class="social-item"
      v-for="(item, index) in socialLinks"
      :key="index"
    >
      <a :href="item.link" target="_blank"><i :class="item.icon" :style="{ color: item.color }"></i></a>
    </li>
  </ul>
</div>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'
import { RecoIcon } from '@vuepress-reco/core/lib/components'
import { getOneColor } from '@theme/helpers/other'

export default defineComponent({
  components: { RecoIcon },
  setup (props, ctx) {
    const { root: _this } = ctx

    const homeBlogCfg = computed(() => _this.$recoLocales.homeBlog)
    const socialLinks = computed(() => (_this.$themeConfig.blogConfig && _this.$themeConfig.blogConfig.socialLinks || []).map(item => {
      if (!item.color) item.color = getOneColor()
      return item
    }))

    return { homeBlogCfg, socialLinks }
  }
})
</script>

<style lang="stylus" scoped>
.personal-info-wrapper {
  margin 0
  h4 {
    margin 0
  }
  .personal-img {
    display block
    margin 2rem auto 1rem
    width 6rem
    height 6rem
    border-radius 50%
  }
  .name {
    font-size 1rem
    text-align center
    color var(--text-color)
  }
  .num {
    display flex
    margin 0 auto 1rem
    width 80%
    > div {
      text-align center
      flex 0 0 50%
      &:first-child {
        border-right 1px solid #333
      }
      h3 {
        line-height auto
        margin 0 0 .6rem
        color var(--text-color)
      }
      h6 {
        line-height auto
        color var(--text-color)
        margin 0
      }
    }
  }
  .social-links {
    box-sizing border-box
    display flex
    flex-wrap wrap
    padding 5px
    .social-item {
      width 39px
      height 36px
      line-height 36px
      text-align center
      list-style none
      transition transform .3s
      &:hover {
        transform scale(1.08)
      }
      i {
        cursor pointer
        font-size 22px
      }
    }
  }
}
</style>
