import type {App} from 'vue'
import tzBox from './box/index.vue';
import tzButton from './button/index.vue'

const components = [
  tzBox,
  tzButton
]
const install = (Vue:App) => {
	components.forEach(component => {
		Vue.component(component.name, component)
	});
}

export default {
	install
}