/**
 * ANTI-BAN RULES ENGINE
 * Protege contra ban en Instagram, TikTok, Facebook, Meta Ads
 *
 * Reglas implementadas:
 * - Delays aleatorios entre acciones (human-like behavior)
 * - Rate limiting por plataforma
 * - User-agent rotation
 * - Proxy support
 * - Action spacing (no spam)
 * - Daily action limits
 * - Sleep periods
 */

import crypto from 'crypto';

const ANTI_BAN_CONFIG = {
  // Delays (en ms)
  delayBetweenActions: { min: 2000, max: 8000 }, // 2-8 seconds
  delayBetweenPosts: { min: 3600000, max: 7200000 }, // 1-2 hours
  delayBetweenFollows: { min: 5000, max: 15000 }, // 5-15 seconds
  delayBetweenLikes: { min: 1000, max: 5000 }, // 1-5 seconds
  delayBetweenComments: { min: 3000, max: 10000 }, // 3-10 seconds

  // Rate limits
  rateLimits: {
    posts_per_day: 3,
    follows_per_day: 50,
    likes_per_day: 200,
    comments_per_day: 20,
    stories_per_day: 5,
    reels_per_day: 2,
    ads_per_day: 1
  },

  // Daily limits
  dailyLimits: {
    actions_per_hour: 10,
    actions_per_day: 100,
    unique_accounts_per_day: 30
  },

  // Sleep periods (when to pause)
  sleepPeriods: {
    enabled: true,
    nightSleep: { start: '22:00', end: '06:00' }, // 10pm to 6am
    afternoonBreak: { start: '14:00', end: '16:00' }, // 2pm to 4pm (optional)
    breakDuration: 3600000 // 1 hour
  },

  // User agents (rotation)
  userAgents: [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPad; CPU OS 17_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Mobile/15E148 Safari/604.1'
  ]
};

// In-memory store for tracking actions (resets on restart)
const actionTracker = {
  hourlyActions: new Map(),
  dailyActions: new Map(),
  dailyActionTypes: new Map(),
  lastActionTime: {},
  accountsInteractedToday: new Set()
};

class AntiBanRulesEngine {
  constructor(config = ANTI_BAN_CONFIG) {
    this.config = config;
    this.logger = this.initLogger();
  }

  initLogger() {
    return {
      log: (msg) => console.log(`[ANTI-BAN] ✅ ${msg}`),
      warn: (msg) => console.warn(`[ANTI-BAN] ⚠️  ${msg}`),
      error: (msg) => console.error(`[ANTI-BAN] ❌ ${msg}`)
    };
  }

