import { useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { RoundedButton } from "./RoundedButton";
import { Input } from "@/components/ui/input";

type FolderInputProps = {
  title: string;
  inputPlaceholder?: string;
  onChange: (filePath: string) => void;
};

export const FolderInput: React.FC<FolderInputProps> = ({
  title,
  inputPlaceholder,
  onChange,
}) => {
  const [filePath, setFilePath] = useState("");

  const onClickAsync = async () => {
    const file = await open({
      multiple: false,
      directory: true,
    });
    console.log("Selected file:", file);
    if (typeof file === "string") {
      setFilePath(file);
      onChange(filePath);
    }
  };

  const onClick = () => {
    void onClickAsync();
  };

  console.log("jmw filePath", filePath);

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
        value={filePath}
        placeholder={inputPlaceholder || "Selected file path will appear here"}
        style={{ width: "100%", minWidth: 0 }}
        onChange={(e) => {
          setFilePath(e.target.value);
          onChange(e.target.value);
        }}
      />
    </div>
  );
};
