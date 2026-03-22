export type AppNavLink = {
  href: string;
  label: string;
  icon: string;
  exact?: boolean;
};

export const appNavLinks: AppNavLink[] = [
  { href: "/", label: "Dashboard", exact: true, icon: "home" },
  { href: "/courses", label: "Courses", icon: "menu_book" },
  { href: "/dashboard", label: "Resources", icon: "dashboard" },
  { href: "/instructor", label: "Faculty", icon: "school" },
];
