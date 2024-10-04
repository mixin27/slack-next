import { useCreateMessage } from "@/features/messages/api/use-create-message";
import { useChannelId } from "@/hooks/use-channel-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import dynamic from "next/dynamic";
import Quill from "quill";
import { useRef, useState } from "react";
import { toast } from "sonner";

const Editor = dynamic(() => import("@/components/global/editor"), {
  ssr: false,
});

type ChatInputProps = {
  placeholder: string;
};

const ChatInput = ({ placeholder }: ChatInputProps) => {
  const [editorKey, setEditorKey] = useState(0);
  const [pending, setPending] = useState(false);

  const editorRef = useRef<Quill | null>(null);

  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();

  const { mutate: sendMessage } = useCreateMessage();

  const handleSubmit = async ({
    body,
    image,
  }: {
    body: string;
    image: File | null;
  }) => {
    console.log({ image, body });

    try {
      setPending(true);

      await sendMessage(
        {
          workspaceId,
          channelId,
          body,
        },
        { throwError: true }
      );

      setEditorKey((prevKey) => prevKey + 1);
      // editorRef?.current?.setContents([]);
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="px-5 w-full">
      <Editor
        key={editorKey}
        onSubmit={handleSubmit}
        placeholder={placeholder}
        disabled={pending}
        innerRef={editorRef}
      />
    </div>
  );
};

export default ChatInput;
