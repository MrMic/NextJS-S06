import { useEffect, useState } from "react";

function LastSalesPage() {
  const [sales, setSales] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // ______________________________________________________________________
  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://nextjs-course-9c213-default-rtdb.europe-west1.firebasedatabase.app/sales.json",
    ).then((response) => {
      response.json().then((data) => {
        const transformSales = [];

        for (const key in data) {
          transformSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }

        setSales(transformSales);
        setIsLoading(false);
      });
    });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!sales) {
    return <p>No sales yet!</p>;
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

export default LastSalesPage;
