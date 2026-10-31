import {formPage} from './formPage'
import {homePage} from './homePage'

export const schemaTypes = [homePage, formPage]

// Document types that only ever have one document
export const singletonTypes = new Set(['homePage', 'formPage'])
