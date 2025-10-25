import styled from "styled-components";
import PropTypes from "prop-types";

const StyledFormRow = styled.div`
  display: grid;
  align-items: start;
  grid-template-columns: 22rem 1fr auto;
  gap: 1.6rem 2.4rem;

  padding: 1.2rem 0;
  border-bottom: 1px solid
    ${props =>
      props.$hasError ? "var(--color-red-100)" : "var(--color-grey-100)"};

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:hover {
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1.2rem;
    border-bottom: none;
  }
`;

const Label = styled.label`
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Error = styled.span`
  font-size: 1.3rem;
  color: var(--color-red-700);
  align-self: center;
`;
// in props we need label and error also input as a children
const FormRow = ({ label, error, children }) => {
  return (
    <StyledFormRow $hasError={Boolean(error)}>
      {label && <Label htmlFor={children?.props?.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
};

FormRow.propTypes = {
  label: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default FormRow;
