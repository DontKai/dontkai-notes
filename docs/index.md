---
layout: home
hero:
    name: DK's Notes
    # text: notes
    tagline:
    image:
        src: /hero.png
        alt: DK
    actions:
        - theme: brand
          text: 开始阅读 →
          link: /page/JavaScript/prototype/
        - theme: alt
          text: 搭建vitepress
          link: /page/VitepressBuild/
features:
    - icon:
          src: /read.svg
      title: 前端
      details: html, css, javascript, typescript, vue...
      link: /page/JavaScript/1_Deep/1_Prototype
    - icon:
          src: /technology.svg
      title: 后端
      details: node, java, mysql, mongodb, nginx....
      link: /page/JavaScript/1_Deep/1_Prototype
---

<script setup>
import KHome from './components/KHome/index.vue'
</script>
<KHome />
