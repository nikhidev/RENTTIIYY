"use client";

import { fetchAuthSession } from "aws-amplify/auth";
import { useEffect } from "react";

export default function DebugTokenPage() {
  useEffect(() => {
    (async () => {
      try {
        const session = await fetchAuthSession();
        console.log("ID Token:", session.tokens?.idToken?.toString());
        console.log("Access Token:", session.tokens?.accessToken?.toString());
      } catch (err) {
        console.error("Error fetching session:", err);
      }
    })();
  }, []);

  return (
    <div className="p-4">
      <h2>Check your browser console</h2>
      <p>The ID and Access tokens will be logged there.</p>
    </div>
  );
}

