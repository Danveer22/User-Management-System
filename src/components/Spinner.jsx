import styled from "styled-components";

const SpinnerContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Spinner = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background: conic-gradient(#0000 10%, #333); /* Dark color */
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: rotate 1.5s infinite linear;

  @keyframes rotate {
    to {
      transform: rotate(1turn);
    }
  }
`;

function SpinnerComponent() {
  return (
    <SpinnerContainer>
      <Spinner></Spinner>
    </SpinnerContainer>
  );
}

export default SpinnerComponent;
