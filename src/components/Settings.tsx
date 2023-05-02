import { Settings as SettingsIcon } from "lucide-react";
import { useAtom } from "jotai";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Switch } from "./ui/switch";

import { settingsAtom } from "../lib/settings";

export function Settings() {
  const [settings, setSettings] = useAtom(settingsAtom);

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

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="absolute right-2 top-2 w-10 rounded-full p-0"
        >
          <SettingsIcon className="h-4 w-4" />
          <span className="sr-only">Open settings</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
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
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
