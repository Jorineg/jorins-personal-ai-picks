#!/usr/bin/env node
/**
 * Migration script: JSON data → Sanity
 * Run with: SANITY_TOKEN=xxx node scripts/migrate-to-sanity.js
 */

const SANITY_PROJECT_ID = 'dkobocct';
const SANITY_DATASET = 'production';
const SANITY_TOKEN = process.env.SANITY_TOKEN;

if (!SANITY_TOKEN) {
  console.error('Missing SANITY_TOKEN environment variable');
  process.exit(1);
}

const siteData = {
  "companies": [
    { "id": "company_bytedance", "name": "ByteDance" },
    { "id": "company_google", "name": "Google" },
    { "id": "company_openai", "name": "OpenAI" },
    { "id": "company_xai", "name": "xAI" },
    { "id": "company_anthropic", "name": "Anthropic" },
    { "id": "company_qwen", "name": "Qwen" },
    { "id": "company_ideogram_ai", "name": "Ideogram AI" },
    { "id": "company_recraft_ai", "name": "Recraft AI" },
    { "id": "company_kuaishou", "name": "Kuaishou" },
    { "id": "company_runwayml", "name": "RunwayML" },
    { "id": "company_suno_ai", "name": "Suno AI Inc." },
    { "id": "company_udio", "name": "Udio" },
    { "id": "company_elevenlabs", "name": "ElevenLabs" },
    { "id": "company_assemblyai", "name": "AssemblyAI" },
    { "id": "company_minimax", "name": "Minimax" },
    { "id": "company_perplexity", "name": "Perplexity" },
    { "id": "company_deepseek_ai", "name": "DeepSeek" }
  ],
  "categories": [
    {
      "name": "AI Chat Models",
      "slug": "ai-chat-models",
      "description": "Engage in conversations, get answers, and generate text with these leading AI chat models.",
      "order": 1,
      "models": [
        { "rank": 1, "model_name": "GPT-5", "company_id": "company_openai", "service_link": "https://chatgpt.com/", "cheapest_option": "Free", "api_available": true, "description": "OpenAI's new model with a router that automatically decides whether it should use reasoning or not. Siginificantly improved for coding tasks compared previous OpenAi models." },
        { "rank": 2, "model_name": "Gemini 2.5 Pro", "company_id": "company_google", "service_link": "https://gemini.google.com/", "cheapest_option": "Free", "api_available": true, "description": "Google's most capable model, which 'thinks' before answering. This takes usually a few seconds, so it's not the fastest model, but the quality is great." },
        { "rank": 3, "model_name": "Claude Opus 4.1", "company_id": "company_anthropic", "service_link": "https://claude.ai/", "cheapest_option": "Free", "api_available": true, "description": "Only very few free credits available. 20$/Month for more usage. This model is especially good at coding and function calling." },
        { "rank": 4, "model_name": "Grok 4", "company_id": "company_xai", "service_link": "https://grok.com", "cheapest_option": "Free", "api_available": true, "description": "This model destinguishes itself from the others by having better access to real-time information, fewer restrictions and a more unique personality." },
        { "rank": 5, "model_name": "Qwen3 235B 2507", "company_id": "company_qwen", "service_link": "https://chat.qwen.ai/", "cheapest_option": "Free", "api_available": true, "description": "One of the best open-weight models currently available. Developed by the Alibaba group." },
        { "rank": 6, "model_name": "DeepSeek V3.1", "company_id": "company_deepseek_ai", "service_link": "https://deepseek.com/", "cheapest_option": "Free", "api_available": true, "description": "Developed by DeepSeek AI." }
      ]
    },
    {
      "name": "Image Generation",
      "slug": "image-generation",
      "description": "Create stunning visuals from text prompts using these powerful AI image generators.",
      "order": 2,
      "models": [
        { "rank": 1, "model_name": "Google Imagen 4", "company_id": "company_google", "service_link": "https://gemini.google.com/", "cheapest_option": "125$/Month", "api_available": false, "description": "This model is only available in the Gemini Ultra subscription." },
        { "rank": 2, "model_name": "ChatGPT Image Model", "company_id": "company_openai", "service_link": "https://chat.openai.com/", "cheapest_option": "Free", "api_available": true, "description": "This model is super great at following instructions and rendering text in images." },
        { "rank": 3, "model_name": "Ideogram V3", "company_id": "company_ideogram_ai", "service_link": "https://ideogram.ai/", "cheapest_option": "Free", "api_available": true, "description": "Excels at professional designs, layouts, logos, etc. but is also great for general images." },
        { "rank": 4, "model_name": "Google Imagen 3", "company_id": "company_google", "service_link": "https://gemini.google.com/", "cheapest_option": "Free", "api_available": true, "description": "Simply ask Gemini to generate an image based on a text prompt." },
        { "rank": 5, "model_name": "Seedream 3.0", "company_id": "company_bytedance", "service_link": "https://dreamina.capcut.com/ai-tool/image/generate", "cheapest_option": "Free", "api_available": false },
        { "rank": 6, "model_name": "Recraft v3", "company_id": "company_recraft_ai", "service_link": "https://www.recraft.ai/", "cheapest_option": "Free", "api_available": true }
      ]
    },
    {
      "name": "Video Generation",
      "slug": "video-generation",
      "description": "Generate videos from text prompts or images.",
      "order": 3,
      "models": [
        { "rank": 1, "model_name": "Google Veo 3", "company_id": "company_google", "service_link": "https://aistudio.google.com/generate-video", "cheapest_option": "20$/Month", "api_available": false, "description": "This model also generates audio with the video. It is great at dialogue (with excellent lip-syncing), background music, noise, etc." },
        { "rank": 2, "model_name": "Kling 2.1", "company_id": "company_kuaishou", "service_link": "https://app.klingai.com", "cheapest_option": "Free", "api_available": true },
        { "rank": 3, "model_name": "Google Veo 2", "company_id": "company_google", "service_link": "https://aistudio.google.com/generate-video", "cheapest_option": "Free", "api_available": true, "description": "Available in aistudio for free." },
        { "rank": 4, "model_name": "Kling 2.0", "company_id": "company_kuaishou", "service_link": "https://app.klingai.com", "cheapest_option": "7$/Month", "api_available": true },
        { "rank": 5, "model_name": "Runway Gen 4", "company_id": "company_runwayml", "service_link": "https://app.runwayml.com/", "cheapest_option": "Free", "api_available": true },
        { "rank": 6, "model_name": "Sora", "company_id": "company_openai", "service_link": "https://chat.openai.com/", "cheapest_option": "20$/Month", "api_available": false }
      ]
    },
    {
      "name": "Music Generation",
      "slug": "music-generation",
      "description": "Create original music tracks with AI.",
      "order": 4,
      "models": [
        { "rank": 1, "model_name": "Suno", "company_id": "company_suno_ai", "service_link": "https://suno.com/", "cheapest_option": "Free", "api_available": false },
        { "rank": 2, "model_name": "Udio", "company_id": "company_udio", "service_link": "https://www.udio.com/", "cheapest_option": "Free", "api_available": true }
      ]
    },
    {
      "name": "Audio Transcription",
      "slug": "audio-transcription",
      "description": "Transcribe audio content into text.",
      "order": 5,
      "models": [
        { "rank": 1, "model_name": "Gemini 2.5 Flash", "company_id": "company_google", "service_link": "https://aistudio.google.com/", "cheapest_option": "Free", "api_available": true, "description": "Simply upload your audio file and ask the model to transcribe it." },
        { "rank": 2, "model_name": "ElevenLabs Scribe", "company_id": "company_elevenlabs", "service_link": "https://elevenlabs.io/speech-to-text", "cheapest_option": "Free", "api_available": true },
        { "rank": 3, "model_name": "Universal-2", "company_id": "company_assemblyai", "service_link": "https://www.assemblyai.com/universal-2", "cheapest_option": "Free", "api_available": true }
      ]
    },
    {
      "name": "Text to Speech",
      "slug": "text-to-speech",
      "description": "Convert text into natural-sounding speech.",
      "order": 6,
      "models": [
        { "rank": 1, "model_name": "ElevenLabs Multilingual v2", "company_id": "company_elevenlabs", "service_link": "https://elevenlabs.io/", "cheapest_option": "Free", "api_available": true },
        { "rank": 2, "model_name": "OpenAI tts-1-hd", "company_id": "company_openai", "service_link": "", "cheapest_option": "$30.00/1M chars", "api_available": true },
        { "rank": 3, "model_name": "Minimax Speech 02 HD", "company_id": "company_minimax", "service_link": "https://chat.minimax.io/", "cheapest_option": "Free", "api_available": true },
        { "rank": 4, "model_name": "OpenAI 4o-mini tts", "company_id": "company_openai", "service_link": "https://openai.fm", "cheapest_option": "$0.60/1M Input", "api_available": true }
      ]
    },
    {
      "name": "Deep Research",
      "slug": "deep-research",
      "description": "Use AI to conduct comprehensive research on a wide range of topics.",
      "order": 7,
      "models": [
        { "rank": 1, "model_name": "Deep Research with Gemini 2.5 Pro", "company_id": "company_google", "service_link": "https://gemini.google.com/", "cheapest_option": "20$/Month", "api_available": false, "description": "Select the 'Deep Research' option in the model selection dropdown." },
        { "rank": 2, "model_name": "Deep Research with OpenAI o3", "company_id": "company_openai", "service_link": "https://chatgpt.com/", "cheapest_option": "20$/Month", "api_available": false, "description": "Select the 'Deep Research' option in ChatGPT." },
        { "rank": 3, "model_name": "Deep Research with Gemini Flash", "company_id": "company_google", "service_link": "https://gemini.google.com/", "cheapest_option": "Free", "api_available": false, "description": "The free version uses the less capable gemini flash model." },
        { "rank": 4, "model_name": "Deep Research with OpenAI 4o-mini", "company_id": "company_openai", "service_link": "https://chatgpt.com/", "cheapest_option": "Free", "api_available": false, "description": "Click the 'Deep research' button in ChatGPT." },
        { "rank": 5, "model_name": "Deep Research with Grok 3", "company_id": "company_xai", "service_link": "https://grok.com/", "cheapest_option": "Free", "api_available": false, "description": "Select 'DeeperSearch' before submitting your prompt." },
        { "rank": 6, "model_name": "Deep Research with Perplexity", "company_id": "company_perplexity", "service_link": "https://perplexity.ai/", "cheapest_option": "Free", "api_available": false, "description": "Select 'Research' before submitting your prompt." }
      ]
    }
  ]
};

