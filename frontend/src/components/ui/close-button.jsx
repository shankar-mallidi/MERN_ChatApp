// src/components/ui/close-button.jsx
import { Button } from "@chakra-ui/react";

export const CloseButton = ({ onClick }) => (
  <Button onClick={onClick} size="sm" variant="ghost">
    Close
  </Button>
);


