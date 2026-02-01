#!/usr/bin/env node
/**
 * Upload logos to Sanity
 * Run with: SANITY_TOKEN=xxx node scripts/upload-logos.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SANITY_PROJECT_ID = 'dkobocct';
const SANITY_DATASET = 'production';
const SANITY_TOKEN = process.env.SANITY_TOKEN;

if (!SANITY_TOKEN) {
  console.error('Missing SANITY_TOKEN environment variable');
  process.exit(1);
}

// Map logo filenames to company IDs in Sanity
const logoMap = {
  'anthropic.png': 'anthropic',
  'assemblyai.png': 'assemblyai',
  'bytedance.png': 'bytedance',
  'deepseek.png': 'deepseek_ai',
  'elevenlabs.svg': 'elevenlabs',
  'google.png': 'google',
  'ideogram.png': 'ideogram_ai',
  'kuaishou.png': 'kuaishou',
  'minimax.png': 'minimax',
  'openai.png': 'openai',
  'perplexity.png': 'perplexity',
  'qwen.png': 'qwen',
  'recraft.png': 'recraft_ai',
  'runway.png': 'runwayml',
  'suno.png': 'suno_ai',
  'udio.png': 'udio',
  'xai.png': 'xai'
};

async function uploadAsset(filePath) {
  const fileName = path.basename(filePath);
  const contentType = fileName.endsWith('.svg') ? 'image/svg+xml' : 'image/png';
  const fileBuffer = fs.readFileSync(filePath);
  
  const response = await fetch(
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/assets/images/${SANITY_DATASET}?filename=${fileName}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': contentType,
        'Authorization': `Bearer ${SANITY_TOKEN}`
      },
      body: fileBuffer
    }
  );
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to upload ${fileName}: ${error}`);
  }
  
  const result = await response.json();
  return result.document._id;
}

async function updateCompanyLogo(companyId, assetId) {
  const response = await fetch(
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${SANITY_DATASET}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SANITY_TOKEN}`
      },
      body: JSON.stringify({
        mutations: [{
          patch: {
            id: companyId,
            set: {
              logo: {
                _type: 'image',
                asset: {
                  _type: 'reference',
                  _ref: assetId
                }
              }
            }
          }
        }]
      })
    }
  );
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to update company ${companyId}: ${error}`);
  }
  
  return response.json();
}

async function main() {
  const logosDir = path.join(__dirname, '..', 'assets', 'logos');
  
  for (const [filename, companyId] of Object.entries(logoMap)) {
    const filePath = path.join(logosDir, filename);
    
    if (!fs.existsSync(filePath)) {
      console.log(`Skipping ${filename} - file not found`);
      continue;
    }
    
    try {
      console.log(`Uploading ${filename}...`);
      const assetId = await uploadAsset(filePath);
      console.log(`  Asset ID: ${assetId}`);
      
      console.log(`  Linking to company ${companyId}...`);
      await updateCompanyLogo(companyId, assetId);
      console.log(`  ✓ Done`);
    } catch (error) {
      console.error(`  ✗ Error: ${error.message}`);
    }
  }
  
  console.log('\nLogo upload complete!');
}

main().catch(console.error);
