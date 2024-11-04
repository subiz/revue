import Com from './example.js'

let root = new Vue({
	name: 'subiz',
	render(h) {
		return (
			<div>
				<Com />
			</div>
		)
	},
})
root.$mount('#app')
