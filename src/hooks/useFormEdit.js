import { useState } from "react";

const getCurrentFieldValue = (initialVal, edits, fieldName) => {
  if (edits[fieldName] !== undefined) {
    return edits[fieldName];
  }
  if (initialVal) {
    return initialVal[fieldName];
  }
  return null;
};

const isEmpty = (obj) => {
  if (typeof obj === "object") {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }
    return JSON.stringify(obj) === JSON.stringify({});
  }
  return Array.isArray(obj) && obj.length === 0;
};

export const useFormEdit = (initial) => {
  const [edits, setEdits] = useState({});

  const reset = () => {
    setEdits({});
  };

  const update = (values) => {
    setEdits({ ...edits, ...values });
  };

  const allFilled = (...properties) => {
    return !properties.some((e) => !getValue(e));
  };

  const getValue = (field) => {
    return getCurrentFieldValue(initial, edits, field);
  };

  const isAnyModified = () => {
    return !isEmpty(edits);
  };

  return { reset, update, getValue, allFilled, edits, isAnyModified };
};
