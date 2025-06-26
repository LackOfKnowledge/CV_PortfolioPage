"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSecretCode } from "@/hooks/useSecretCode";

const SECRET_CODE = "aezakmi";

const SecretCodeHandler = () => {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const handleSecretCode = () => {
    alert("Wita księciuniu! Zapraszam do logowanka maj frend xD");
    router.push("/admin/login");
  };

  useSecretCode(SECRET_CODE, handleSecretCode);

  return null;
};

export default SecretCodeHandler;
