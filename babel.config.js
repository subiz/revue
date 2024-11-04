module.exports = {
	// presets: [['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3, targets: '> 5%, not dead' }]],
	presets: [['@vue/app', {useBuiltIns: 'usage', corejs: 3}]],
	plugins: ['@babel/plugin-syntax-dynamic-import'],
	comments: false,
}
