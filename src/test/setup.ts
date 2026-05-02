import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body></body></html>');

globalThis.window = dom.window as unknown as Window & typeof globalThis;
globalThis.document = dom.window.document;
globalThis.navigator = dom.window.navigator;
globalThis.HTMLElement = dom.window.HTMLElement;
