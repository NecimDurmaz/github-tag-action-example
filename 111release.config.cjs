// module.exports = {
//     "branches": [
//         "main",
//         "master"
//     ],
//     "plugins": [
//         "@semantic-release/commit-analyzer",
//         [
//             "@semantic-release/release-notes-generator",
//             {
//                 "presetConfig": {
//                     "types": [
//                         {
//                             "type": "feat",
//                             "section": "✨ Features"
//                         },
//                         {
//                             "type": "fix",
//                             "section": "🐛 Bug Fixes"
//                         },
//                         {
//                             "type": "docs",
//                             "section": "📚 Documentation",
//                             "hidden": false
//                         },
//                         {
//                             "type": "style",
//                             "section": "🎨 Styles",
//                             "hidden": false
//                         },
//                         {
//                             "type": "refactor",
//                             "section": "♻️ Refactoring",
//                             "hidden": false
//                         },
//                         {
//                             "type": "perf",
//                             "section": "⚡ Performance",
//                             "hidden": false
//                         },
//                         {
//                             "type": "test",
//                             "section": "✅ Tests",
//                             "hidden": true
//                         },
//                         {
//                             "type": "chore",
//                             "section": "🔧 Chores",
//                             "hidden": true
//                         }
//                     ]
//                 },
//                 "writerOpts": {
//                     "transform": [
//                         {
//                             "pattern": "/^(feat|fix|docs|style|refactor|perf|test|chore)(\\(.+\\))?!?: (.+)$/",
//                             "script": "release-notes-transformer.js"
//                         }
//                     ]
//                 }
//             }
//         ],
//         [
//             "@semantic-release/changelog",
//             {
//                 "changelogFile": "CHANGELOG.md"
//             }
//         ],
//         "@semantic-release/git",
//         "@semantic-release/github"
//     ]
// }
