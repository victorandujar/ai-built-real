/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly PUBLIC_LAUNCH_READY?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
