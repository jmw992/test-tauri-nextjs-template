"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputFile } from "@/components/ui/inputFile";
import { FolderInput } from "@/components/FolderInputDialog";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  filename: z.string().min(2).max(1000),
});

export default function History() {
  return <>history</>;
}
