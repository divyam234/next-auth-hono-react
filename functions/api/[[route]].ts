import { handle } from "hono/cloudflare-pages"
import app from "@/api"
export const onRequest = handle(app)