import { readdirSync, existsSync } from 'fs'
import { join } from 'path'
import type { Plugin } from 'vite'

const VIRTUAL_MODULE_ID = 'virtual:gallery-manifest'
const RESOLVED_ID = '\0' + VIRTUAL_MODULE_ID

const IMAGE_EXTENSIONS = /\.(webp|jpg|jpeg|png)$/i

const CATEGORIES = [
  'newborn',
  'less-than-one-year',
  'one-year',
  'familys',
] as const

function scanGalleries(publicDir: string): Record<string, string[]> {
  const manifest: Record<string, string[]> = {}

  for (const category of CATEGORIES) {
    const dir = join(publicDir, 'gallerys', category)

    if (!existsSync(dir)) {
      manifest[category] = []
      continue
    }

    manifest[category] = readdirSync(dir)
      .filter((file) => IMAGE_EXTENSIONS.test(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((file) => `/gallerys/${category}/${file}`)
  }

  return manifest
}

export default function galleryPlugin(): Plugin {
  let publicDir: string

  return {
    name: 'gallery-manifest',

    configResolved(config) {
      publicDir = config.publicDir
    },

    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) return RESOLVED_ID
    },

    load(id) {
      if (id !== RESOLVED_ID) return
      const manifest = scanGalleries(publicDir)
      return `export default ${JSON.stringify(manifest)}`
    },

    configureServer(server) {
      const gallerysDir = join(publicDir, 'gallerys')

      server.watcher.add(gallerysDir)

      server.watcher.on('all', (_event, filePath) => {
        if (!filePath.startsWith(gallerysDir)) return

        const mod = server.moduleGraph.getModuleById(RESOLVED_ID)
        if (mod) {
          server.moduleGraph.invalidateModule(mod)
          server.ws.send({ type: 'full-reload' })
        }
      })
    },
  }
}
