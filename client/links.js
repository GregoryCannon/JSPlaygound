const nameSelect = document.getElementById('name-select');
const linksContainer = document.getElementById('links-container');

// Returns student names mapped to a list of links.
// Keys are ordered alphabetically.
async function loadStudentLinks() {
  const data = new Map();
  // TODO(gavinmak): Load this from a static file.
  data.set('alice blue', [
    {'label': 'homework', 'url': 'https://google.com'},
    {'label': 'jamboard', 'url': 'https://google.com'},
    {'label': 'breakout room', 'url': 'https://google.com'},
  ]);
  data.set('bob red', [
    {'label': 'homework', 'url': 'https://google.com'},
    {'label': 'breakout room', 'url': 'https://google.com'},
  ]);
  data.set('brent reddy', [
    {'label': 'jamboard', 'url': 'https://google.com'},
    {'label': 'breakout room', 'url': 'https://google.com'},
  ]);
  data.set('charles black', [
    {'label': 'jamboard', 'url': 'https://google.com'},
    {'label': 'breakout room', 'url': 'https://google.com'},
  ]);
  data.set('charles brown', [
    {'label': 'jamboard', 'url': 'https://google.com'},
    {'label': 'breakout room', 'url': 'https://google.com'},
  ]);
  return new Map([...data].sort());
}

/**
 * Returns full names mapped to shortened names.
 *
 * If short names are duplicates, this add more letters until they are
 * unique. Assumes full names are unique.
 */
function shorten(names) {
  const ret = new Map();
  const namesLeft = names.slice();
  let truncLen = 1;
  while (namesLeft.length > 0) {
    // Maps truncName -> [fullName, ...]
    const nameMap = new Map();
    for (const name of namesLeft) {
      const nameParts = name.split(' ');

      // For simplicity show the full first name.
      const truncParts = [nameParts[0]];
      for (const part of nameParts.slice(1)) {
        let truncPart = part.substring(0, truncLen);
        if (truncPart.length < part.length) {
          // Indicate that the name was truncated.
          truncPart += '.';
        }
        truncParts.push(truncPart);
      }
      const truncName = truncParts.join(' ');

      const fullNames = nameMap.get(truncName) || [];
      fullNames.push(name);
      nameMap.set(truncName, fullNames);
    }
    
    for (const [truncName, fullNames] of nameMap.entries()) {
      if (fullNames.length === 1) {
        const fullName = fullNames[0];
        ret.set(fullName, truncName);
        namesLeft.splice(namesLeft.indexOf(fullName), 1);
      }
    }

    truncLen++;
  }

  return ret;
}

function titleCase(s) {
  const words = s.split(' ');
  return words.map(
    w => w[0].toUpperCase() + w.substring(1).toLowerCase()
  ).join(' ');
}

// Returns a clickable DOM element that navigates to the link.
function linkElement(link) {
  const a = document.createElement('a');
  a.href = link['url'];
  a.target = '_blank';
  a.textContent = titleCase(link['label']);
  return a;
}

// Populates the dropdown and links.
function populatePage(data) {
  const names = Array.from(data.keys());
  const shortNames = shorten(names);
  for (const name of names) {
    const option = document.createElement('option');
    option.text = titleCase(shortNames.get(name));
    option.value = name;
    nameSelect.appendChild(option);
  }
  nameSelect.onchange = (e) => {
    const name = e.target.value;
    const links = data.get(name);
    if (!links) {
      return;
    }
    // Remove any previously added links.
    linksContainer.textContent = '';
    for (const link of links) {
      linksContainer.appendChild(linkElement(link));
    }
  };
}

/* -------------------
---  Script start  ---
-------------------- */

document.addEventListener('DOMContentLoaded', async (_) => {
  const data = await loadStudentLinks();
  populatePage(data);
});
