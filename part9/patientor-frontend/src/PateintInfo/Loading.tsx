import React from "react";
import { Container, Icon } from "semantic-ui-react";

const Loading: React.FC<{ showSpinner: boolean }> = ({ showSpinner }) => {
  if (showSpinner) {
    return (
      <Container>
        <Icon loading size="big" name="spinner"></Icon>
      </Container>
    );
  }

  return <div></div>;
};

export default Loading;
