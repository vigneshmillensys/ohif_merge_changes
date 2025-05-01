const debugMode = !!(process.env.NODE_ENV !== 'production' && process.env.REACT_APP_I18N_DEBUG);

const detectionOptions = {
  // order and from where user language should be detected
  order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],

  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

  // optional htmlTag with lang attribute, the default is:
  htmlTag: document.documentElement,
};

const config = {
  //baseUrl: 'http://localhost:44301/', //process.env.NODE_ENV === 'production' ? 'https://neurevealpacs.ai:4443' : 'http://localhost:4444',
  baseUrl: 'https://neurevealpacs.ai:4443/', //process.env.NODE_ENV === 'production' ? 'https://neurevealpacs.ai:4443' : 'http://localhost:4444',
  //reportUrl: 'https://neurevealpacs.ai/DocumentService/',
  reportUrl: 'https://millensysonline.net/MILLENSYS/MiViewer/',
};

export { debugMode, detectionOptions, config };
