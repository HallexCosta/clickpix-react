const config = {
  branches: [
    'main',
    {
      name: 'beta',
      prerelease: true
    }
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/git',
      {
        assets: ['dist/openpix-sdk.js'],
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
