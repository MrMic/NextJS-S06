import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);
  // const [isLoading, setIsLoading] = useState(false);

  // ______________________________________________________________________
  const fetcher = (url) => fetch(url).then((r) => r.json());

  const { data, error } = useSWR(
    "https://nextjs-course-9c213-default-rtdb.europe-west1.firebasedatabase.app/sales.json",
    fetcher,
  );

  useEffect(() => {
    if (data) {
      const transformSales = [];

      for (const key in data) {
        transformSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformSales);
    }
  }, [data]);

  // ______________________________________________________________________
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch(
  //     "https://nextjs-course-9c213-default-rtdb.europe-west1.firebasedatabase.app/sales.json",
  //   ).then((response) => {
  //     response.json().then((data) => {
  //       const transformSales = [];
  //
  //       for (const key in data) {
  //         transformSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }
  //
  //       setSales(transformSales);
  //       setIsLoading(false);
  //     });
  //   });
  // }, []);

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!sales && !sales) {
    return <p>Loading...</p>;
  }

  // ______________________________________________________________________
  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

// ═══════════════════════════ GETSTATICPROPS ════════════════════════
export async function getStaticProps(_context) {
  const response = await fetch(
    "https://nextjs-course-9c213-default-rtdb.europe-west1.firebasedatabase.app/sales.json",
  );
  const data = await response.json();

  const transformSales = [];

  for (const key in data) {
    transformSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return {
    props: {
      sales: transformSales,
    },
    revalidate: 10,
  };
}

export default LastSalesPage;
