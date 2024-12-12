"use client";
import { experimental_useObject as useObject } from "ai/react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { bakingSchema } from "@/app/api/baking/schema";
import { ChangeEvent, useState } from "react";
import DiffCode from "./diff-code";
import { MarkdownContent } from "./markdown";
import { Alert, AlertDescription } from "./ui/alert";

export default function Baking() {
  const [code, setCode] = useState("");
  const { object, submit } = useObject({
    api: "/api/baking",
    schema: bakingSchema,
  });

  const handleCodeChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const handleBaking = () => {
    submit(code);
  };

  console.log("object:", object);

  return (
    <div className="">
      <div className="mx-auto flex flex-col justify-center items-center gap-4 w-[800px] py-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Start baking your code.
        </h1>
        <Textarea className="h-60" onChange={handleCodeChange} />
        <Button size="lg" onClick={handleBaking}>
          Baking
        </Button>

        {!!object?.content && (
          <Alert>
            <AlertDescription>
              <MarkdownContent content={object?.content} />
            </AlertDescription>
          </Alert>
        )}
      </div>
      <div className="w-4/5 mx-auto">
        <DiffCode
          oldString={object?.beforeCode || ""}
          newString={object?.afterCode || ""}
        />
      </div>
    </div>
  );
}
