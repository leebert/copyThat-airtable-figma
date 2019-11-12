var apiKey = document.getElementById('api-key');
var baseId = document.getElementById('base-id');
var primaryKey = document.getElementById('primary-key');
var viewName = document.getElementById('view-name');

const getFieldValue = (data: string) => {
  if (!data) return '';
  return data;
}

onmessage = (event) => {
  const msg = event.data.pluginMessage;
  const type = msg.type;

  if (type === 'config') {
    const data = msg.airtableConfig;
    console.log("Received from plugin: ", data);

    apiKey['value'] = getFieldValue(data.apiKey);
    baseId['value'] = getFieldValue(data.baseId);
    primaryKey['value'] = getFieldValue(data.primaryKey);
    viewName['value'] = getFieldValue(data.viewName);
  }

  if (type === 'sync') {
    console.log('sync called');
    const data = msg.airtableConfig;

    var Airtable = require('airtable');
    var base = new Airtable({apiKey: data.apiKey}).base(baseId);
  }

}

document.getElementById('save').onclick = () => {
  const keys = {
    apiKey: getFieldValue(apiKey['value']),
    baseId: getFieldValue(baseId['value']),
    primaryKey: getFieldValue(primaryKey['value']),
    viewName: getFieldValue(viewName['value'])
  };

  console.log('Sending to plugin: ', keys);
  parent.postMessage({ pluginMessage: { type: 'save-airtable-config', keys } }, '*');
}

document.getElementById('cancel').onclick = () => {
  parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
}