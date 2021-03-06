import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import styled from 'styled-components';
import UnstyledLink from '../components/styled/UnstyledLink';
import useCart from '../hooks/useCart';

const Container = styled.div`
  background-color: #eee;
  padding: 1rem 2rem;
  min-height: 200px;
  position: relative;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.02);
  }
`;

const ProductsContainer = styled.div`
  display: grid;
  padding: 1rem 0;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
`;

const Price = styled.p`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 2.5rem;

`;

const renderProduct = (product, addItemToCart) => {
  const handleClick = (e) => {
    e.stopPropagation();
    addItemToCart(product);
  };

  return (
    <Link href={product.slug} key={product.id}>
      <UnstyledLink>
        <Container>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <button onClick={handleClick}>Add to cart</button>
          <Price>${product.price / 100}</Price>
        </Container>
      </UnstyledLink>
    </Link>
  );
};

const HomePage = ({ products }) => {
  const { cart, addItemToCart } = useCart();
  console.log(cart);
  return (
    <ProductsContainer>
      {products.map(product => renderProduct(product, addItemToCart))}
    </ProductsContainer>
  );
};

export const getStaticProps = async () => {
  const directory = `${process.cwd()}/content`;
  const filenames = fs.readdirSync(directory);

  const products = filenames.map(filename => {
    const fileContent = fs.readFileSync(`${directory}/${filename}`).toString();
    const { data } = matter(fileContent);
    const slug = `/products/${filename.replace('.md', '')}`;
    const product = {
      ...data,
      slug
    }

    return product;
  });

  return {
    props: {
      products,
    },
  }
}

export default HomePage;