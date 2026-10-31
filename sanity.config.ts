'use client'

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {colorInput} from '@sanity/color-input'

import {apiVersion, dataset, projectId} from './sanity/env'
import {schemaTypes, singletonTypes} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  basePath: '/studio',
  title: 'Maggie Flynn Finance',
  projectId,
  dataset,
  plugins: [
    structureTool({structure}),
    colorInput(),
    // GROQ playground, only in local development
    ...(process.env.NODE_ENV === 'development' ? [visionTool({defaultApiVersion: apiVersion})] : []),
  ],
  schema: {
    types: schemaTypes,
    // Hide singletons from the "Create new" menu
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },
  document: {
    // Singletons can't be duplicated or deleted
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({action}) => action && singletonActions.has(action))
        : input,
  },
})
