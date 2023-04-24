import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum
} from 'openai';
import { api } from './api';

const INIT_MESSAGES_PROMPT: Array<ChatCompletionRequestMessage> = [
  {
    role: ChatCompletionRequestMessageRoleEnum.System,
    content: `You are a very senior developer with knowledge in every single language and a very senior QA engineer while not providing an explantion. Feel free to ignore irrelevant context. What subproblems need to be solved? Let's think step by step. Test:`
  }
];

const generateChatCompletionPrompt = (
  content: string
): Array<ChatCompletionRequestMessage> => {
  const chatContextAsCompletionRequest = [...INIT_MESSAGES_PROMPT];

  chatContextAsCompletionRequest.push({
    role: ChatCompletionRequestMessageRoleEnum.User,
    content
  });

  return chatContextAsCompletionRequest;
};

export enum ERRORS_ENUM {
  tooMuchTokens = 'TOO_MUCH_TOKENS',
  internalError = 'INTERNAL_ERROR',
  emptyMessage = 'EMPTY_MESSAGE'
}

export const solveTest = async (
  testFileContent: string,
  onStream: (token: string) => void,
  onComplete: (completion: string) => void = () => {}
): Promise<void> => {
  try {
    const messages = generateChatCompletionPrompt(testFileContent);

    await api.createChatCompletion(messages, onStream, onComplete);
  } catch (error) {
    throw error;
  }
};
