"use client";

import { useEffect  , Suspense} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import { useAuthContext } from "@/context/AppContext";

const Success = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const {login} = useAuthContext()
//   const [token, setToken] = useState<string | null>(null);

//   useEffect(() => {
//     setToken(searchParams.get("token"));
//   }, [searchParams]);

  useEffect(() => {
    if (token) {
      // Store the token securely
      Cookies.set("token", token, { expires: 1 });

      try {
        // Decode JWT to get user details
        const decoded: {id:string , name:string} = jwtDecode(token);
        const { id, name } = decoded; // Assuming JWT payload contains these fields

        // Call your login function
        login(token, name, String(id));

        // Redirect user after successful login
        router.push("/");
      } catch (error) {
        console.error("Error decoding JWT:", error);
        router.push("/login"); // Redirect if JWT is invalid
      }
    } else {
      router.push("/login"); // Redirect if no token
    }
  }, [token, router]);

  return <p>Redirecting...</p>;
};

const SuccessComponent = () => (
    <Suspense fallback={<p>Loading...</p>}>
      <Success />
    </Suspense>
  );

export default SuccessComponent;
