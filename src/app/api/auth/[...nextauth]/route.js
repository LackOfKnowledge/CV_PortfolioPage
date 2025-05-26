// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(
          "[NextAuth] Authorize: Attempting to authorize user:",
          credentials?.email
        );
        if (!credentials?.email || !credentials?.password) {
          console.error("[NextAuth] Authorize: Missing email or password");
          throw new Error("Proszę podać email i hasło.");
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!user || !user.hashedPassword) {
            console.warn(
              "[NextAuth] Authorize: User not found or no hashed password for:",
              credentials.email
            );
            throw new Error(
              "Nie znaleziono użytkownika lub użytkownik nie ma ustawionego hasła."
            );
          }

          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );

          if (!isValidPassword) {
            console.warn(
              "[NextAuth] Authorize: Invalid password for user:",
              user.email
            );
            throw new Error("Nieprawidłowe hasło.");
          }

          if (user.role !== "admin") {
            console.warn(
              "[NextAuth] Authorize: User is not an admin:",
              user.email,
              "Role:",
              user.role
            );
            throw new Error("Brak uprawnień administratora.");
          }

          console.log(
            "[NextAuth] Authorize: User authorized successfully:",
            user.email,
            "Role:",
            user.role
          );
          return {
            // Zwracany obiekt będzie dostępny w callbacku jwt jako parametr `user`
            id: user.id,
            name: user.email, // Możesz tu użyć innego pola, jeśli masz np. 'username'
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error(
            "[NextAuth] Authorize: Error during authorization:",
            error.message
          );
          // Rzucamy błąd, aby NextAuth wiedział, że autoryzacja się nie powiodła
          // Tekst błędu zostanie przekazany do strony logowania, jeśli nie jest to Error("CredentialsSignin")
          throw new Error(error.message || "Błąd podczas autoryzacji.");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    // maxAge: 30 * 24 * 60 * 60, // 30 dni (opcjonalnie)
    // updateAge: 24 * 60 * 60, // 24 godziny (opcjonalnie, jak często aktualizować sesję)
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log(
        "[NextAuth] JWT Callback: Token received:",
        JSON.stringify(token)
      );
      if (user) {
        // `user` jest przekazywany tylko przy pierwszym logowaniu (po wywołaniu `authorize`)
        console.log(
          "[NextAuth] JWT Callback: User object present (login):",
          JSON.stringify(user)
        );
        token.id = user.id;
        token.role = user.role;
        // token.email = user.email; // email jest już w token.email (z obiektu user)
        // token.name = user.name; // name jest już w token.name (z obiektu user)
        console.log(
          "[NextAuth] JWT Callback: Token updated with user data:",
          JSON.stringify(token)
        );
      }
      return token; // Ten token jest zapisywany w ciasteczku
    },
    async session({ session, token, user }) {
      // `token` to zdekodowany token JWT z ciasteczka
      // `user` w tym callbacku (jeśli używasz strategii 'database') to użytkownik z bazy, ale przy 'jwt' go nie ma.
      // Zamiast tego używamy `token` do wypełnienia `session.user`.
      console.log(
        "[NextAuth] Session Callback: Session received:",
        JSON.stringify(session)
      );
      console.log(
        "[NextAuth] Session Callback: Token received:",
        JSON.stringify(token)
      );

      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        // session.user.email = token.email; // Już powinno być
        // session.user.name = token.name; // Już powinno być
        console.log(
          "[NextAuth] Session Callback: Session updated with token data:",
          JSON.stringify(session)
        );
      } else {
        console.warn(
          "[NextAuth] Session Callback: Token or session.user is missing."
        );
      }
      return session; // Ta sesja jest dostępna po stronie klienta przez useSession()
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development", // Włącz logi NextAuth w trybie deweloperskim
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
