import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import { EntryFormValues } from "../types";
import HealthCheckForm from "./HealthCheckForm";
import HospitalEntryForm from "./HospitalEntryForm";
import OccupationalEntryForm from "./OccupationalEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  entryType: string;
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  entryType,
}: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new Entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      {entryType === "HealthCheck" && (
        <HealthCheckForm onSubmit={onSubmit} onCancel={onClose} />
      )}
      {entryType === "Hospital" && (
        <HospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
      )}
      {entryType === "OccupationalHealthcare" && (
        <OccupationalEntryForm onSubmit={onSubmit} onCancel={onClose} />
      )}
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;
