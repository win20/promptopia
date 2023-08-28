import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const dynamic = 'force-dynamic';

export const GET = async (req) => {
  const test = 'test'
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate('creator');

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    return new Response('Failed to fetch prompts', {
      status: 500,
    });
  }

};
