/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_OTHER_ENV?: string;
    readonly VITE_GOOGLE_SHEETS_URL: string;
    readonly VITE_VERSION_MODE?: 'full' | 'minimal';
    readonly VITE_ENABLE_TEST_MODE?: string;
    // add other variables here
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }