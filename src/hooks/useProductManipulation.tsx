"use client";

import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fetchPosts = () =>
  fetch("https://dummyjson.com/products").then((res) =>
    res.json().catch((err) => {
      err;
    })
  );

const addPosts = (product: any) =>
  fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: product.name,
      price: product.price,
    }),
  })
    .then((res) => res.json())
    .catch((err) => err);

const useFetchQuery = () => {
  return useQuery({
    queryKey: "products",
    queryFn: fetchPosts,
    staleTime: 2000000,
  });
};

const useMutationQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addPosts,
    onSuccess: (data) => {
      //   console.log("Mutation success", data);
      //   alert("Success");
      toast.dark("Success");
      queryClient.setQueryData("products", (oldData) => {
        // console.log("oldd", oldData);
        return {
          products: [...oldData.products, data],
        };
      });
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries("products");
    // },
    onError: (error, rollback) => {
      console.error("Mutation error:", error);
      rollback();
    },
  });
};

export { useFetchQuery, useMutationQuery };
