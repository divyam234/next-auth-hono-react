import { Hono ,Context} from "hono"
import { authHandler,initAuthConfig,verifyAuth ,AuthConfig} from "@hono/auth-js"
import GitHub from "@auth/core/providers/github"
import { cors } from "hono/cors"

function getAuthConfig(c: Context): AuthConfig {
    return {
      secret: c.env.AUTH_SECRET,
      providers: [
        GitHub({
          clientId: c.env.GITHUB_ID,
          clientSecret: c.env.GITHUB_SECRET
        }),
      ],
    }
  }
  
const app = new Hono({ strict: false }).basePath("/")

// app.use(
//   "*",
//   cors({
//     origin: (origin) => origin,
//     allowHeaders: ["Content-Type"],
//     allowMethods: ["*"],
//     maxAge: 86400,
//     credentials: true,
//   })
// )

app.use("*", initAuthConfig(getAuthConfig))

app.use("/api/auth/*", authHandler())

app.use("/api/*", verifyAuth())

app.get("/api/protected", async (c)=> {
    const auth = c.get("authUser")
    return c.json(auth)
})

export default app
