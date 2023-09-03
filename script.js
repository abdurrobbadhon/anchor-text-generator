
function generateLinks() {
    const keywords = document.getElementById('keywords').value.split('\n');
    const urls = document.getElementById('urls').value.split('\n');
    const openInNewWindow = document.getElementById('newWindow').checked;
    const addTitle = document.getElementById('titleAttribute').checked;
    const oneLinkOption = document.getElementById('oneLink').checked;
    const noFollow = document.getElementById('noFollow').checked;
    const customRel = document.getElementById('customRel').value.trim();

    let output = "";

    if (oneLinkOption) {
        for (let i = 0; i < Math.min(keywords.length, urls.length); i++) {
            output += createAnchor(keywords[i], urls[i], openInNewWindow, addTitle, noFollow, customRel);
        }
    } else {
        for (let keyword of keywords) {
            for (let url of urls) {
                output += createAnchor(keyword, url, openInNewWindow, addTitle, noFollow, customRel);
            }
            output += "\n";
        }
    }

    document.getElementById('output').style.opacity = 0;
    document.getElementById('richTextBox').style.opacity = 0;

    setTimeout(() => {
        document.getElementById('output').value = output;
        displayRichText(output);
        document.getElementById('output').style.opacity = 1;
        document.getElementById('richTextBox').style.opacity = 1;
    }, 100);
}

function createAnchor(keyword, url, newWindow, title, noFollow, customRel) {
    const target = newWindow ? ' target="_blank"' : '';
    const titleAttr = title ? ` title="${keyword}"` : '';
    let relAttr = noFollow ? 'nofollow' : '';
    if (customRel) {
        relAttr = relAttr ? `${relAttr} ${customRel}` : customRel;
    }
    relAttr = relAttr ? ` rel="${relAttr}"` : '';
    return `<a href="${url}"${target}${titleAttr}${relAttr}>${keyword}</a>\n`;
}

function copyToClipboard() {
    const output = document.getElementById('output');
    output.select();
    document.execCommand('copy');
    alert('Code copied to clipboard!');
}

function displayRichText(content) {
    const box = document.getElementById('richTextBox');
    box.innerHTML = content;
}

function copyRichText() {
    const range = document.createRange();
    range.selectNode(document.getElementById('richTextBox'));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    alert('Rich text copied to clipboard!');
}
