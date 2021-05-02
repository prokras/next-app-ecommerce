import styled from "styled-components";
import { Normalize } from "styled-normalize";
import Navbar from "../components/Navbar";
import CartProvider from '../context/CartProvider';

const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Padauk:wght@400;700&display=swap");
  
  background: linear-gradient(to right, #fc00ff, #00dbde);
  font-family: "Padauk", sans-serif;
  color: #444;
`;

const Page = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
`;

const MyApp = ({ Component, pageProps }) => {
  return (
    <CartProvider>
      <Container>
      <Normalize />
      <Navbar/>
        <Page>
        <Component {...pageProps} />
        </Page>
      </Container>
    </CartProvider>
  );
};

export default MyApp;