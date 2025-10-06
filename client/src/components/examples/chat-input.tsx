import { ChatInput } from "../chat-input";

export default function ChatInputExample() {
  return (
    <div className="max-w-2xl">
      <ChatInput
        onSend={(msg) => console.log("Message sent:", msg)}
        isLoading={false}
      />
    </div>
  );
}
