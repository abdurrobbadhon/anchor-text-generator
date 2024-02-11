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
    const count = Math.min(keywords.length, urls.length); // Calculate count once
    for (let i = 0; i < count; i++) {
      output += createAnchor(keywords[i], urls[i], openInNewWindow, addTitle, noFollow, customRel);
    }
  } else {
    for (const keyword of keywords) {
      for (const url of urls) {
        output += createAnchor(keyword, url, openInNewWindow, addTitle, noFollow, customRel);
      }
      output += "\n";
    }
  }

  // Update DOM together at the end
  document.getElementById('output').value = output;
  displayRichText(output);

  // Fade in using CSS transitions
  document.getElementById('output').style.opacity = 1;
  document.getElementById('richTextBox').style.opacity = 1;
}

function createAnchor(keyword, url, newWindow, title, noFollow, customRel) {
  const attributes = []; // Build attributes dynamically

  if (newWindow) { attributes.push('target="_blank"'); }
  if (title) { attributes.push(`title="${keyword}"`); }
  if (noFollow) { attributes.push('rel="nofollow"'); }
  if (customRel) { attributes.push(`rel="${customRel}"`); }

  const attributesString = attributes.length ? ' ' + attributes.join(' ') : '';
  return `<a href="${url}"${attributesString}>${keyword}</a>\n`; 
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
