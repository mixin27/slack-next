import { useMemberId } from "@/hooks/use-member-id";
import { Doc } from "../../../../../../convex/_generated/dataModel";
import { useGetMember } from "@/features/members/api/use-get-member";
import { useGetMessages } from "@/features/messages/api/use-get-messages";
import { Loader } from "lucide-react";
import ConversationHeader from "./conversation-header";
import ConversationChatInput from "./conversation-chat-input";
import MessageList from "@/components/message_list";

type Props = {
  conversation: Doc<"conversations">;
};

const Conversation = ({ conversation }: Props) => {
  const memberId = useMemberId();

  const { data: member, isLoading: memberLoading } = useGetMember({
    id: memberId,
  });
  const { results, status, loadMore } = useGetMessages({
    conversationId: conversation._id,
  });

  if (memberLoading || status === "LoadingFirstPage") {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ConversationHeader
        memberName={member?.user.name}
        memberImage={member?.user.image}
        onClick={() => {}}
      />

      <MessageList
        data={results}
        variant="conversation"
        memberImage={member?.user.image}
        memberName={member?.user.name}
        loadMore={loadMore}
        isLoadingMore={status === "LoadingMore"}
        canLoadMore={status === "CanLoadMore"}
      />

      <ConversationChatInput
        placeholder={`Message ${member?.user.name}`}
        conversationId={conversation._id}
      />
    </div>
  );
};

export default Conversation;
