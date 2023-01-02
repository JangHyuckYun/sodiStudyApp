module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
			tsx: true
		},
		ecmaVersion: '13',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'airbnb',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	env: {
		browser: true,
		es2021: true,
	},
	rules: {
		"react/prefer-stateless-function": 0,
		"react/jsx-filename-extension": 0,
		"react/jsx-one-expression-per-line": 0,
		"react/prop-types": 0,
		"jsx-a11y/label-has-associated-control": [
			"error",
			{
				"required": {
					"some": [
						"nesting",
						"id"
					]
				}
			}
		],
		"jsx-a11y/label-has-for": [
			"error",
			{
				"required": {
					"some": [
						"nesting",
						"id"
					]
				}
			}
		]
	},
	"overrides": [
		{
			// enable the rule specifically for TypeScript files
			"files": ["*.ts", "*.mts", "*.cts", "*.tsx"],
			"rules": {
				"react/react-in-jsx-scope": "off",
				// '@typescript-eslint/explicit-module-boundary-types': 'error',
				// '@typescript-eslint/no-explicit-any': 'error',
			}
		}
	],
}
