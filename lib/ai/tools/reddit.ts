import { z } from "zod";
import type { ToolFn } from "@/lib/ai/types";

export const redditToolDefinition = {
	name: "reddit",
	parameters: z.object({}),
	description: "get the latest posts from Reddit",
};

type Args = z.infer<typeof redditToolDefinition.parameters>;

export const reddit: ToolFn<Args, string> = async () => {
	const { data } = await fetch("https://www.reddit.com/r/nba/.json").then(
		(res) => res.json(),
	);

	const relevantInfo = data.children.map(
		(
			child: unknown & {
				data: {
					title: string;
					url: string;
					subreddit_name_prefixed: string;
					author: string;
					ups: number;
				};
			},
		) => ({
			title: child.data.title,
			link: child.data.url,
			subreddit: child.data.subreddit_name_prefixed,
			author: child.data.author,
			upvotes: child.data.ups,
		}),
	);

	return JSON.stringify(relevantInfo, null, 2);
};
