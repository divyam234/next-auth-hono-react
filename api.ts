import { Hono } from "hono"
import { authHandler,initAuthConfig,verifyAuth} from "@hono/auth-js"
import GitHub from "@auth/core/providers/github"

const app = new Hono({ strict: false }).basePath("/")


app.use("*", initAuthConfig(c=>({
  secret: c.env.AUTH_SECRET,
  providers: [
    GitHub({
      clientId: c.env.GITHUB_ID,
      clientSecret: c.env.GITHUB_SECRET
    }),
  ],
})))

app.use("/api/auth/*", authHandler())

app.use("/api/*", verifyAuth())

app.get("/api/protected", async (c)=> {
    const auth = c.get("authUser")
    return c.json(auth)
})

export default app
