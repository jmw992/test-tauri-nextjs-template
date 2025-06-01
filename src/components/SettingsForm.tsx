import { useState } from "react";
import { useZustandStore } from "@/lib/useZustandStore";
import type { PersistedState } from "@/lib/useZustandStore";
import { setStorePersistedSettings } from "@/lib/persistStorage";
import { FolderInput } from "./FolderInputDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { SUPPORTED_GAMES } from "@/constants";

export const SettingsForm = ({
  initialState,
}: { initialState: PersistedState }) => {
  const setPersistedState = useZustandStore((state) => state.setPersistedState);

  // Local state for form
  const [form, setForm] = useState<PersistedState>(initialState);

  const handleChange = (key: keyof PersistedState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPersistedState(form);
    setStorePersistedSettings(form);
    toast.success("Settings saved successfully!");
  };

  console.log("jmw form.game", form.game);

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        // maxWidth: 500,
      }}
    >
      <div>
        <label htmlFor="settings-game">Game</label>
        <Select
          value={form.game}
          onValueChange={(value) => handleChange("game", value)}
          defaultValue={form.game}
        >
          <SelectTrigger id="settings-game">
            <SelectValue placeholder={form.game} />
          </SelectTrigger>
          <SelectContent>
            {...SUPPORTED_GAMES.map((game) => (
              <SelectItem key={game} value={game}>
                {game}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="settings-mod">Mod</label>
        <Input
          id="settings-mod"
          type="text"
          value={form.mod}
          onChange={(e) => handleChange("mod", e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="settings-game-dir">Game Directory</label>
        <FolderInput
          title="Select"
          initialValue={form.gameDirectory}
          onChange={(val) => handleChange("gameDirectory", val)}
        />
      </div>
      <div>
        <label htmlFor="settings-screenshots-dir">Screenshots Directory</label>
        <FolderInput
          title="Select"
          initialValue={form.screenshotsDirectory}
          onChange={(val) => handleChange("screenshotsDirectory", val)}
        />
      </div>
      <Button size="lg" type="submit" style={{ alignSelf: "flex-end" }}>
        Save
      </Button>
    </form>
  );
};
