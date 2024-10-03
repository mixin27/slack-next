import dynamic from "next/dynamic";
import Quill from "quill";
import { useRef } from "react";

const Editor = dynamic(() => import("@/components/global/editor"), {
  ssr: false,
});

type ChatInputProps = {
  placeholder: string;
};

const ChatInput = ({ placeholder }: ChatInputProps) => {
  const editorRef = useRef<Quill | null>(null);

  return (
    <div className="px-5 w-full">
      <Editor
        onSubmit={() => {}}
        placeholder={placeholder}
        disabled={false}
        innerRef={editorRef}
      />
    </div>
  );
};

export default ChatInput;
