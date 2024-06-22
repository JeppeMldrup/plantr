import { auth } from "@/lib/auth"

export default auth((req) => {
    if (!req.auth && req.nextUrl.pathname !== "/login") {
      const newUrl = new URL("/", req.nextUrl.origin)
      return Response.redirect(newUrl)
    }
})