const DEFAULT_ALLOWED_TAGS = new Set([
  'B', 'I', 'EM', 'STRONG', 'CODE', 'PRE', 'BR', 'P', 'UL', 'OL', 'LI',
  'H1', 'H2', 'H3', 'H4', 'TABLE', 'THEAD', 'TBODY', 'TR', 'TH', 'TD',
  'SPAN', 'DIV', 'A', 'SMALL'
]);

const DEFAULT_ALLOWED_ATTRS = new Set(['class', 'href', 'target', 'rel']);

function sanitizeNode(node, allowedTags, allowedAttrs) {
  if (node.nodeType === Node.TEXT_NODE) {
    return document.createTextNode(node.textContent || '');
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return document.createDocumentFragment();
  }

  const tag = node.tagName.toUpperCase();
  if (!allowedTags.has(tag)) {
    const fragment = document.createDocumentFragment();
    node.childNodes.forEach((child) => {
      fragment.appendChild(sanitizeNode(child, allowedTags, allowedAttrs));
    });
    return fragment;
  }

  const clean = document.createElement(tag.toLowerCase());
  for (const attr of node.attributes) {
    const name = attr.name.toLowerCase();
    if (!allowedAttrs.has(name)) continue;

    if (name === 'href') {
      const value = attr.value.trim();
      if (/^javascript:/i.test(value)) continue;
      clean.setAttribute(name, value);
      continue;
    }

    clean.setAttribute(name, attr.value);
  }

  if (clean.tagName === 'A') {
    if (!clean.getAttribute('target')) clean.setAttribute('target', '_blank');
    if (!clean.getAttribute('rel')) clean.setAttribute('rel', 'noopener noreferrer');
  }

  node.childNodes.forEach((child) => {
    clean.appendChild(sanitizeNode(child, allowedTags, allowedAttrs));
  });

  return clean;
}

export function sanitizeHTML(input, options = {}) {
  const allowedTags = options.allowedTags || DEFAULT_ALLOWED_TAGS;
  const allowedAttrs = options.allowedAttrs || DEFAULT_ALLOWED_ATTRS;

  const template = document.createElement('template');
  template.innerHTML = input;

  const root = document.createElement('div');
  template.content.childNodes.forEach((node) => {
    root.appendChild(sanitizeNode(node, allowedTags, allowedAttrs));
  });

  return root.innerHTML;
}
