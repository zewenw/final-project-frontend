
interface ImportMetaEnv {
  readonly VITE_EUREKA_SERVICE_URL: string
  readonly VITE_ZIPKIN_URL: string
  // more environmental variable...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}