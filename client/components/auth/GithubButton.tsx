import { Github } from "lucide-react";
import React from "react";

const GithubButton = ({ onclick }: { onclick: () => void }) => {
  return (
    <button
      onClick={onclick}
      className="w-full flex items-center justify-center gap-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-150 bg-(--canvas) border border-(--border) text-(--text-primary) hover:bg-(--hover)"
    >
      <Github className="w-4 h-4" />
      Continue with GitHub
    </button>
  );
};

export default GithubButton;
