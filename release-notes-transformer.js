const angular = require('conventional-changelog-angular');

module.exports = async (commit) => {
    const {writerOpts} = await angular;
    const base = writerOpts && writerOpts.transform
        ? writerOpts.transform(commit)
        : commit;

    if (!base) return false;

    console.log('Transforming commit:', base);

    // 🔹 JIRA ID'lerini yakalamak için geliştirilmiş regex
    const jiraRegex = /(?:JIRA\s*[:\[]\s*([A-Z]+-\d+)\]?)/gi;

    const jiraIds = [];
    const textToSearch = `${base.header}\n${base.body || ''}\n${base.footer || ''}`;

    let match;
    while ((match = jiraRegex.exec(textToSearch)) !== null) {
        const jiraId = match[1];
        if (jiraId && !jiraIds.includes(jiraId)) jiraIds.push(jiraId);
    }

    // 🔹 Commit başlığını temizle
    let subject = base.header
        .replace(/^\w+(\(.+\))?!?:\s+/, '')
        .replace(/\s*JIRA\s*[:\[]\s*[\w-]+\]?\s*/gi, '')
        .trim();

    // 🔹 JIRA ID’leri varsa link ekle
    if (jiraIds.length > 0) {
        console.log('Found JIRA IDs:', jiraIds);
        const jiraLinks = jiraIds
            .map(id => `[${id}](https://elektrawebpms.atlassian.net/browse/${id})`)
            .join(', ');
        subject += `JIRA (${jiraLinks})`;
    }

    // 🔹 Hash ve author bilgisi
    const fullHash = base.hash || commit.hash || '';
    const shortHash = fullHash.substring(0, 7);
    const author = base.author || (commit.author && commit.author.name) || '';

    return {
        ...base,
        subject,
        hash: fullHash,
        shortHash,
        author
    };
};
