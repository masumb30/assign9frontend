
import { createAuthClient } from "better-auth/react"

import { jwtClient } from "better-auth/client/plugins"
export const authClient = createAuthClient({

    baseURL: "https://assign9frontend.vercel.app",
    plugins: [
        jwtClient()
    ]
})


