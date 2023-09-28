import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { atomState, THEME_DICTIONARY } from "@recoil/settings";
import { AtomState, Theme } from "@recoil/settings/types";
import { getItem, THEME_KEY } from "@utils/localStorage";

export const useSettingsRecoil = () => {
  const [settings, setSettings] = useRecoilState(atomState);

  useEffect(() => {
    const isClient = typeof window === "object";
    if (isClient) {
      const savedTheme = getItem(THEME_KEY, "device");
      let currentTheme: Theme = settings.theme;
      if (savedTheme === "device") {
        if (window?.matchMedia("(prefers-color-scheme: dark)")?.matches) {
          currentTheme = "dark";
        }
      } else if (THEME_DICTIONARY[savedTheme]) {
        // dark theme by default even when users' browser setting prefers light theme:
        currentTheme = "dark";
        // currentTheme = savedTheme;
      }

      const initSettings: AtomState = {
        theme: currentTheme,
      };
      setSettings(initSettings);
    }
  }, []);
};
