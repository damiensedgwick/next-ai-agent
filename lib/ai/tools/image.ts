import { z } from "zod";
import { openai } from "@/lib/ai/ai";
import type { ToolFn } from "@/lib/ai/types";

export const generateImageToolDefinition = {
	name: "generate_image",
	parameters: z.object({
		prompt: z
			.string()
			.describe(
				`prompt for the image. Be sure to consider the user's original message when making the prompt. If you are unsure, then as the user to provide more details.`,
			),
	}),
	description: "generate an image",
};

type Args = z.infer<typeof generateImageToolDefinition.parameters>;

export const generateImage: ToolFn<Args, string> = async ({ toolArgs }) => {
	const response = await openai.images.generate({
		model: "dall-e-3",
		prompt: toolArgs.prompt,
		n: 1,
		size: "512x512",
	});

	return response.data?.[0]?.url ?? "Unable to generate image";
};
