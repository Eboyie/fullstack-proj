import { Row, Col } from 'react-bootstrap';

import ProductItem from '../components/ProductItem';
import { useGetProductsByCategoryQuery } from '../hooks/productHooks';

function SearchPage() {
  const { data: products } = useGetProductsByCategoryQuery('Trousers');

  return (
    <Row>
      {products?.map((product) => (
        <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
          <ProductItem product={product} />
        </Col>
      ))}
    </Row>
  );
}
export default SearchPage;
