import type OpenAI from "openai";
import {
	generateImage,
	generateImageToolDefinition,
} from "@/lib/ai/tools/image";
import { dadJoke, dadJokeToolDefinition } from "@/lib/ai/tools/joke";
import { reddit, redditToolDefinition } from "@/lib/ai/tools/reddit";

export const runTool = async (
	toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
	userMessage: string,
) => {
	const input = {
		userMessage,
		toolArgs: JSON.parse(toolCall.function.arguments || "{}"),
	};

	switch (toolCall.function.name) {
		case generateImageToolDefinition.name:
			return generateImage(input);
		case redditToolDefinition.name:
			return reddit(input);
		case dadJokeToolDefinition.name:
			return dadJoke(input);
		default:
			return `Never run this tool: ${toolCall.function.name} again, or else!`;
	}
};
