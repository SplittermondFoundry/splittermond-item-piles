import {defineConfig} from 'vite';
import path from "path";

export default defineConfig({
    root: path.resolve(__dirname, '../src/'),
    publicDir: path.resolve(__dirname, '../public'),
    base: '/modules/splittermond-item-piles/',
    plugins: [],
    server: {
        port: 30002,
        open: true,
        proxy: {
            '^(?!/modules/splittermond-item-piles)': 'http://localhost:30000/',
            '^(?!/systems/splittermond)': 'http://localhost:30001/',
            '/socket.io': {
                target: 'ws://localhost:30000',
                ws: true,
            },
        }
    },
    css: {
        preprocessorOptions: {
            less: {
                math: "always",
                relativeUrls: true,
                javascriptEnabled: true,
            }
        }
    },
    resolve: {
        alias: {
            'module': path.resolve(__dirname, '../src/module')
        }
    },
    build: {
        outDir: path.resolve(__dirname, '../dist'),
        emptyOutDir: true,
        sourcemap: true,
        lib: {
            name: 'splittermond-item-piles',
            entry: 'splittermond-item-piles.js',
            formats: ['es'],
            fileName: 'splittermond-item-piles'
        },
        rollupOptions: {
            output: {}
        }
    }
})
