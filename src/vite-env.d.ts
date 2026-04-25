/// <reference types="vite/client" />

interface Window {
  gtag?: (...args: unknown[]) => void;
}

declare const APP_VERSION: string;
declare const CHANGELOG: string;
