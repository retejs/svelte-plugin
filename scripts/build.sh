svelte-package -i src -o dist/svelte
svelte-package -i src -o dist/5/svelte

# replace process.env.COMPAT
find dist/svelte -type f -name "*.js" -exec sed -i 's/process\.env\.COMPAT/\.\/compat\/svelte3-4/g' {} +
find dist/5/svelte -type f -name "*.js" -exec sed -i 's/process\.env\.COMPAT/\.\/compat\/svelte5\.svelte/g' {} +