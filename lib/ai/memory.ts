import { promises as fs } from "node:fs";
import { v4 as uuidv4 } from "uuid";
import type { AIMessage } from "@/lib/ai/types";

export type MessageWithMetadata = AIMessage & {
	id: string;
	createdAt: string;
};

type Data = {
	messages: MessageWithMetadata[];
};

export const addMetadata = (message: AIMessage): MessageWithMetadata => {
	return {
		...message,
		id: uuidv4(),
		createdAt: new Date().toISOString(),
	};
};

export const removeMetadata = (message: MessageWithMetadata): AIMessage => {
	const { id, createdAt, ...rest } = message;
	return rest;
};

const defaultData: Data = {
	messages: [],
};

const DB_FILE = "db.json";

const readDbData = async (): Promise<Data> => {
	try {
		const fileContent = await fs.readFile(DB_FILE, "utf-8");
		return JSON.parse(fileContent);
	} catch (error) {
		// If file doesn't exist or is invalid, return default data
		return defaultData;
	}
};

const writeDbData = async (data: Data): Promise<void> => {
	await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
};

export const addMessages = async (messages: AIMessage[]): Promise<void> => {
	const data = await readDbData();
	data.messages.push(...messages.map(addMetadata));
	await writeDbData(data);
};

export const getMessages = async (): Promise<AIMessage[]> => {
	const data = await readDbData();
	return data.messages.map(removeMetadata);
};

export const getAllMessagesWithMetadata = async (): Promise<
	MessageWithMetadata[]
> => {
	const data = await readDbData();
	return data.messages;
};

export const clearMessages = async (): Promise<void> => {
	const data = await readDbData();
	data.messages = [];
	await writeDbData(data);
};

export const saveToolResponse = async (
	toolCallId: string,
	toolResponse: string,
): Promise<void> => {
	return addMessages([
		{
			role: "tool",
			content: toolResponse,
			tool_call_id: toolCallId,
		},
	]);
};