async function sanityMutate(mutations) {
  const response = await fetch(
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${SANITY_DATASET}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SANITY_TOKEN}`
      },
      body: JSON.stringify({ mutations })
    }
  );
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Sanity mutation failed: ${error}`);
  }
  
  return response.json();
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function migrate() {
  console.log('Starting migration...');
  
  const mutations = [];
  const companyIdMap = {};
  const categoryIdMap = {};
  
  // Create companies
  console.log('Creating companies...');
  for (const company of siteData.companies) {
    const sanityId = company.id.replace('company_', '');
    companyIdMap[company.id] = sanityId;
    
    mutations.push({
      createOrReplace: {
        _id: sanityId,
        _type: 'company',
        name: company.name
      }
    });
  }
  
  // Create categories
  console.log('Creating categories...');
  for (const category of siteData.categories) {
    const sanityId = `category-${slugify(category.name)}`;
    categoryIdMap[category.slug] = sanityId;
    
    mutations.push({
      createOrReplace: {
        _id: sanityId,
        _type: 'category',
        name: category.name,
        slug: { _type: 'slug', current: category.slug },
        description: category.description,
        order: category.order
      }
    });
    
    // Create models for this category
    for (const model of category.models) {
      const modelId = `model-${slugify(category.slug)}-${model.rank}`;
      const companyRef = companyIdMap[model.company_id];
      
      if (!companyRef) {
        console.warn(`Missing company: ${model.company_id} for model ${model.model_name}`);
        continue;
      }
      
      mutations.push({
        createOrReplace: {
          _id: modelId,
          _type: 'aiModel',
          modelName: model.model_name,
          company: { _type: 'reference', _ref: companyRef },
          category: { _type: 'reference', _ref: sanityId },
          rank: model.rank,
          description: model.description || '',
          serviceLink: model.service_link || '',
          cheapestOption: model.cheapest_option || '',
          apiAvailable: model.api_available || false
        }
      });
    }
  }
  
  // Create site settings
  mutations.push({
    createOrReplace: {
      _id: 'siteSettings',
      _type: 'siteSettings',
      title: "Jorin's AI Picks",
      description: "My personal, curated selection of the best AI tools and models across different categories.",
      author: "Jorin Eggers"
    }
  });
  
  console.log(`Executing ${mutations.length} mutations...`);
  const result = await sanityMutate(mutations);
  console.log('Migration complete!', result);
}

migrate().catch(console.error);
