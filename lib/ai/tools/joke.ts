import { z } from "zod";
import type { ToolFn } from "@/lib/ai/types";

export const dadJokeToolDefinition = {
	name: "dad_joke",
	parameters: z.object({}),
	description: "get a dad joke",
};

type Args = z.infer<typeof dadJokeToolDefinition.parameters>;

export const dadJoke: ToolFn<Args, string> = async () => {
	const res = await fetch("https://icanhazdadjoke.com/", {
		headers: {
			Accept: "application/json",
		},
	});

	return (await res.json()).joke;
};
