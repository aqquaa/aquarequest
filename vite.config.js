import { resolve } from 'path'
import { defineConfig } from 'vite'

export function createBanner() {
    return `/**
   * AquaRequest
   * version: v1.0.5
   * 
   * Copyright (c) itsrav.dev
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */`
}

export default defineConfig({
  build: {
    outDir: './dist',
    minify: 'esbuild',
    esbuild: {
        banner: createBanner(),
    },
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'AquaRequest',
      fileName: 'aqua-request',
    }
  },
})
