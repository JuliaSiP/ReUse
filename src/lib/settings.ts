export interface Setting {
  key: string;
  value: string;
  type: string;
}

export async function getSetting(key: string): Promise<string | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/settings/${key}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.value;
  } catch (e) {
    return null;
  }
}

export async function isFeatureEnabled(key: string, defaultValue = true): Promise<boolean> {
  const value = await getSetting(key);
  if (value === null) return defaultValue;
  return value === "true";
}
