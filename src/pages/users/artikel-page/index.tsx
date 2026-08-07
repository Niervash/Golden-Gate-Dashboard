import React from "react";
import { UsersLayout } from "../../../layouts";
import { ArticleSection } from "../../../components";

const PublicNewsPage: React.FC = () => {
  return (
    <UsersLayout>
      <div className="pt-20">
        <ArticleSection />
      </div>
    </UsersLayout>
  );
};

export default PublicNewsPage;
