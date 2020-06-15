let constgenEslint = require('@constgen/eslint')

module.exports = {
   use: [
      constgenEslint({
         eslint: {
				env: { browser: true },
				rules: {
					'import/extensions': 'off'
				}
         }
      })
   ]
}