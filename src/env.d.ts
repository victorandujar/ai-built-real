/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_LAUNCH_READY?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
