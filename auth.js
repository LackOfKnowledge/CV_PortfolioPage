import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials"; // <-- IMPORTUJEMY CredentialsProvider
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs"; // <-- IMPORTUJEMY bcrypt

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // --- POCZĄTEK ZMIAN ---
    // Dodajemy nowego dostawcę do logowania emailem i hasłem
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // 1. Znajdź użytkownika w bazie danych
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // 2. Jeśli użytkownik nie istnieje lub nie ma hashowanego hasła, zwróć błąd
        if (!user || !user.hashedPassword) {
          return null;
        }

        // 3. Porównaj podane hasło z hashem w bazie danych
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        // 4. Jeśli hasło jest poprawne, zwróć użytkownika
        if (isPasswordValid) {
          return user;
        }

        // Jeśli hasło jest niepoprawne, zwróć null
        return null;
      },
    }),
    // --- KONIEC ZMIAN ---
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role; // <-- Dodaj rolę do sesji
      }
      return session;
    },
  },
  session: {
    strategy: "jwt", // Używanie JWT jest rekomendowane z CredentialsProvider
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/admin/login",
  },
});
