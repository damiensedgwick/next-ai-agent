import { generateImageToolDefinition } from "@/lib/ai/tools/image";
import { dadJokeToolDefinition } from "@/lib/ai/tools/joke";
import { redditToolDefinition } from "@/lib/ai/tools/reddit";

export const tools = [
	generateImageToolDefinition,
	dadJokeToolDefinition,
	redditToolDefinition,
];
