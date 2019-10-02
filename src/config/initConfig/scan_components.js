/*
 * @Date: 2019-09-12 15:42:13
 * @information: 最后更新时间
 */
// 引入markdown样式,等同于放到main.js  不需要的自行注释
import 'highlight.js/styles/github.css';
import 'github-markdown-css';
// 引入混入配置 
import initMixins from './init_mixins';
/**
 * @Author: 周靖松
 * @information: 组件扫描类
 * @Date: 2019-09-12 18:53:37
 */
export default class ScanComponents {
	constructor() {
		// 扫描组件文件夹，约定放组件的文件夹名称是components
		this.components = require.context('@/components', true, /\.vue$/);
		// 扫描layout模板，约定放模板的文件夹名称是layout
		this.layout = require.context('@/layout', true, /\.vue$/);
		// 扫描markdown文件，约定放markdown的文件夹名称是md_template
		this.markdown = require.context('@/md_template', true, /\.md$/);
	}
	/**
     * @Author: 周靖松
     * @information: 注册组件
     * @Date: 2019-09-12 18:35:44
     */
	init() {
		// 判断环境
		let vue = window && window.Vue;
		if (!vue) return new Error('当前环境不存在vue');
		let { components, layout, markdown } = this;
		// 初始化数组
		let initArr = [ components, layout, markdown ];
		// 注册组件和注册layout
		initArr.forEach((el) => {
			el.keys().map(el).forEach((subEl) => {
				let { name, __file } = subEl.default;
				let componentName = name || __file.split('/').pop().split('.')[0];
				vue.component(componentName, subEl.default);
			});
		});
	}
	/**
	 * @Author: 周靖松
	 * @information: 注册混入
	 * @Date: 2019-10-02 10:55:29
	 */	
	getMixin(){
		return new initMixins().init()
	}
}
