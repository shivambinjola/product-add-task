"use client";
import Image from "next/image";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "react-query";
import {
  useFetchQuery,
  useMutationQuery,
} from "../hooks/useProductManipulation";
import { useForm } from "react-hook-form";
import Loading from "@/components/Loading";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useEffect, useState } from "react";
import Model from "@/components/ui/model";

export default function Home() {
  const [model, setModel] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data, isLoading, error, refetch } = useFetchQuery();
  const { mutate } = useMutationQuery();

  if (isLoading) return <Loading />;

  console.log(data);

  const onSubmit = (data: any) => {
    console.log(data);
    mutate(data);
    setModel(!true);
    reset();

    // refetch();
  };

  return (
    <>
      {model && (
        <Model
          comp={
            <div className="space-y-5">
              <h2 className="text-4xl font-bold text-white text-center">
                Add Product
              </h2>
              <div className="bg-white p-5 rounded-lg flex flex-col">
                <Button
                  onClick={() => setModel(!model)}
                  className="text-xl bg-teal-950 text-white px-8 py-2 rounded-lg cursor-pointor self-end"
                >
                  Close
                </Button>
                <form className=" space-y-5" onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-5">
                    <Input
                      name="name"
                      label="Name"
                      type="text"
                      placeholder=""
                      errors={errors?.name?.type}
                      register={register}
                      constrains={{
                        required: true,
                      }}
                    />
                    <Input
                      name="price"
                      label="Price"
                      type="number"
                      placeholder=""
                      errors={errors?.price?.type}
                      register={register}
                      constrains={{
                        required: true,
                      }}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="text-xl bg-teal-950 text-white px-8 py-2 rounded-lg cursor-pointor "
                  >
                    Add
                  </Button>
                </form>
              </div>
            </div>
          }
        />
      )}
      <main className="flex flex-col items-center py-10 space-y-5">
        <h1 className="text-4xl font-semibold bg-black text-white py-2 px-8 rounded-lg xs:text-2xl">
          Product Details
        </h1>
        <div className="space-y-5">
          {data?.products?.map((item: any, id: any) => (
            <div
              key={id}
              className="w-[90vw] flex items-center gap-5  border-[1px] border-black p-5 rounded-lg"
            >
              {/* <Image src={item?.thumbnail} width={100} height={100} alt={""} /> */}
              <div>
                <h2 className="">Name: {item?.title}</h2>
                <h2>price: {item?.price}</h2>
              </div>
            </div>
          ))}
        </div>
        <Button
          onClick={() => setModel(true)}
          className="text-xl bg-teal-950 text-white px-8 py-2 rounded-lg cursor-pointor sticky top-20"
        >
          Add New
        </Button>
      </main>
    </>
  );
}
