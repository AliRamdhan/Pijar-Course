import React, { useEffect, useState } from "react";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";
import OrderHistory from "../../components/user/OrderHistory";
import UserServices from "../../services/user.service";
const History = () => {
  const [user, setUser] = useState("");
  const [order, setOrder] = useState([]);
  const [scroll, scrollValue] = useState(0);
  window.addEventListener("scroll", function scroll() {
    scrollValue(window.Math.round(scrollY));
  });
  useEffect(() => {
    const user = async () => {
      try {
        const response = await UserServices.getUserBoard();
        // Handle the data as needed, e.g., set it in state
        console.log(response.data.User);
        setUser(response.data.User);
      } catch (error) {
        // Handle errors
        console.error("Error fetching user board data:", error);
      }
    };
    user();
  }, []);
  useEffect(() => {
    if (user.id) {
      pp(user.id);
    }
  }, [user.id]);

  const pp = async (userId) => {
    try {
      const response = await UserServices.getHistoryOrderItemsUser(userId);
      // Handle the data as needed, e.g., set it in state
      console.log(response.data.Orders);
      setOrder(response.data.Orders);
    } catch (error) {
      // Handle errors
      console.error("Error fetching user board data:", error);
    }
  };

  return (
    <>
      <header
        className={`w-full flex flex-col justify-center items-center fixed z-10 ${
          scroll >= 50 ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <Header />
      </header>
      <main className="min-h-screen pt-28 px-16">
        <section>
          <div>
            {order.length > 0 ? (
              // Render your component with orders data
              <OrderHistory orders={order} />
            ) : (
              // Render loading state or some other UI when orders are not available
              <p>Loading...</p>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
        <Footer />
      </footer>
    </>
  );
};

export default History;
