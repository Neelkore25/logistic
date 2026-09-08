import { UserAccount, UserRole, TradeType } from '../types/export';
import { db, initializeUserDatabaseRecords } from './databaseService';

const SESSION_KEY = 'exportready_session_userid';

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + '_exportready_salt');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export const authService = {
  async register(params: {
    email: string;
    username: string;
    password: string;
    role: UserRole;
    tradeType?: TradeType;
    businessName?: string;
  }): Promise<UserAccount> {
    const trimmedEmail = params.email.trim().toLowerCase();
    const trimmedUsername = params.username.trim();

    // Check if user already exists
    const existing = await db.users
      .filter(u => u.email.toLowerCase() === trimmedEmail || u.username.toLowerCase() === trimmedUsername.toLowerCase())
      .first();

    if (existing) {
      throw new Error('An account with this email or username already exists.');
    }

    const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const passwordHash = await hashPassword(params.password);
    const tradeType = params.tradeType || 'international';

    const newUser: UserAccount = {
      id: userId,
      email: trimmedEmail,
      username: trimmedUsername,
      passwordHash,
      role: params.role,
      tradeType,
      language: 'en',
      createdAt: new Date().toISOString()
    };

    await db.users.add(newUser);
    await initializeUserDatabaseRecords(userId, params.role, tradeType, params.businessName);

    localStorage.setItem(SESSION_KEY, userId);
    return newUser;
  },

  async login(identifier: string, password: string, role?: UserRole): Promise<UserAccount> {
    const cleanId = identifier.trim().toLowerCase();
    const passwordHash = await hashPassword(password);

    const user = await db.users
      .filter(u => u.email.toLowerCase() === cleanId || u.username.toLowerCase() === cleanId)
      .first();

    if (!user) {
      throw new Error('Account not found with this email or username.');
    }

    if (user.passwordHash !== passwordHash) {
      throw new Error('Incorrect password. Please verify and try again.');
    }

    if (role && user.role !== role) {
      // Allow seamless login while updating role if selected
      user.role = role;
      await db.users.update(user.id, { role });
    }

    localStorage.setItem(SESSION_KEY, user.id);
    return user;
  },

  async getCurrentUser(): Promise<UserAccount | null> {
    const sessionUserId = localStorage.getItem(SESSION_KEY);
    if (!sessionUserId) return null;
    const user = await db.users.get(sessionUserId);
    return user || null;
  },

  logout(): void {
    localStorage.removeItem(SESSION_KEY);
  }
};
