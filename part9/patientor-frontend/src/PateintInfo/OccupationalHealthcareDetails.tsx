import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { useStateValue } from "../state";
import { OccupationalHealthcareEntry } from "../types";

const OccupationalHealthcareDetails: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  const diagnosisList = Object.values(diagnoses);

  const sickLeaveInfo = (
    <>
      <h4>Sick Leave</h4>
      <p>Start Date: {entry.sickLeave?.startDate}</p>
      <p>End Date: {entry.sickLeave?.endDate}</p>
    </>
  );

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date}
          <Icon name="stethoscope" size="big"></Icon>
          {entry.employerName}
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

          {entry.sickLeave ? sickLeaveInfo : ""}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default OccupationalHealthcareDetails;
