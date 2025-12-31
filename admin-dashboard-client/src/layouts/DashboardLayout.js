import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <Header />
      <main className="ml-64 mt-16 p-6 bg-gray-100 min-h-screen">
        {children}
      </main>
    </>
  );
};

export default DashboardLayout;
