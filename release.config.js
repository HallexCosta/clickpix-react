const config = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/git',
      {
        assets: [
          {
            path: 'build/main.js',
            label: 'openpix-sdk.js'
          },
          { path: 'build/main.js.map', label: 'openpix-sdk.js.map' }
        ],
        message: [
          'chore(release): ${nextRelease.version} [skip-ci]\n\n${nextRelease.notes}'
        ]
      }
    ]
  ]
}

module.exports = config
