import { LOCALE, LOCALE_FALLBACK } from '@/core/config'

import { createI18n } from 'vue-i18n'

function loadLocaleMessages(): PlainObject {
  const locales = import.meta.globEager('./*.json')
  const messages: PlainObject = {}

  Object.keys(locales).forEach(key => {
    const [_, language] = key.match(/([A-Za-z0-9-_]+)\./i) || []
    if (language) {
      messages[language] = locales[key].default
    }
  })

  return messages
}

export default createI18n({
  locale: LOCALE,
  fallbackLocale: LOCALE_FALLBACK,
  messages: loadLocaleMessages(),
  silentFallbackWarn: true
})
