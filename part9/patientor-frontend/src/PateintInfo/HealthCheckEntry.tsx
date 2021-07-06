import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { HealthCheckEntry } from "../types";

const HealthCheckDetails: React.FC<{ entry: HealthCheckEntry }> = ({
  entry,
}) => {
  let color: "green" | "yellow" | "red" | "black";

  switch (entry.healthCheckRating) {
    case 0:
      color = "green";
      break;
    case 1:
      color = "yellow";
      break;
    case 2:
      color = "red";
      break;
    default:
      color = "black";
  }

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date}
          <Icon name="user md" size="big"></Icon>
        </Card.Header>
        <Card.Description>
          <i>{entry.description}</i>
          <br></br>
          <Icon name="heart" color={color}></Icon>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default HealthCheckDetails;
