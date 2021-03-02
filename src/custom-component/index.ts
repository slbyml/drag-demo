import type {App} from 'vue'
import tzText from './text/index.vue';
import tzBox from './box/index.vue';
import tzButton from './button/index.vue'

const components = [
  tzBox,
  tzButton,
	tzText
]
const install = (Vue:App) => {
	components.forEach(component => {
		Vue.component(component.name, component)
	});
}

export default {
	install
}