"use client";

import { useRouter } from "next/navigation";
import { useSecretCode } from "@/hooks/useSecretCode";

const SECRET_CODE = "aezakmi";

const SecretCodeHandler = () => {
  const router = useRouter();

  const handleSecretCode = () => {
    console.log("Kod AEZAKMI aktywowany! Przekierowanie do /admin/login...");
    router.push("/admin/login");
  };

  useSecretCode(SECRET_CODE, handleSecretCode);

  return null;
};

export default SecretCodeHandler;
