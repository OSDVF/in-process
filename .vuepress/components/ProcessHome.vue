<template>
  <ClientOnly>
    <div class="home-blog">
      <img class="hero" src="images/background-small.jpg"/>

      <ModuleTransition delay="0.16">
        <div v-show="recoShowModule" class="home-blog-wrapper">
          <div class="blog-list">
            <Content v-show="recoShowModule" class="home-center" custom />
            <ModuleTransition delay="0.24">
              <!-- Seznam příspěvků -->
              <post-list :data="$recoPosts" :currentPage="currentPage"></post-list>
              <!-- Stránkování -->
              <pagation class="pagation" :total="$recoPosts.length" :currentPage="currentPage" @getCurrentPage="getCurrentPage" />
            </ModuleTransition>
          </div>
          <div class="info-wrapper">
            <PersonalInfo />
            <hr>
            <h4 v-if="$themeConfig.friendLink && $themeConfig.friendLink.length !== 0">
              <i class="fas fa-paperclip" style="color: gray" />&ensp;{{homeBlogCfg.friendLink}}
            </h4>
            <FriendLink />
          </div>
        </div>
      </ModuleTransition>
    </div>
  </ClientOnly>
</template>

<script>
import TagList from "@theme/components/TagList";
import FriendLink from "@theme/components/FriendLink";
import PostList from "@theme/components/PostList";
import pagination from "@theme/mixins/pagination";
import { ModuleTransition, RecoIcon } from "@vuepress-reco/core/lib/components";
import PersonalInfo from "@theme/components/PersonalInfo";
import { getOneColor } from "@theme/helpers/other";

export default {
  mixins: [pagination],
  components: {
    PostList,
    TagList,
    FriendLink,
    ModuleTransition,
    PersonalInfo,
    RecoIcon,
  },
  data() {
    return {
      recoShow: false,
      currentPage: 1,
      tags: [],
    };
  },
  computed: {
    recoShowModule() {
      return this.$parent.recoShowModule;
    },
    homeBlogCfg() {
      return this.$recoLocales.homeBlog;
    },
    actionLink() {
      const { actionLink: link, actionText: text } = this.$frontmatter;

      return {
        link,
        text,
      };
    },
    heroImageStyle() {
      return this.$frontmatter.heroImageStyle || {};
    },
    heroHeight() {
      return document.querySelector(".hero").clientHeight;
    },
  },
  mounted() {
    this.recoShow = true;
    this._setPage(this._getStoragePage());
  },
  methods: {
    getCurrentPage(page) {
      this._setPage(page);
      setTimeout(() => {
        window.scrollTo(0, this.heroHeight);
      }, 100);
    },
    getPages() {
      let pages = this.$site.pages;
      pages = pages.filter((item) => {
        const { home, date } = item.frontmatter;
        return !(home == true || date === undefined);
      });
      // reverse()是为了按时间最近排序排序
      this.pages = pages.length == 0 ? [] : pages;
    },
    getPagesByTags(tagInfo) {
      this.$router.push({ path: tagInfo.path });
    },
    _setPage(page) {
      this.currentPage = page;
      this.$page.currentPage = page;
      this._setStoragePage(page);
    },
    getOneColor,
  },
};
</script>

<style lang="stylus">
.home-blog {
  padding: 0;
  margin: 0px auto;

  .comments-wrapper {
    max-width: $contentWidth;
    margin: 0 auto;
    padding: 1rem 2.5rem;

    @media (max-width: $MQNarrow) {
      padding: 2rem;
    }

    @media (max-width: $MQMobileNarrow) {
      padding: 1.5rem;
    }
  }

  .hero {
    object-fit cover
    height unset
    margin:0;
    padding "calc(%s - 1rem) 0 0 0" % $navbarHeight
    width 100%
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    box-sizing: border-box;
    filter brightness(0.9)
    mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%);

    h1 {
      display: block;
      margin: 0 auto 1.8rem;
      font-size: 1.8rem;
    }

    .description {
      margin: 1.8rem auto;
      font-size: 1rem;
      line-height: 1.3;
    }
  }

  .home-blog-wrapper {
    display: flex;
    align-items: flex-start;
    margin: 50vh auto 20px;
    padding: 0 20px;
    max-width: $homePageWidth;

    .blog-list {
      flex: auto;
      width: 0;

      .abstract-wrapper {
        .abstract-item:last-child {
          margin-bottom: 0px;
        }
      }
    }

    .home-center {
      font-size 1rem
      color white
      & > p {
        font-weight bold
        color #54402E
      }
      & > h1, & > h2 {
        text-shadow: 2px 8px 6px rgba(0, 0, 0, 0.5), 0px 0px 15px black, 0px -5px 35px rgba(255, 255, 255, 0.3);
      }
    }

    .info-wrapper {
      position: -webkit-sticky;
      position: sticky;
      top: 70px;
      overflow: hidden;
      transition: all 0.3s;
      margin-left: 15px;
      flex: 0 0 300px;
      height: auto;
      box-shadow: var(--box-shadow);
      border-radius: $borderRadius;
      box-sizing: border-box;
      padding: 1.3rem 1rem;
      background: var(--background-color);

      &:hover {
        box-shadow: var(--box-shadow-hover);
      }

      h4 {
        color: var(--text-color);
      }

      .category-wrapper {
        list-style: none;
        padding-left: 0;

        .category-item {
          margin-bottom: 0.4rem;
          padding: 0.4rem 0.8rem;
          transition: all 0.5s;
          border-radius: $borderRadius;
          box-shadow: var(--box-shadow);
          background-color: var(--background-color);

          &:hover {
            transform: scale(1.04);

            a {
              color: $accentColor;
            }
          }

          a {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: var(--text-color);

            .post-num {
              width: 1.6rem;
              height: 1.6rem;
              text-align: center;
              line-height: 1.6rem;
              border-radius: $borderRadius;
              background: #eee;
              font-size: 13px;
              color: #fff;
            }
          }
        }
      }
    }
  }
}

@media (max-width: $MQMobile) {
  .home-blog {
    .hero {
        min-height : 600px;
    }

    .home-blog-wrapper {
      display: block !important;

      .blog-list {
        width: auto;
      }

      .info-wrapper {
        // display none!important
        margin-left: 0;
      }
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .home-blog {
    .hero {
      min-height: 600px;
    }

    .home-blog-wrapper {
      display: block !important;

      .blog-list {
        width: auto;
      }

      .info-wrapper {
        // display none!important
        margin-left: 0;
      }
    }
  }
}
.dark .home-blog > .home-blog-wrapper .home-center > p {
  color white
}
</style>
