import AccountForm from "@/components/ui/AccountForm";
import { accountForm } from "@/actions/accountForm"
import React from "react";

const Page = () => {
  const action = accountForm;
  return (
    <div>
      <AccountForm
        accAction={action}
      />
    </div>
  );
};

export default Page;
