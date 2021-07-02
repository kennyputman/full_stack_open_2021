import React from "react";
import { Icon } from "semantic-ui-react";

const Loading: React.FC<{ showSpinner: boolean }> = ({ showSpinner }) => {
  if (showSpinner) {
    return (
      <div>
        <Icon loading size="big" name="spinner"></Icon>
      </div>
    );
  }

  return <div></div>;
};

export default Loading;
