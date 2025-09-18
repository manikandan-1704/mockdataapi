module.exports = [
  {
    id: 1,
    name: "Admin",
    description: "Full access to all resources",
    status: "active",
    permissions: ["read", "write", "delete"]
  },
  {
    id: 2,
    name: "Editor",
    description: "Can edit and update content",
    status: "active",
    permissions: ["read", "write"]
  },
  {
    id: 3,
    name: "Viewer",
    description: "Can only view content",
    status: "active",
    permissions: ["read"]
  },
  {
    id: 4,
    name: "Moderator",
    description: "Can moderate comments and user content",
    status: "active",
    permissions: ["read", "delete"]
  },
  {
    id: 5,
    name: "Contributor",
    description: "Can add content but cannot publish",
    status: "active",
    permissions: ["read", "write"]
  },
  {
    id: 6,
    name: "Support",
    description: "Handles user support tickets",
    status: "inactive",
    permissions: ["read", "write"]
  },
  {
    id: 7,
    name: "Manager",
    description: "Manages teams and resources",
    status: "active",
    permissions: ["read", "write", "delete"]
  },
  {
    id: 8,
    name: "Analyst",
    description: "Can view reports and analytics",
    status: "active",
    permissions: ["read"]
  },
  {
    id: 9,
    name: "Guest",
    description: "Limited access for guest users",
    status: "inactive",
    permissions: ["read"]
  },
  {
    id: 10,
    name: "Developer",
    description: "Can access development tools and APIs",
    status: "active",
    permissions: ["read", "write", "delete"]
  }
];