  /**
   * Get random delay (human-like behavior)
   */
  getRandomDelay(delayRange = this.config.delayBetweenActions) {
    const min = delayRange.min;
    const max = delayRange.max;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Wait with jitter (human-like variability)
   */
  async wait(delayMs) {
    const jitter = Math.random() * 0.2 * delayMs; // ±10% jitter
    const totalDelay = delayMs + (Math.random() > 0.5 ? jitter : -jitter);
    await new Promise(resolve => setTimeout(resolve, totalDelay));
    return totalDelay;
  }

  /**
   * Check if should sleep (night time, etc)
   */
  shouldSleep() {
    if (!this.config.sleepPeriods.enabled) return false;

    const now = new Date();
    const currentTime = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');
    const nightStart = this.config.sleepPeriods.nightSleep.start;
    const nightEnd = this.config.sleepPeriods.nightSleep.end;

    // Simple check: if current time is between sleep times
    if (currentTime >= nightStart || currentTime <= nightEnd) {
      return true;
    }

    return false;
  }

  /**
   * Check rate limits for action type
   */
  canPerformAction(actionType, accountId = 'default') {
    const today = new Date().toISOString().split('T')[0];
    const hour = new Date().getHours();
    const key = `${accountId}-${today}`;
    const hourKey = `${accountId}-${today}-${hour}`;

    // Check daily limit for action type
    const dailyCount = actionTracker.dailyActionTypes.get(`${key}-${actionType}`) || 0;
    const dailyLimit = this.config.rateLimits[`${actionType}s_per_day`];

    if (dailyCount >= dailyLimit) {
      this.logger.warn(`Daily limit reached for ${actionType}: ${dailyCount}/${dailyLimit}`);
      return { allowed: false, reason: 'Daily limit reached', retryAfter: 86400 };
    }

    // Check hourly limit
    const hourlyCount = actionTracker.hourlyActions.get(hourKey) || 0;
    const hourlyLimit = this.config.dailyLimits.actions_per_hour;

    if (hourlyCount >= hourlyLimit) {
      this.logger.warn(`Hourly limit reached: ${hourlyCount}/${hourlyLimit}`);
      return { allowed: false, reason: 'Hourly limit reached', retryAfter: 3600 };
    }

    // Check daily total
    const dailyTotal = actionTracker.dailyActions.get(key) || 0;
    if (dailyTotal >= this.config.dailyLimits.actions_per_day) {
      this.logger.warn(`Daily action limit reached: ${dailyTotal}/${this.config.dailyLimits.actions_per_day}`);
      return { allowed: false, reason: 'Daily action limit reached', retryAfter: 86400 };
    }

    return { allowed: true };
  }

  /**
   * Record action for tracking
   */
  recordAction(actionType, accountId = 'default') {
    const today = new Date().toISOString().split('T')[0];
    const hour = new Date().getHours();
    const key = `${accountId}-${today}`;
    const hourKey = `${accountId}-${today}-${hour}`;

    // Update trackers
    actionTracker.dailyActionTypes.set(`${key}-${actionType}`,
      (actionTracker.dailyActionTypes.get(`${key}-${actionType}`) || 0) + 1);
    actionTracker.hourlyActions.set(hourKey, (actionTracker.hourlyActions.get(hourKey) || 0) + 1);
    actionTracker.dailyActions.set(key, (actionTracker.dailyActions.get(key) || 0) + 1);
    actionTracker.accountsInteractedToday.add(accountId);

    this.logger.log(`Action recorded: ${actionType} (Daily: ${actionTracker.dailyActions.get(key)}/100)`);
  }

  /**
   * Get rotating user agent
   */
  getRandomUserAgent() {
    return this.config.userAgents[Math.floor(Math.random() * this.config.userAgents.length)];
  }

  /**
   * Get random proxy (if available)
   */
  getRandomProxy(proxies = []) {
    if (!proxies || proxies.length === 0) return null;
    return proxies[Math.floor(Math.random() * proxies.length)];
  }

  /**
   * Execute action with anti-ban protection
   */
  async executeAction(actionType, action, options = {}) {
    const { accountId = 'default', proxies = [], metadata = {} } = options;

    // Check if should sleep
    if (this.shouldSleep()) {
      this.logger.warn('Sleep period active. Action postponed.');
      return { success: false, reason: 'Sleep period' };
    }

    // Check rate limits
    const limitCheck = this.canPerformAction(actionType, accountId);
    if (!limitCheck.allowed) {
      this.logger.error(`${actionType} blocked: ${limitCheck.reason}`);
      return { success: false, ...limitCheck };
    }

    try {
      // Wait before action (human-like)
      const delayRange = this.config[`delayBetween${actionType.charAt(0).toUpperCase() + actionType.slice(1)}`]
        || this.config.delayBetweenActions;
      const delay = this.getRandomDelay(delayRange);
      this.logger.log(`Waiting ${delay}ms before ${actionType}...`);
      await this.wait(delay);

      // Execute action with anti-ban headers
      const headers = {
        'User-Agent': this.getRandomUserAgent(),
        'Accept-Language': this.getRandomLanguage(),
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive'
      };

      const result = await action({ headers, proxy: this.getRandomProxy(proxies) });

      // Record successful action
      this.recordAction(actionType, accountId);

      return { success: true, ...result };

    } catch (error) {
      // Detect ban/block indicators
      if (error.response?.status === 429 || error.message?.includes('Too Many Requests')) {
        this.logger.error('Rate limit detected! Backing off...');
        return { success: false, reason: 'Rate limited', retryAfter: 3600 };
      }

      if (error.response?.status === 403 || error.message?.includes('Forbidden')) {
        this.logger.error('Account blocked or suspended!');
        return { success: false, reason: 'Account blocked', critical: true };
      }

      this.logger.error(`Action failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get random language (for headers)
   */
  getRandomLanguage() {
    const languages = ['en-US,en;q=0.9', 'en-US,en;q=0.8,es;q=0.6', 'en-US,en;q=0.9,fr;q=0.8'];
    return languages[Math.floor(Math.random() * languages.length)];
  }

  /**
   * Get stats
   */
  getStats(accountId = 'default') {
    const today = new Date().toISOString().split('T')[0];
    const key = `${accountId}-${today}`;
    const dailyTotal = actionTracker.dailyActions.get(key) || 0;

    return {
      dailyActions: dailyTotal,
      dailyLimit: this.config.dailyLimits.actions_per_day,
      accountsInteractedToday: actionTracker.accountsInteractedToday.size,
      remainingActions: this.config.dailyLimits.actions_per_day - dailyTotal
    };
  }
}

export default AntiBanRulesEngine;
