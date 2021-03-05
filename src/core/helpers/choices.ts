import * as Choices from '@/core/config/choices'

import { LOCALE } from '@/core/config'
import { enumKeys } from './types'
import i18n from '@/locales'

const { global: { t } } = i18n

/**
 * Translate a Choice Enum, retriveing from locale.
 * @param {string} choice Enum name
 * @param {string} locale Locale (defaults to LOCALE)
 * @returns Maybe<PlainObject> Translated enum, contaning key => translated text
 */
export function translate(choice: string, locale = LOCALE): Maybe<PlainObject> {
  if (!(choice in Choices)) {
    return null
  }

  const items = (Choices as PlainObject)[choice]

  const translatedChoice: PlainObject = {}
  enumKeys(items).forEach(i => {
    translatedChoice[i] = t(`choices.${choice}.${i}`, i, { locale })
  })

  return translatedChoice
}

/**
 * Translate a Choice Enum, retriveing from locale.
 * @param {object} choice Enum
 * @param {string} locale Locale (defaults to LOCALE)
 * @returns Maybe<PlainObject> Translated enum, contaning key => translated text
 */
export function translateChoice(choice:  PlainObject, locale = LOCALE): Maybe<PlainObject> {
  const [ name ] = Object.entries(Choices).filter(([,v]) => {
    return v === choice
  }).map(([k]) => k)

  if (!name) {
    return null
  }

  const translatedChoice: PlainObject = {}
  enumKeys(choice).forEach(i => {
    translatedChoice[i] = t(`choices.${name}.${i}`, i, { locale })
  })

  return translatedChoice
}
