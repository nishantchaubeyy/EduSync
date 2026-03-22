export type AppNavLink = {
  href: string;
  label: string;
  icon: string;
  exact?: boolean;
};

export const appNavLinks: AppNavLink[] = [
  { href: "/", label: "Home", exact: true, icon: "home" },
  { href: "/courses", label: "Catalog", icon: "menu_book" },
  { href: "/resources", label: "Resources", icon: "folder_open" },
  { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/instructor", label: "Instructor", icon: "school" },
];
