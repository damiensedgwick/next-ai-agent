import { zodFunction } from "openai/helpers/zod";
import { prompt } from "@/lib/ai/prompt";
import type { AIMessage } from "@/lib/ai/types";
import { openai } from "./ai";

export const runLLM = async ({
	messages,
	tools,
}: {
	messages: AIMessage[];
	// biome-ignore lint/suspicious/noExplicitAny: we need to use any here because the tools are not typed
	tools: any[];
}) => {
	const formattedTools = tools.map(zodFunction);

	const response = await openai.chat.completions.create({
		model: "gpt-4o-mini",
		temperature: 0.2,
		messages: [{ role: "system", content: prompt }, ...messages],
		tools: formattedTools,
		tool_choice: "auto",
		parallel_tool_calls: false,
	});

	return response.choices[0].message;
};
