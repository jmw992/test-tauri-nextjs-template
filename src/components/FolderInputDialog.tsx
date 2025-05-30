import { Input } from "@/components/ui/input";
import { open } from "@tauri-apps/plugin-dialog";
import { useState } from "react";
import { RoundedButton } from "./RoundedButton";

interface FolderInputProps {
  title: string;
  initialValue?: string;
  onChange: (filePath: string) => void;
}

export const FolderInput: React.FC<FolderInputProps> = ({
  title,
  initialValue: inputPlaceholder,
  onChange,
}) => {
  const [displayFile, setDisplayFile] = useState(
    inputPlaceholder ?? "total war warhammer 3",
  );

  const onClickAsync = async () => {
    const file = await open({
      multiple: false,
      directory: true,
    });
    console.log("Selected file:", file);
    if (typeof file === "string") {
      setDisplayFile(file);
      onChange(file);
    }
  };

  const onClick = () => {
    void onClickAsync();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "0.5rem",
        alignItems: "center",
      }}
    >
      <RoundedButton onClick={onClick} title={title} />
      <Input
        type="text"
        value={displayFile}
        // placeholder={inputPlaceholder ?? "Selected file path will appear here"}
        // defaultValue={inputPlaceholder ?? "Selected file path will appear here"}
        style={{ width: "100%", minWidth: 0 }}
        onChange={(e) => {
          setDisplayFile(e.target.value);
          onChange(e.target.value);
        }}
      />
    </div>
  );
};
