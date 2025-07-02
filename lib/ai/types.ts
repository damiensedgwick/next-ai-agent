import type OpenAI from "openai";

export type AIMessage =
	| OpenAI.Chat.Completions.ChatCompletionAssistantMessageParam
	| { role: "user"; content: string }
	| { role: "tool"; content: string; tool_call_id: string };

// biome-ignore lint/suspicious/noExplicitAny: we need to be able to pass any type to the tool function
export type ToolFn<A = any, T = any> = (input: {
	userMessage: string;
	toolArgs: A;
}) => Promise<T>;
