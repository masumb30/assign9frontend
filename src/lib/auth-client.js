
import { createAuthClient } from "better-auth/react"

import { jwtClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    // next public better auth url will be the hosted frontend url, or the localhost:3000 url if frontend is running on localhost
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    plugins: [
        jwtClient()
    ]
})


