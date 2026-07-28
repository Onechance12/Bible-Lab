import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { sites } from "vinext/vite";

export default defineConfig({ plugins: [sites(), cloudflare()] });
