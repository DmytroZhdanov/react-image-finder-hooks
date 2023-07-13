import { ThreeDots } from 'react-loader-spinner';
import { Container } from "./Loader.styled";

export const Loader = () => {
  return (
    <Container>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#3f51b5"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </Container>
  );
}
