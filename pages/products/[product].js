import fs from 'fs';
import matter from 'gray-matter';
import marked from 'marked';
import styled from 'styled-components';
import Page from '../../components/styled/Page';

const Title = styled.div`
  display: flex;
  align-items: flex-end;
`;

const SubTitle = styled.p`
  padding: 0.75rem 1rem;
  color: #666;
`;

const Price = styled.span`
  font-size: 2rem;
  font-weight: bold;
  background-color: #90080a;
  padding: .75rem;
  color: #fff;
  border-radius: 5px;
  margin: 1rem 0;
  display: inline-block;
`;

const Product = ({ product: { data, content } }) => {
  const html = marked(content);

  return (
    <Page>
      <Title>
        <h1>{data.name}</h1>
        <SubTitle>{data.description}</SubTitle>
      </Title>
      <Price>${data.price / 100}</Price>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Page>
  );
};

export const getStaticPaths = () => {
  const directory = `${process.cwd()}/content`;
  const filenames = fs.readdirSync(directory);

  const paths = filenames.map(filename => {
    return {
      params: {
        product: filename.replace(".md", ""),
      }
    };
  });
  
  return {
    paths,
    fallback: false, 
  }
}


export const getStaticProps = async (context) => {
  const productName = context.params.product;
  const filepath = `${process.cwd()}/content/${productName}.md`;
  const fileContent = fs.readFileSync(filepath).toString();
  const { data, content } = matter(fileContent);

  return {
    props: {
      product: {
        data,
        content,
      },
    }
  }
}

export default Product;
