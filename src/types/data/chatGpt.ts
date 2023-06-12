interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export type ChatGptResponse = {
  message: Message;
  finish_reason?: string;
  index: number;
};
