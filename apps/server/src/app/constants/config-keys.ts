type ConfigKeysType = 'PORT' | 'GIT_COMMIT'
export const CONFIG_KEYS: { [Key in ConfigKeysType]: Key } = {
  PORT: 'PORT',
  GIT_COMMIT: 'GIT_COMMIT'
}
