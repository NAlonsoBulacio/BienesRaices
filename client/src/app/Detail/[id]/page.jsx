"use client";
// import { useState, useEffect } from "react";
import Gallery from "./gallery";
import Map from "./map";
import BtnReservar from "./btnReservar";
import BtnFav from "./btnFav";

const fetchPropId = async (id) => {
  const res = await fetch(`http://localhost:3001/realState/${id}`);
  return res.json();
};

export default async function Example({ params }) {
  const { id } = params;
  const propiedad = await fetchPropId(id);

  const product = {
    name: propiedad.address,
    price: propiedad.currency + " " + propiedad.price.toLocaleString(),
    href: "#",
    breadcrumbs: [
      { id: 1, name: propiedad.operation_type },
      { id: 2, name: propiedad.type },
    ],
    description: propiedad.description,
  };

  const images = [
    propiedad.photos[0],
    propiedad.photos[1],
    propiedad.photos[2],
    propiedad.photos[3],
    propiedad.photos[4],
    propiedad.photos[5],
  ];

  const center = {
    lat: parseFloat(propiedad?.geo_lat),
    lng: parseFloat(propiedad?.geo_long),
  };

  const mapContainerStyle = {
    marginTop: "50px",
    width: "100%",
    height: "400px",
  };

  return (
    <div className="bg-white mt-16">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <Gallery images={images} />

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0 text-center md:text-left">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              {product.price}
            </p>

            <div>
              <div className="pt-5 px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                  Información adicional
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                  Estado de la propiedad: {propiedad.property_condition}
                </p>
              </div>
              <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Superficie cubierta
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {propiedad.roofed_surface} m²
                    </dd>
                  </div>
                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Superficie Total
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {propiedad.surface} m²
                    </dd>
                  </div>
                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Ambientes
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {propiedad.room_amount}
                    </dd>
                  </div>
                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Orientación
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {propiedad.orientation}
                    </dd>
                  </div>
                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Antigüedad
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {propiedad.age === -1
                        ? "Menos de un año"
                        : `${propiedad.age} años`}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <BtnReservar id={propiedad.id}></BtnReservar>
            <BtnFav
              id={propiedad.id}
              address={propiedad.address}
              price={propiedad.price}
              photo={propiedad.photos[0]}
            ></BtnFav>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900 leading-8">
                  {product.description}
                </p>
              </div>
            </div>
            <Map mapContainerStyle={mapContainerStyle} center={center} />
          </div>
        </div>
      </div>
    </div>
  );
}
