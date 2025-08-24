export default {
	// Repository information
	repo: {
		repo: 'ikea-or-sigur-ros',
		provider: 'github',
		domain: 'github.com'
	},

	// Changelog configuration
	output: 'CHANGELOG.md',
	
	// Version bumping configuration based on conventional commits
	bump: {
		pattern: /^(feat|fix|perf|refactor|test|docs|style|chore|build|ci)(\(.+\))?: .{1,50}/,
		releases: {
			major: ['feat!', 'fix!', 'perf!', 'refactor!', 'BREAKING CHANGE'],
			minor: ['feat'],
			patch: ['fix', 'perf', 'refactor', 'test', 'docs', 'style', 'chore', 'build', 'ci']
		}
	},

	// Commit types configuration
	types: {
		feat: { title: '🚀 Features' },
		fix: { title: '🐛 Bug Fixes' },
		perf: { title: '⚡ Performance Improvements' },
		refactor: { title: '💅 Refactors' },
		test: { title: '✅ Tests' },
		docs: { title: '📖 Documentation' },
		style: { title: '🎨 Styles' },
		chore: { title: '🏡 Chore' },
		build: { title: '📦 Build' },
		ci: { title: '🤖 CI' }
	},

	// Git configuration
	git: {
		commitMessage: 'chore(release): v{{newVersion}}'
	},

	// Exclude patterns
	excludeAuthors: ['dependabot[bot]', 'github-actions[bot]']
};