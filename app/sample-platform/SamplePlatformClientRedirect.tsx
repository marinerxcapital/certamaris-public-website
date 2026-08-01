"use client";

import { useEffect } from "react";

export function SamplePlatformClientRedirect() {
  useEffect(() => {
    window.location.replace("/demo");
  }, []);
  return null;
}
