import { runLLM } from "@/lib/ai/llm";
import { addMessages, getMessages, saveToolResponse } from "@/lib/ai/memory";
import { runTool } from "@/lib/ai/runner";

export const runAgent = async ({
	userMessage,
	tools,
}: {
	userMessage: string;
	// biome-ignore lint/suspicious/noExplicitAny: we need to use any here because the tools are not typed
	tools: any[];
}) => {
	await addMessages([{ role: "user", content: userMessage }]);

	while (true) {
		const history = await getMessages();
		const response = await runLLM({ messages: history, tools });

		await addMessages([response]);

		if (response.content) {
			return getMessages();
		}

		if (response.tool_calls) {
			const toolCall = response.tool_calls[0];

			const toolResponse = await runTool(toolCall, userMessage);
			await saveToolResponse(toolCall.id, toolResponse);
		}
	}
};
