import React from "react";
import FrontPage from "../../GlobalFiles/FrontPage";
import Add_Admin from "./Add_Admin";

const AdminDashboard = () => {
  return (
    <div>
      {/* FrontPage is the parent component */}
      <FrontPage>
        {/* Add_Admin is the child component that gets rendered inside FrontPage */}
      </FrontPage>
    </div>
  );
};

export default AdminDashboard;
