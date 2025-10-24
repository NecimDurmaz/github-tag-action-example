module.exports = (commit) => {
    // JIRA ID'lerini bul ve formatla
    const jiraRegex = /\[([A-Z]+-[0-9]+)\]/g;
    const jiraIds = [];
    let match;

    while ((match = jiraRegex.exec(commit.message)) !== null) {
        const jiraId = match[1];
        if (!jiraIds.includes(jiraId)) {
            jiraIds.push(jiraId);
        }
    }

    // Commit mesajından JIRA referansını temizle
    let subject = commit.header
        .replace(/^\w+(\(.+\))?!?:\s+/, '')
        .replace(/\s*JIRA\s*\[[\w-]+\]\s*/g, '')
        .trim();

    // JIRA ID'leri varsa subject'e ekle
    if (jiraIds.length > 0) {
        const jiraLinks = jiraIds
            .map(id => `[${id}](https://elektrawebpms.atlassian.net/browse/${id})`)
            .join(', ');
        subject += ` (${jiraLinks})`;
    }

    // Hash ve author bilgilerini ekle
    const hash = commit.hash ? commit.hash.substring(0, 7) : '';
    const author = commit.author ? `${commit.author.name}` : '';

    return {
        ...commit,
        subject: subject,
        hash: hash,
        author: author
    };
};
