import fs from "fs/promises";
import path from "path";

import { Fragment } from "react";

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  // NOTE: This will only be executed if fallback: true
  // if (!loadedProduct) {
  //   return <p>Loading...</p>;
  // }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

// ╾─────────────────────────╼ GETSTATICPROPS ╾──────────────────────╼
export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const product = data.products.find((product) => product.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}

// ╾─────────────────────────╼ GETSTATICPATHS ╾──────────────────────╼
export async function getStaticPaths() {
  return {
    paths: [
      { params: { pid: "p1" } },
      // { params: { pid: "p2" } },
      // { params: { pid: "p3" } },
    ],
    // fallback: false,
    // fallback: true,
    fallback: "blocking",
  };
}

export default ProductDetailPage;
