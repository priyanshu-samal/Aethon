import { inngest } from "./client";
import {createGoogleGenerativeAI} from "@ai-sdk/google";
import {generateText} from "ai"
import {createOpenAI} from "@ai-sdk/openai"
import {createAnthropic} from "@ai-sdk/anthropic"

const google= createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || ""
});

const openai=createOpenAI()
const anthropic=createAnthropic()



export const execute = inngest.createFunction(

  { id: "execute-ai" },
  { event: "execute/ai" },
  
  async ({ event, step }) => {
    await step.sleep("pretend","5s")
    
    const {steps:geminiSteps}=await step.ai.wrap(
      "gemini-generate-text",
      generateText,{
        model:google("gemini-2.5-flash"),
      system:"You are a helpful assistant that helps users by generating text based on their prompts.",
      prompt:"what is 2+2?",
      
    }
    )

    const {steps:openaiSteps}=await step.ai.wrap(
      "openai-generate-text",
      generateText,{
        model:openai("gpt-4"),
      system:"You are a helpful assistant that helps users by generating text based on their prompts.",
      prompt:"what is 2+2?",
      
    }
    )

    const {steps:anthropicSteps}=await step.ai.wrap(
      "anthropic-generate-text",
      generateText,{
        model:anthropic("claude-sonnet-4-5"),
      system:"You are a helpful assistant that helps users by generating text based on their prompts.",
      prompt:"what is 2+2?",
      
    }
    )

    return {
      geminiSteps,
      openaiSteps,
      anthropicSteps
    }
  },
);