import React, { useState, useEffect, useContext } from "react";
import AddSupplierDetails from "../components/AddSupplierDetails";
import AuthContext from "../AuthContext";

function SupplierDetails() {
  const [showPurchaseModal, setPurchaseModal] = useState(false);
  const [purchase, setAllPurchaseData] = useState([]);
  // const [products, setAllProducts] = useState([]);
  const [updatePage, setUpdatePage] = useState(true);

  const authContext = useContext(AuthContext);
  const handleUpdate = (supplierId)=>{
console.log(supplierId,"I'm click")
  }
  const handledelete = (supplierId)=>{
    console.log(supplierId,"I'm click")
      }

 

  // Fetching Data of All Purchase items
  const fetchPurchaseData = () => {
    fetch(`http://localhost:8080/api/v1/auth/supplier/getsuppliers`)
      .then((response) => response.json())
      .then((data) => {
        setAllPurchaseData(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPurchaseData();
    handleUpdate();
    handledelete();
    //fetchProductsData();
  }, [updatePage]);
  // // Fetching Data of All Products
  // const fetchProductsData = () => {
  //   fetch(`http://localhost:8080/api/v1/auth/supplier/getsuppliers`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setAllProducts(data);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // Modal for Sale Add
  const addSaleModalSetting = () => {
    setPurchaseModal(!showPurchaseModal);
  };

  
  // Handle Page Update
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };
console.log(purchase)
  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
        {showPurchaseModal && (
          <AddSupplierDetails
            addSaleModalSetting={addSaleModalSetting}
            // products={products}
            handlePageUpdate={handlePageUpdate}
            authContext = {authContext}
          />
        )}
        {/* Table  */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Supplier Details</span>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={addSaleModalSetting}
              >
                {/* <Link to="/inventory/add-product">Add Product</Link> */}
                Add Supplier
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  SupplierID
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Contact Person
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Address
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Phone
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Email
                </th>
                
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {purchase.map((element, index) => {
                return (
                  <tr key={element.supplierId}>
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                      {element.supplierId}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.contactPerson}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.address}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.phone}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.email}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-white">
                      <span><button className="bg-green-700 p-2 rounded cursor-pointer"onClick={handleUpdate(element.supplierId)}>Update</button></span>
                      <span><button className="bg-red-600 p-2 rounded cursor-pointer" onClick={handledelete(element.supplierId)}>Delete</button></span>
                  </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SupplierDetails;
