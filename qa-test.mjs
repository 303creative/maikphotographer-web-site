import { chromium } from 'playwright';
import fs from 'fs';

const results = {
  desktop: {},
  mobile: {},
};

async function testDesktop() {
  console.log('\n========== TESTING DESKTOP (1440px) ==========\n');

  const browser = await chromium.launch();
  const context = await browser.createBrowserContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    console.log('✅ Page loaded');

    // Screenshot desktop
    await page.screenshot({ path: 'C:\\tmp\\desktop-hero.png', fullPage: false });
    console.log('📸 Screenshot saved');

    // Test 1: Hero video visibility
    const heroVideo = await page.locator('video').first().isVisible();
    console.log(`${heroVideo ? '✅' : '❌'} Hero video visible: ${heroVideo}`);
    results.desktop.heroVideoVisible = heroVideo;

    // Test 2: Logo SVG in nav
    const logoInNav = await page.locator('nav svg').first().isVisible();
    console.log(`${logoInNav ? '✅' : '❌'} Logo SVG in nav: ${logoInNav}`);
    results.desktop.logoVisible = logoInNav;

    // Test 3: Green badge with available status
    const badge = await page.locator('text=AVAILABLE').isVisible();
    console.log(`${badge ? '✅' : '❌'} Availability badge visible: ${badge}`);
    results.desktop.badgeVisible = badge;

    // Test 4: Portfolio grid
    const portfolioItems = await page.locator('[class*="portfolio"] img, [class*="grid"] img').count();
    console.log(`ℹ️  Portfolio items found: ${portfolioItems}`);
    results.desktop.portfolioItemsCount = portfolioItems;

    // Test 5: Services section
    const serviceCards = await page.locator('text=/Portrait|Editorial|Brand/').count();
    console.log(`ℹ️  Service cards/headings found: ${serviceCards}`);
    results.desktop.serviceCardsCount = serviceCards;

    // Test 6: Contact form exists
    const formExists = await page.locator('form, input[name="name"], input[name="email"]').first().isVisible({ timeout: 2000 }).catch(() => false);
    console.log(`${formExists ? '✅' : '⚠️ '} Contact form visible: ${formExists}`);
    results.desktop.formVisible = formExists;

    // Test 7: WhatsApp button
    const whatsappBtn = await page.locator('a[href*="wa.me"], a[href*="whatsapp"]').first().isVisible({ timeout: 2000 }).catch(() => false);
    console.log(`${whatsappBtn ? '✅' : '⚠️ '} WhatsApp button visible: ${whatsappBtn}`);
    results.desktop.whatsappVisible = whatsappBtn;

    // Test 8: Instagram links
    const instagramLinks = await page.locator('a[href*="instagram"], a[href*="@maik"]').count();
    console.log(`${instagramLinks > 0 ? '✅' : '⚠️ '} Instagram links found: ${instagramLinks}`);
    results.desktop.instagramLinksCount = instagramLinks;

    // Test 9: No horizontal scrollbar
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    console.log(`${!hasHorizontalScroll ? '✅' : '❌'} No horizontal scrollbar: ${!hasHorizontalScroll}`);
    results.desktop.noHorizontalScroll = !hasHorizontalScroll;

    // Test 10: Hamburger hidden on desktop
    const hamburger = await page.locator('[class*="hamburger"], [class*="menu-toggle"]').first().isVisible({ timeout: 1000 }).catch(() => false);
    console.log(`${!hamburger ? '✅' : '❌'} Hamburger hidden on desktop: ${!hamburger}`);
    results.desktop.hamburgerHidden = !hamburger;

  } finally {
    await browser.close();
  }
}

async function testMobile() {
  console.log('\n========== TESTING MOBILE (375px) ==========\n');

  const browser = await chromium.launch();
  const context = await browser.createBrowserContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true
  });
  const page = await context.newPage();

  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    console.log('✅ Page loaded on mobile');

    // Screenshot mobile
    await page.screenshot({ path: 'C:\\tmp\\mobile-hero.png', fullPage: false });
    console.log('📸 Screenshot saved');

    // Test 1: Hero visible on mobile
    const heroVisible = await page.locator('video, [class*="hero"]').first().isVisible();
    console.log(`${heroVisible ? '✅' : '❌'} Hero section visible: ${heroVisible}`);
    results.mobile.heroVisible = heroVisible;

    // Test 2: Hamburger menu visible
    const hamburger = await page.locator('[class*="hamburger"], [class*="menu-toggle"], button[aria-label*="menu"]').first().isVisible({ timeout: 1000 }).catch(() => false);
    console.log(`${hamburger ? '✅' : '❌'} Hamburger menu visible: ${hamburger}`);
    results.mobile.hamburgerVisible = hamburger;

    // Test 3: No horizontal scrollbar on mobile
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    console.log(`${!hasHorizontalScroll ? '✅' : '❌'} No horizontal scrollbar: ${!hasHorizontalScroll}`);
    results.mobile.noHorizontalScroll = !hasHorizontalScroll;

    // Test 4: Viewport meta tag
    const viewportMeta = await page.locator('meta[name="viewport"]').getAttribute('content');
    console.log(`${viewportMeta ? '✅' : '⚠️ '} Viewport meta: ${viewportMeta}`);
    results.mobile.viewportConfigured = !!viewportMeta;

  } finally {
    await browser.close();
  }
}

async function main() {
  try {
    await testDesktop();
    await testMobile();
    console.log('\n========== RESULTS ==========\n');
    console.log(JSON.stringify(results, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
