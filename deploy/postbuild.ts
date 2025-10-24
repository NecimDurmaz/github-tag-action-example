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
        for (const [str1, str2] of replaceArray) {
            contents = contents.replace(str1, str2);
        }
        fs.writeFileSync(filePath, contents, {encoding: 'utf-8'});
    } catch (e: any) {
        console.warn('post-build', filePath, 'replace failed.', e.message);
    }
}

buildStampHtml('dist/AngusFrontEnd/index.html');
