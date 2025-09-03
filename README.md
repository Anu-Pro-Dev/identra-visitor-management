# Identra Visitor Management System

A comprehensive visitor management system built with Next.js 15, TypeScript, and modern UI components. This application provides a complete solution for managing visitors, approvals, and security workflows.

## 🚀 Features

### Authentication & Authorization
- **Role-based access control** with Admin, Host, and Security roles
- **Secure authentication** with demo credentials
- **Permission-based routing** and feature access
- **Session management** with automatic logout

### Dashboard & Analytics
- **Interactive dashboard** with visitor statistics
- **Real-time visitor calendar** with appointment visualization
- **Animated components** with Framer Motion
- **Responsive design** for all devices

### Visitor Management
- **Visitor registration** with multi-step form
- **Calendar and list views** for visitor tracking
- **Badge assignment** and management
- **Check-in/Check-out** status tracking

### Approval Workflow
- **Multi-stage approval** process
- **Status-based filtering** (pending, approved, rejected, cancelled)
- **Bulk actions** and individual approvals
- **Security clearance** workflow

### Reporting & Analytics
- **Comprehensive reports** with data visualization
- **Export capabilities** for visitor data
- **Filtering and search** functionality
- **Date-range based** analytics

### Additional Features
- **Company management** for visitor organizations
- **Role management** for system users
- **Badge management** and assignment
- **Dark/Light theme** support
- **Multi-language** support (i18n ready)
- **Responsive mobile** interface

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI + shadcn/ui
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod validation
- **State Management:** React useState/useEffect
- **Icons:** Tabler Icons, React Icons, Lucide React
- **Date Handling:** date-fns
- **Notifications:** Sonner
- **Tables:** TanStack Table

## 📦 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Anu-Pro-Dev/identra-visitor-management.git
cd identra-visitor-management
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Run the development server:**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Demo Credentials

The application includes demo authentication with the following credentials:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@example.com | password |
| **Host** | host@example.com | password |
| **Security** | security@example.com | password |

Each role has different permissions and access levels:

- **Admin:** Full system access including user management, company settings, and all visitor operations
- **Host:** Visitor approvals, visitor management, and reports
- **Security:** Visitor check-in/out, badge management, and security clearances

## 🏗 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (register)/        # Registration routes
│   └── dashboard/         # Protected dashboard routes
├── components/            # Reusable UI components
│   ├── common/           # Common components
│   ├── layout/           # Layout components
│   └── ui/               # shadcn/ui components
├── configs/              # Configuration files
│   └── constants/        # Constants and static data
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
│   ├── auth/            # Authentication client
│   └── utils.ts         # Utility functions
├── modules/              # Feature modules
│   ├── auth/            # Authentication module
│   ├── approvals/       # Approvals management
│   ├── badges/          # Badge management
│   ├── company/         # Company management
│   ├── dashboard/       # Dashboard components
│   ├── register/        # Visitor registration
│   ├── reports/         # Reporting module
│   ├── role/            # Role management
│   └── visitors/        # Visitor management
├── providers/            # React context providers
└── services/            # External services
```

## 🔧 Key Components

### Authentication System
- JWT-like token management
- Role-based permissions
- Secure routing with middleware
- Session persistence

### Multi-Step Registration
- Form validation with Zod
- Step-by-step user guidance
- Data persistence across steps
- Success/error handling

### Dashboard Analytics
- Real-time visitor statistics
- Interactive calendar view
- Animated cards and transitions
- Responsive grid layouts

### Data Tables
- Sortable and filterable columns
- Pagination support
- Bulk selection actions
- Search functionality

## 🎨 Design System

The application uses a modern design system with:

- **Consistent color palette** with CSS variables
- **Typography scale** with proper hierarchy
- **Spacing system** using Tailwind utilities
- **Component variants** with class-variance-authority
- **Responsive breakpoints** for all screen sizes
- **Accessibility features** with proper ARIA labels

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy on Vercel

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Deploy with zero configuration

### Environment Variables

For production deployment, set up the following environment variables:

```env
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=your-domain.com
DATABASE_URL=your-database-url
```

## 🧪 Testing

To test the application:

1. **Login** with any of the demo credentials
2. **Navigate** through different modules based on your role
3. **Test registration** flow for new visitors
4. **Try approval workflows** if you're an admin or host
5. **Switch themes** using the theme toggle
6. **Test responsive** design on mobile devices

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Low-level UI primitives
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Tabler Icons](https://tabler-icons.io/) - Beautiful icons

## 📞 Support

If you have any questions or need help with the project, please:

1. Check the existing [Issues](https://github.com/Anu-Pro-Dev/identra-visitor-management/issues)
2. Create a new issue if needed
3. Contact the development team

---

**Built with ❤️ by the Identra Development Team**
