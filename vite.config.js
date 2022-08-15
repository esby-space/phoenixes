import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                home: resolve(__dirname, "index.html"),
                team: resolve(__dirname, "team.html"),
                seasons: resolve(__dirname, "seasons.html"),
            },
        },
    },
});
