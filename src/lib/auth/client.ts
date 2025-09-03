export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  permissions: { resource: string; action: string }[];
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// Mock user data for development
const mockUsers: Record<string, User> = {
  "admin@example.com": {
    id: "1",
    email: "admin@example.com",
    name: "Admin User",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?img=1",
    permissions: [
      { resource: "dashboard", action: "read" },
      { resource: "visitors", action: "read" },
      { resource: "visitors", action: "write" },
      { resource: "approvals", action: "read" },
      { resource: "approvals", action: "write" },
      { resource: "reports", action: "read" },
      { resource: "company", action: "read" },
      { resource: "company", action: "write" },
      { resource: "role", action: "read" },
      { resource: "role", action: "write" },
      { resource: "badges", action: "read" },
      { resource: "badges", action: "write" },
    ],
  },
  "host@example.com": {
    id: "2",
    email: "host@example.com",
    name: "Host User",
    role: "host",
    avatar: "https://i.pravatar.cc/150?img=2",
    permissions: [
      { resource: "dashboard", action: "read" },
      { resource: "visitors", action: "read" },
      { resource: "approvals", action: "read" },
      { resource: "approvals", action: "write" },
      { resource: "reports", action: "read" },
    ],
  },
  "security@example.com": {
    id: "3",
    email: "security@example.com",
    name: "Security User",
    role: "security",
    avatar: "https://i.pravatar.cc/150?img=3",
    permissions: [
      { resource: "dashboard", action: "read" },
      { resource: "visitors", action: "read" },
      { resource: "visitors", action: "write" },
      { resource: "approvals", action: "read" },
      { resource: "badges", action: "read" },
      { resource: "badges", action: "write" },
    ],
  },
};

class AuthClientClass {
  private currentUser: User | null = null;
  private isAuthenticated = false;

  constructor() {
    // Initialize with a default user for development
    this.currentUser = mockUsers["admin@example.com"];
    this.isAuthenticated = true;
  }

  async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user = mockUsers[email];
      if (user && password) { // Simple password check for demo
        this.currentUser = user;
        this.isAuthenticated = true;
        
        // Store in localStorage for persistence
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_user', JSON.stringify(user));
          const token = 'mock_token_' + Date.now();
          localStorage.setItem('auth_token', token);
          
          // Set cookie for middleware
          document.cookie = `auth_token=${token}; path=/; max-age=86400`; // 24 hours
        }
        
        return { success: true };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    this.isAuthenticated = false;
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_token');
      
      // Remove cookie
      document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    }
  }

  async getCurrentUser(): Promise<User | null> {
    if (this.currentUser) {
      return this.currentUser;
    }

    // Try to restore from localStorage
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('auth_user');
      const storedToken = localStorage.getItem('auth_token');
      
      if (storedUser && storedToken) {
        this.currentUser = JSON.parse(storedUser);
        this.isAuthenticated = true;
        return this.currentUser;
      }
    }

    return null;
  }

  async validatePermission(resource: string, action: string): Promise<boolean> {
    const user = await this.getCurrentUser();
    if (!user) return false;

    return user.permissions.some(
      permission => permission.resource === resource && permission.action === action
    );
  }

  async refreshToken(): Promise<boolean> {
    // Mock token refresh
    return true;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated && this.currentUser !== null;
  }

  getRole(): string | null {
    return this.currentUser?.role || null;
  }

  async switchRole(newRole: string): Promise<boolean> {
    // For demo purposes, allow role switching
    const roleUser = Object.values(mockUsers).find(user => user.role === newRole);
    if (roleUser) {
      this.currentUser = roleUser;
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_user', JSON.stringify(roleUser));
      }
      return true;
    }
    return false;
  }
}

export const AuthClient = new AuthClientClass();
