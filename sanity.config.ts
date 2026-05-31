'use client'

/**
 * Konfiguration für das Sanity Studio unter der Route `/app/studio/[[...tool]]/page.tsx`.
 */

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from './sanity/env'
import { schemaTypes } from './sanity/schema'
import { structure } from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  title: 'Farben die verbinden',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool({ structure })],
})
