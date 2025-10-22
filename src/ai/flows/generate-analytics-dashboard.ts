'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate analytics dashboards for the President and HOD roles.
 *
 * It allows users to request analytics reports using natural language, specifying metrics and date ranges.
 * The flow leverages an LLM to process the natural language query and retrieve the requested data.
 *
 * @exports generateAnalyticsDashboard - An async function that takes a natural language query as input and returns the generated dashboard analytics.
 * @exports GenerateAnalyticsDashboardInput - The input type for the generateAnalyticsDashboard function.
 * @exports GenerateAnalyticsDashboardOutput - The output type for the generateAnalyticsDashboard function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAnalyticsDashboardInputSchema = z.object({
  query: z.string().describe('A natural language query requesting specific analytics data.'),
});
export type GenerateAnalyticsDashboardInput = z.infer<typeof GenerateAnalyticsDashboardInputSchema>;

const GenerateAnalyticsDashboardOutputSchema = z.object({
  analyticsData: z.string().describe('The generated analytics data in a human-readable format.'),
});
export type GenerateAnalyticsDashboardOutput = z.infer<typeof GenerateAnalyticsDashboardOutputSchema>;

export async function generateAnalyticsDashboard(input: GenerateAnalyticsDashboardInput): Promise<GenerateAnalyticsDashboardOutput> {
  return generateAnalyticsDashboardFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAnalyticsDashboardPrompt',
  input: {schema: GenerateAnalyticsDashboardInputSchema},
  output: {schema: GenerateAnalyticsDashboardOutputSchema},
  prompt: `You are an AI assistant that generates analytics dashboards based on user queries.

  The user will provide a natural language query, and you should respond with the requested analytics data.

  User Query: {{{query}}}

  Please provide the analytics data in a clear and concise format.`,
});

const generateAnalyticsDashboardFlow = ai.defineFlow(
  {
    name: 'generateAnalyticsDashboardFlow',
    inputSchema: GenerateAnalyticsDashboardInputSchema,
    outputSchema: GenerateAnalyticsDashboardOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
