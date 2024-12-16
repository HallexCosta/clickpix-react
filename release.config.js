const config = {
  branches: [
    'main',
    '+([0-9])?(.{+([0-9]),x}).x',
    {
      name: '+release-([0-9]+).([0-9]+).([0-9]+)',
      prerelease: false
    },
    {
      name: 'beta',
      prerelease: true
    }
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'docs/CHANGELOG.md'
      }
    ],
    [
      '@semantic-release/git',
      {
        assets: ['dist/openpix-sdk.js', 'docs/CHANGELOG.md'],
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
      }
    ],
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: 'dist/openpix-sdk.js',
            label: 'openpix-sdk.js'
          },
          { path: 'dist/openpix-sdk.js.map', label: 'openpix-sdk.js.map' }
        ]
      }
    ]
  ]
}

module.exports = config
