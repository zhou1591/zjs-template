<!--
 * @Date: 2019-10-01 14:01:48
 * @information: 最后更新时间
 -->

# 使用说明书(开发版)

## 目录结构

-  api  各个路由的请求地址

-  assets 静态资源  比如图片 icon

-  components 组件文件夹，约定好的名称，会在初始化的时候扫描里边的组件，注册到全局

-  config  配置文件

        - initConfig 是初始化执行的一些配置比如注册axios  混入 组件 markdown文件组件 自定义指令

        - optionConfig 是vue初始化的一些选项 比如 路由 vuex  

-  directives 自定义指令的文件夹，约定好的名称，会在初始化的时候扫描里边的自定义指令，注册到全局

-  layout 这是一个模板文件，里边可以放一些常用的组件模板，或者不用,约定好的名称，会在初始化的时候扫描里边的模板

-  md_template markdown文件夹，约定好的名称，这个里边的md文件会被编译成一个组件并且注册到全局

-  mixins  混入文件，mixin_config 里边是配置， 可以配置哪个混入文件给哪个组件混入（待完善）

-  model 静态属性声明文件夹

-  relyClass 业务类对象文件夹

-  style  样式文件夹

-  views  vue 路由试图文件夹

-  vuex  顾名思义。。。。

-  app main  自行体会吧。。。。

-  vue_init.js   vue初始化配置的的扫描文件

-  vue_options.js   vue选项的配置的的扫描文件


#### 想法

当时这么写的想法是把一些需要的常用配置都扫描一下，在初始化的时候use()方法 注册进去

然后layout   当作一个模板   用业务对象控制模板的渲染  （模板待完善）