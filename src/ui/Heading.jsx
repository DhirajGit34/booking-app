import styled, { css } from "styled-components";

// (css) for syntax hightlighting
// const test = css`
//   text-align: center;
// `;
// ${test}

/* we can also define conditionally */
/* font-size: ${10 > 5 ? "30px" : "20px"}; */
const Heading = styled.h1`
  //receiving the props
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}

  line-height: 1.4;
`;

export default Heading;
