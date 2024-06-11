import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Button,
  Form,
  FormControl,
  InputGroup,
} from 'react-bootstrap';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import ProductItem from '../components/ProductItem';

import { useGetProductsQuery } from '../hooks/productHooks';
import { getError } from '../utils';
import { ApiError } from '../types/ApiError';
import { Product } from '../types/Product';

export default function LandingPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState<Product[] | undefined>([]);
  const [search, setSearch] = useState('');

  const { data: products, error, isPending } = useGetProductsQuery();
  console.log(products);
  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    navigate(query ? `/search?query=${query}` : '/');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setQuery(products);
  }, [products]);

  return isPending ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">
      {getError(error as unknown as ApiError)}
    </MessageBox>
  ) : (
    <Row>
      <>
        <Helmet>
          <title>4All</title>
        </Helmet>

        <Form className="flex-grow-1 d-flex me-auto" onSubmit={submitHandler}>
          <InputGroup>
            <FormControl
              type="text"
              name="q"
              id="q"
              placeholder="Search products"
              aria-label="Search products"
              aria-describedby="button-search"
              onChange={handleSearch}
            ></FormControl>
            <Button variant="outline-primary" type="submit" id="button-search">
              <i className="fas fa-search"></i>
            </Button>
          </InputGroup>
        </Form>

        {query &&
          query
            .filter((product) => {
              if (search === '') {
                return product;
              } else if (
                product.name.toLowerCase().includes(search.toLowerCase())
              ) {
                return product;
              }
            })

            .map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3}>
                <ProductItem product={product} key={product.slug} />
              </Col>
            ))}
      </>
    </Row>
  );
}
