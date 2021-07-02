import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { useStateValue } from "../state";
import { HospitalEntry } from "../types";

const HospitalDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  const diagnosisList = Object.values(diagnoses);
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date}
          <Icon name="hospital" size="big"></Icon>
        </Card.Header>
        <Card.Description>
          <i>{entry.description}</i>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                {code}{" "}
                {
                  diagnosisList.find((diagnosis) => diagnosis.code === code)
                    ?.name
                }
              </li>
            ))}
          </ul>
          <h4>Discharge:</h4>
          <p>Date: {entry.discharge.date}</p>
          <p>Criteria: {entry.discharge.criteria}</p>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default HospitalDetails;
