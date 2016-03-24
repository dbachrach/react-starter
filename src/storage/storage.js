import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
import debounce     from 'redux-storage-decorator-debounce';
import filter       from 'redux-storage-decorator-filter';

let engine = createEngine('react-starter-save-key');

// These keys will be stored to local storage
engine = filter(engine, [

]);

// Debounce saves to every 0.5 seconds
engine = debounce(engine, 500);

export const storageMiddleware = storage.createMiddleware(engine);

export const storageLoad = storage.createLoader(engine);
