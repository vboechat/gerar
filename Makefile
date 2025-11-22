.PHONY: build install check-node-version check-pnpm-version check-installation unit-tests watch-unit-tests

check-node-version:
	@node -v | grep -q 'v22' || (echo "Node.js LTS version is required." && exit 1)

check-pnpm-version: check-node-version
	@pnpm -v | grep -q '10.' || (echo "pnpm version 10.x is required." && exit 1)

check-installation: check-node-version check-pnpm-version
	@if [ ! -d "node_modules" ]; then echo "Dependencies are not installed. Run make install." && exit 1; fi

install: check-node-version check-pnpm-version
	@pnpm install;

build: check-node-version check-pnpm-version check-installation
	@pnpm build;

unit-tests: check-node-version check-pnpm-version check-installation
	@pnpm test;

watch-unit-tests: check-node-version check-pnpm-version check-installation
	@pnpm test:watch;
