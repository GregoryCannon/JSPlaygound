const nameSelect = document.getElementById('name-select');
const linksContainer = document.getElementById('links-container');

// Returns lowercased student names mapped to a list of links.
// Keys are ordered alphabetically.
async function loadStudentLinks(url) {
  const response = await fetch(url);
  if (!response.ok) {
    console.error(`Failed to fetch ${url}`);
    return null;
  }

  // Assumes a file whose lines are name,replit_url.
  const text = await response.text();
  const lines = text.split('\n');
  const data = new Map();
  for (const line of lines) {
    const [name, url, room] = line.split(',');
    // Hard code repl.it for now until we have more links.
    data.set(name.toLowerCase(), {
      links: [{label: 'repl.it', url}],
      room: room.trim(),
    });
  }

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
      // Handle names with multiple spaces.
      const nameParts = name.split(' ').filter(n => n != '');

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

function toTitleCase(s) {
  const words = s.split(' ');
  return words.map(
    w => w[0].toUpperCase() + w.substring(1).toLowerCase()
  ).join(' ');
}

// Returns a clickable DOM element that navigates to the link.
function getLinkElement(link) {
  const a = document.createElement('a');
  a.href = link['url'];
  a.target = '_blank';
  a.textContent = toTitleCase(link['label']);
  return a;
}

// Populates the dropdown and links.
function populatePage(data) {
  const names = Array.from(data.keys());
  const shortNames = shorten(names);
  for (const name of names) {
    const option = document.createElement('option');
    const displayName = toTitleCase(shortNames.get(name));
    const {room} = data.get(name);
    option.text = `${displayName} (${room})`;
    option.value = name;
    nameSelect.appendChild(option);
  }
  nameSelect.onchange = (e) => {
    const name = e.target.value;
    const {links} = data.get(name);
    if (!links) {
      return;
    }
    // Remove any previously added links.
    linksContainer.textContent = '';
    for (const link of links) {
      linksContainer.appendChild(getLinkElement(link));
    }
  };
}

/* -------------------
---  Script start  ---
-------------------- */

document.addEventListener('DOMContentLoaded', async (_) => {
  const data = await loadStudentLinks('replit.csv');
  populatePage(data);
});
