import { Settings as SettingsIcon } from "lucide-react";
import { useAtom } from "jotai";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Switch } from "./ui/switch";

import { settingsAtom } from "../lib/settings";
import { themeAtom } from "../lib/theme";
import { cn } from "../lib/utils";

export function Settings() {
  const [settings, setSettings] = useAtom(settingsAtom);
  const [theme, setTheme] = useAtom(themeAtom);

  const themeClass = theme === "dark" ? "dark" : "";

  const handleIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (isNaN(value)) return;

    setSettings((prev) => ({ ...prev, resetTimerIntervalAsSec: value }));
  };

  const handleDecimalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (isNaN(value)) return;

    setSettings((prev) => ({ ...prev, decimal: value }));
  };

  const handleHalfBeatChange = (checked: boolean) => {
    setSettings((prev) => ({ ...prev, halfBeat: checked }));
  };

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className="absolute right-2 bottom-2 w-10 rounded-full p-0"
        >
          <SettingsIcon
            color={theme === "dark" ? "white" : undefined}
            className="h-7 w-7"
          />
          <span className="sr-only">Open settings</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-80", themeClass)}>
        <div
          className={cn(
            "grid gap-4  font-mono dark:bg-black dark:text-white",
            themeClass
          )}
        >
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Settings</h4>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="reset-interval">Reset(sec.)</Label>
              <Input
                id="reset-interval"
                type="number"
                min={0}
                value={settings.resetTimerIntervalAsSec}
                onChange={handleIntervalChange}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="decimal">Decimal</Label>
              <Input
                id="decimal"
                type="number"
                min={0}
                max={2}
                value={settings.decimal}
                onChange={handleDecimalChange}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="half">Half Beat</Label>
              <Switch
                id="half"
                className="col-span-2"
                checked={settings.halfBeat}
                onCheckedChange={handleHalfBeatChange}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="theme">Dark Mode</Label>
              <Switch
                id="theme"
                className="col-span-2"
                checked={theme === "dark"}
                onCheckedChange={handleThemeChange}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
