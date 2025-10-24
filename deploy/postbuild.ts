console.log('post-build script started...');
const yargs = require('yargs');
const fs = require('fs');

const args = yargs.option('deploy', {default: true}).argv;
const gitCommit = (process.env as any).GIT_COMMIT;
const buildTag = (process.env as any).BUILD_TAG;
console.log('Environment variables:', {
    GIT_COMMIT: gitCommit,
    BUILD_TAG: buildTag,
})
if (args && typeof args === 'object') {
    console.log('args:', {
        deploy: args.deploy,
        commit: args.commit,
        tag: args.tag,

    });
    console.log('Command line arguments:', args);

}

function buildStampHtml(filePath: string) {
    // tag:    '${BUILD_TAG}'
    // at:     new Date('$(date --iso-8601=seconds)')
    // commit: '${GIT_COMMIT}'
    let tag;
    let commit;
    const timestamp = new Date().getTime();
    if (args.hasOwnProperty('commit') && args.hasOwnProperty('tag')) {
        commit = args.commit;
        tag = args.tag;
        console.log('Using --commit and --tag parameters:', commit, tag);
    } else {
        console.warn(
            'No --commit and --tag parameters. Looking for environment variables GIT_COMMIT and BUILD_TAG'
        );
        if (gitCommit && buildTag) {
            commit = gitCommit;
            tag = buildTag;
        } else {
            console.warn(
                'No GIT_COMMIT and BUILD_TAG environment variables. Defaulting to manual build'
            );
            tag = 'manual-build-' + timestamp;
            commit = 'manual-build-' + timestamp;
        }
    }
    fileReplace(filePath, [
        // Yorum satırını güncelle
        [
            /\/\*\s*--\s* BUILD STAMP\s*--\s*\*\//,
            `/*
    ANGUS BUILD STAMP
    tag: ${tag}
    commit: ${commit}
    timestamp: ${new Date(timestamp).toISOString()}
      */
      window.angusVersion = {
        tag: '${tag}',
        commit: '${commit}',
        timestamp: '${new Date(timestamp).toISOString()}'
      };
  `,
        ],
    ]);
}

function fileReplace(filePath: string, replaceArray: Array<[string | RegExp, string]>) {
    try {
        let contents = fs.readFileSync(filePath, 'utf-8');
        for (const [pattern, replacement] of replaceArray) {
            if (pattern instanceof RegExp) {
                if (pattern.test(contents)) {
                    console.log(`[post-build] Found match for pattern: ${pattern}`);
                }
                contents = contents.replace(pattern, replacement);
            } else {
                if (contents.includes(pattern)) {
                    console.log(`[post-build] Found match for string: ${pattern}`);
                }
                contents = contents.replace(pattern, replacement);
            }
        }
        fs.writeFileSync(filePath, contents, {encoding: 'utf-8'});
    } catch (e: any) {
        console.warn('post-build', filePath, 'replace failed.', e.message);
    }
}

const path = require('path');

function pickIndexHtml(): string | null {
    const candidates = [
        'dist/demo/browser/index.html',
        'dist/demo/index.html',
        'dist/browser/index.html',
        'dist/index.html',
    ];

    for (const p of candidates) {
        if (fs.existsSync(p)) {
            console.log(`[post-build] Using target file: ${p}`);
            return p;
        }
    }

    console.warn('[post-build] ❌ index.html not found in expected locations.');

    // dist klasörünü listele
    const distPath = path.resolve('dist');
    if (fs.existsSync(distPath)) {
        console.log('\n[post-build] Available files under dist/:');
        const listFiles = (dir: string, prefix = '') => {
            const items = fs.readdirSync(dir);
            for (const item of items) {
                const fullPath = path.join(dir, item);
                const stat = fs.statSync(fullPath);
                if (stat.isDirectory()) {
                    console.log(prefix + '📁 ' + item);
                    listFiles(fullPath, prefix + '  ');
                } else {
                    console.log(prefix + '📄 ' + item);
                }
            }
        };
        listFiles(distPath);
    } else {
        console.warn('[post-build] dist directory not found.');
    }

    return null;
}

const target = pickIndexHtml();
console.log('post-build script finished.', target);
if (target) {
    buildStampHtml(target);
}
