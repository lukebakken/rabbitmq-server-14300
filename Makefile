.PHONY: setup run clean

setup:
	npm init -y
	npm install --save-dev typescript @types/node tsx
	npm install rhea

run:
	npx tsx repro.ts

clean:
	rm -rf node_modules package-lock.json package.json
