/*
  Parses URL search query, and passes it to handleQuery().
  Runs upon page load, while the LawSearch page is hidden.
  Also puts the query into the search bar.
*/
document.addEventListener("DOMContentLoaded", () => {
  if (!location.search) {
    return document.body.removeAttribute('hidden');
  }

  let query = decodeURIComponent(location.search).trim().replace(/^\?(?:q=)?|\.$|,$|;$/g, '');
  document.getElementById("q").value = query.replace(/\+/g, ' ');

  handleQuery(query);
});

function handleSearch(event) {
  event.preventDefault()
  const query = document.getElementById("q").value
  handleQuery(query);
}

function handleQuery(query) {
  try {
    if (!query) return document.getElementById("explainer").innerHTML = "";
    window.location.href = getUrlForQuery(query);
  } catch (error) {
    document.body.removeAttribute('hidden');
    document.getElementById("explainer").innerHTML = error.message;
  }
}

function getUrlForQuery(query) {
  const match = getMatch(query);
  
  handleDefaults(match);
  handleMutations(match);
  handleSubstitutions(match);
  updateUrlParts(match);

  return buildUrl(match);
}

const MATCH_ERROR = "Sorry, I couldn't recognize that citation. Is it on the list of <a href='#recognized-bodies-of-law'>recognized bodies of law</a> or <a href='#2-cases'>case citation formats</a>?"
function getMatch(query) {
  for (var i = 0; i < schemas.length; i++) {
    var schema = schemas[i];
    var match = query.match(new RegExp(schema['regex'], 'i'));
    if (match) return {
      keys: match.groups,
      schema: schema
    }
  }
  console.log(JSON.stringify(schemas));
  throw Error(MATCH_ERROR);
}

function handleDefaults(match) {
  const {schema, keys} = match;
  for (d in schema.defaults) {
    if (!keys[d]) {
      keys[d] = schema.defaults[d];
    }
  }
}

function handleMutations(match) {
  const {schema, keys} = match;
  for (m in schema.mutations) {
    let mutation = schema.mutations[m];
    let key = keys[mutation['key']];
    if (!key) { continue; }
    if ('omit' in mutation) {
      let omission = new RegExp(mutation['omit']);
      key = key.replace(omission, '');
    }
    if (('splitter' in mutation) & ('joiner' in mutation)) {
      let splitter = new RegExp(mutation['splitter']);
      key = key.split(splitter).join(mutation['joiner']);
    }
    if ('case' in mutation) {
      if (mutation['case'] == 'upper') {
        key = key.toUpperCase();
      }
      else if (mutation['case'] == 'lower') {
        key = key.toLowerCase();
      }
    }
    keys[mutation['key']] = key;
  }
}

const SUBSTITUTION_ERROR = "Sorry, I have that body of law on file, but not that section of it. If it's a valid section, please <a href='mailto: simonraindrum@gmail.com'>let me know</a>!"
function handleSubstitutions(match) {
  const {schema, keys} = match;
  for (var s in schema.substitutions) {
    let sub = schema.substitutions[s];
    let newKey = sub['index'][keys[sub['inputKey']]];
    if (!newKey) { newKey = sub['index'][keys[sub['inputKey']].toUpperCase()]; }
    if (!newKey) { newKey = sub['index'][keys[sub['inputKey']].toLowerCase()]; }
    if (!newKey) {
      if (('allowUnmatched' in sub) & sub['allowUnmatched']) {
        return;
      }
      else {
        throw Error(SUBSTITUTION_ERROR);
      }
    }
    if ('outputKey' in sub) { keys[sub['outputKey']] = newKey; }
    else { keys[sub['inputKey']] = newKey; }
    let inputKey = sub['inputKey'];
  }
}

function updateUrlParts(match) {
  const {schema, keys} = match;
  for (var k in keys) {
    let placeholder = new RegExp("\\{" + k + "\\}", 'g');
    for (var part in schema.URLParts) {
      if (keys[k]) {
        schema.URLParts[part] = schema.URLParts[part].replace(placeholder, keys[k]);
      }
    }
  }
}

function buildUrl(match) {
  const {schema, keys} = match;
  let url = '';
  let missingPlaceholder = new RegExp("\\{.+\\}");
  for (p in schema.URLParts) {
    let part = schema.URLParts[p];
    if (!part.match(missingPlaceholder)) {
      url += part;
    }
  }
  return url;
}
