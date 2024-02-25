/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')
module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		'@vue/eslint-config-typescript',
		'@vue/eslint-config-prettier',
		'eslint:recommended',
		'plugin:vue/vue3-essential',
		'plugin:@typescript-eslint/recommended',
		'prettier'
	],
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: {
			ts: '@typescript-eslint/parser',
			'<template>': 'espree'
		},
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['vue', '@typescript-eslint'],
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'no-undef': 'off'
	}
}
