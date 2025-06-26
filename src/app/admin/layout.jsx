import AdminPanelRoot from "./components/AdminPanelRoot";

// Ten komponent pozostaje prostym komponentem serwerowym.
// Jego jedynym zadaniem jest renderowanie klienckiego "rusztowania"
// i przekazanie do niego podstron (children), które mogą być serwerowe.
export default function AdminLayout({ children }) {
  return <AdminPanelRoot>{children}</AdminPanelRoot>;
}
