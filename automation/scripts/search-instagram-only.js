#!/usr/bin/env node

import dotenv from 'dotenv';
dotenv.config();

import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({ token: process.env.APIFY_API_TOKEN });

console.log('\n🔥 INSTAGRAM REAL LEADS - BÚSQUEDA SIMPLIFICADA\n');

async function main() {
  try {
    const hashtag = 'miamiphotographer';
    console.log(`🔍 Buscando #${hashtag}...\n`);

    const run = await apifyClient.actor('apify/instagram-hashtag-scraper').call({
      hashtags: [hashtag],
      resultsLimit: 20
    });

    const { items } = await apifyClient.dataset(run.defaultDatasetId).listItems();

    console.log(`✅ Encontrados ${items.length} posts\n`);

    // Extraer usuarios únicos
    const users = new Map();
    items.forEach(post => {
      if (post.ownerUsername && !users.has(post.ownerUsername)) {
        users.set(post.ownerUsername, {
          username: post.ownerUsername,
          name: post.ownerFullName || post.ownerUsername,
          followers: post.ownerFollowers || 0,
          bio: post.ownerBio || ''
        });
      }
    });

    console.log(`🔥 Usuarios únicos encontrados: ${users.size}\n`);
    console.log('Top 10 leads REALES de Instagram:\n');

    let i = 0;
    users.forEach((user, username) => {
      if (i < 10) {
        console.log(`${i + 1}. @${username}`);
        console.log(`   Nombre: ${user.name}`);
        console.log(`   Followers: ${user.followers}`);
        console.log(`   Bio: ${user.bio}\n`);
        i++;
      }
    });

    console.log(`\n✅ COMPLETADO: ${Math.min(10, users.size)} leads REALES\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
