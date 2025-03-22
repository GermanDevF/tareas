import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const c = req.cookies;
    const nextauth = c.get("next-auth.session-token");
    console.log({
      ...req.cookies,
    });

    if (!nextauth) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/login", // Redirigir a esta página si no está autenticado
    },
  }
);

export const config = {
  matcher: ["/dashboard", "/admin", "/profile"], // Protege varias rutas
};
