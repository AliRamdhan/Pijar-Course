import React, { useEffect, useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { Alert } from "flowbite-react";

const OrderHistory = (props) => {
  const { orders } = props;
  // useEffect(() => {
  //   console.log(orders);
  // }, [orders]);
  const [pp, setPp] = useState([1, 2, 3, 4]);
  return (
    <section className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
      <header className="flex items-center gap-2 mb-5">
        <h2>
          <FiShoppingBag className="text-3xl " />
        </h2>
        <h2 className="text-2xl font-semibold">Riwayat Pembelian</h2>
      </header>
      <div className="w-full">
        <nav className="w-full bg-gray-800 text-white font-medium text-lg rounded-lg py-4 px-4 mb-4">
          <ul className="flex justify-around items-center">
            <li className="text-center w-full">ID PESANAN</li>
            <li className="text-center w-full">Course</li>
            <li className="text-center w-full">Tanggal</li>
            <li className="text-center w-full">Jumlah</li>
            <li className="text-center w-full">Status</li>
            <li className="text-center w-full">Pembayaran</li>
          </ul>
        </nav>
        <main className="w-full flex flex-col justify-center items-center gap-2 px-4 py-4 border rounded-lg">
          {orders.map((order, index) => (
            <article className="w-full border-b py-2" key={index}>
              <ul className="w-full flex justify-around items-center text-md">
                <li className="text-center w-full">ID PESANAN</li>
                <li className="text-center w-full">
                  <div className="font-semibold ">
                    {order.orderItems.map((item, index) => (
                      <div key={index}>
                        <p className="text-gray-800">
                          {item.course.Course_name}{" "}
                        </p>
                        <p className=" text-gray-500">
                          {item.course_variation_option.Option_name}
                        </p>
                      </div>
                    ))}
                  </div>
                </li>
                <li className="text-center w-full">
                  {new Date(order.order.createdAt).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </li>
                <li className="text-center w-full">
                  {order.order.Orders_totalAmount}
                </li>
                <li className="text-center w-full font-bold">
                  {order.order.Orders_status}
                </li>
                <li className="text-center w-full">Pembayaran</li>
              </ul>
              <div className="mt-2 mb-1.5 p-4">
                <Alert
                  color={
                    order.order.Orders_status === "Succes"
                      ? `success`
                      : `warning`
                  }
                  rounded
                >
                  {order.order.Orders_status === "Succes" ? (
                    <>
                      <span className="font-medium">Selamat belajar!</span> Kamu
                      sudah membayar uang kursusnya.
                    </>
                  ) : (
                    <>
                      <span className="font-medium">Bayar cepat!</span> Semakin
                      cepat membayar , semakin cepat pula kamu belajar.
                    </>
                  )}
                </Alert>
              </div>
            </article>
          ))}
        </main>
      </div>
    </section>
  );
};

export default OrderHistory;
