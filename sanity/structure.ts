import type {StructureResolver} from 'sanity/structure'
import {EnvelopeIcon} from '@sanity/icons/Envelope'
import {HomeIcon} from '@sanity/icons/Home'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home Page')
        .id('homePage')
        .icon(HomeIcon)
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem()
        .title('Newsletter Page')
        .id('formPage')
        .icon(EnvelopeIcon)
        .child(S.document().schemaType('formPage').documentId('formPage')),
    ])
