export function extractTagContent(code, tagName) {
  const re = new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'gi');
  const parts = [];
  let match = re.exec(code);
  while (match) {
    parts.push(match[1]);
    match = re.exec(code);
  }
  return parts.join('\n');
}

export function extractScript(code) {
  return extractTagContent(code, 'script');
}

export function extractStyle(code) {
  const style = extractTagContent(code, 'style');
  return style || code;
}

export function stripCssComments(code) {
  return code.replace(/\/\*[\s\S]*?\*\//g, '');
}

export function stripJsComments(code) {
  let result = '';
  let quote = null;
  let inLineComment = false;
  let inBlockComment = false;

  for (let i = 0; i < code.length; i += 1) {
    const char = code[i];
    const next = code[i + 1];

    if (inLineComment) {
      if (char === '\n') {
        inLineComment = false;
        result += char;
      }
      continue;
    }

    if (inBlockComment) {
      if (char === '*' && next === '/') {
        inBlockComment = false;
        i += 1;
      }
      continue;
    }

    if (quote) {
      result += char;
      if (char === '\\') {
        i += 1;
        result += code[i] || '';
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      result += char;
      continue;
    }

    if (char === '/' && next === '/') {
      inLineComment = true;
      i += 1;
      continue;
    }

    if (char === '/' && next === '*') {
      inBlockComment = true;
      i += 1;
      continue;
    }

    result += char;
  }

  return result;
}

export function getCleanScript(code) {
  return stripJsComments(extractScript(code));
}

export function findCssRule(code, selectorPattern) {
  const css = stripCssComments(extractStyle(code));
  const match = css.match(new RegExp(`${selectorPattern}\\s*\\{([^}]*)\\}`, 'is'));
  return match ? match[1] : null;
}

export function getCssDeclaration(block, property) {
  const escapedProperty = property.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = block.match(new RegExp(`(?:^|;)\\s*${escapedProperty}\\s*:\\s*([^;]+)`, 'i'));
  return match ? match[1].trim() : null;
}

export function hasCssDeclaration(block, property, valuePattern = /.+/) {
  const value = getCssDeclaration(block, property);
  return value !== null && valuePattern.test(value);
}
