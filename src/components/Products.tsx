import React, { Fragment } from "react";
import { useProduct, useProducts } from "../services/queries";

const Products = () => {
  const [selectedProductId, setselectedProductId] = React.useState<
    number | null
  >(null);

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useProducts();
  const { data: productData } = useProduct(selectedProductId);

  return (
    <>
      <p>Products</p>
      {data?.pages.map((group, index) => (
        <Fragment key={index}>
          {group.map((product) => (
            <Fragment key={product.id}>
              <button onClick={() => setselectedProductId(product.id)}>
                {product.name}
              </button>
              <br />
              <br />
            </Fragment>
          ))}
        </Fragment>
      ))}
      <br />
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to Load"}
      </button>
      <br />
      <p>Selected Product:</p>
      {JSON.stringify(productData)}
    </>
  );
};

export default Products;
