const config = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: 'build/main.js',
            label: 'JS distribution'
          },
          { path: 'build/main.js.map', label: 'JS Map distribution' }
        ],
        message: [
          'chore(release): ${nextRelease.version} [skip-ci]\n\n${nextRelease.notes}'
        ]
      }
    ]
  ]
}

module.exports = config
