import React, { useMemo } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import { create } from "../Redux/billSlice";
export default function BillGenerator() {
  const dispatch = useDispatch();
  const [client, setClient] = useState({
    account_name: "",
    contact_number: "",
    billing_address: "",
    note: "",
    purchase_date: "",
    status: "Sent",
  });
  const [items, setItems] = useState([{ item: "", description: "", quantity: "", price: "", total: "" }]);
  const [total, setTotal] = useState({ sub_total: "", tax: "", total: "" });
  const [pop_up,setPop_up] = useState(false)
  const [tax,setTax] = useState('')
  function addItem() {
    setItems([
      ...items,
      { item: "", description: "", quantity: "", price: "", total: "" },
    ]);
  }
  function itemDelete(index) {
    const newItems = items.filter((d, i) => i !== index);
    setItems(newItems);
  }
  function updateItem(e, index) {
    const { name, value } = e.target;
    const arrayOfOject = [...items];
    arrayOfOject[index][name] = value;
    arrayOfOject[index]['total'] = arrayOfOject[index].quantity* arrayOfOject[index].price;
    setItems(arrayOfOject);
  }
  const finaltotal = useMemo(()=>{
    const subb_total = items.reduce((initialValue,currentValue)=>{
      return initialValue+currentValue.total
    },0)
    total.sub_total = Number(subb_total)
    const taxx = Number(subb_total)*Number(tax)/100
    total.tax = taxx
    total.total = Number(subb_total)+taxx
  },[items])
  useMemo(()=>{
    const taxx = total.sub_total*Number(tax)/100
    total.tax = taxx
    total.total = total.sub_total+taxx
  },[tax])
  function updateClient(e) {
    const { name, value } = e.target;
    setClient((pre) => {
      return { ...pre, [name]: value };
    });
  }
  function updateTotal(e) {
    const { name, value } = e.target;
    setTotal((pre) => {
      return { ...pre, [name]: value };
    });
  }
  function sumbit(e) {
    e.preventDefault()
    dispatch(create({ ...client, items, ...total }));
    setClient({
      account_name: "",
      contact_number: "",
      billing_address: "",
      note: "",
      purchase_date: "",
      status: "Sent",
    })
    setItems([])
    setTotal({ sub_total: "", tax: "", total: "" })
    setPop_up(true)
    setTimeout(()=>{
      setPop_up(false)
    },2000)
  }

  return (
    <>
      <form className="relative flex place-content-center place-items-center" onSubmit={sumbit}>
        <div className="bg-gray-300 h-full w-screen">
          <h1 className="text-4xl p-2  font-semibold">Invoice</h1>
          {/* Customer Info */}
          <h3 className="text-2xl p-2 font-serif">Client</h3>
          <section>
            <div className="grid md:grid-cols-2">
              <div className="grid grid-cols-5">
                <div className="grid gap-1 col-span-3 px-2">
                  <label
                    className="text-sm text-gray-900"
                    htmlFor="customer_name"
                  >
                    <span className="text-red-600">*</span>Account Name
                  </label>
                  <input
                    className="rounded-md border-gray-900 border-[0.1px] py-1.5 pl-3 pr-2 text-gray-900 focus:outline-none
              shadow-md ring-1 ring-gray-300 text-[13px] sm:text-sm ring-inset sm:leading-6"
                    id="customer_name"
                    type="text"
                    name="account_name"
                    maxLength="50"
                    onChange={updateClient}
                    required
                    value={client.account_name}
                  />
                </div>

                <div className="grid gap-1 col-span-2 px-2">
                  <label
                    className="text-sm text-gray-900"
                    htmlFor="customer_number"
                  >
                    <span className="text-red-600">*</span>Contact Number
                  </label>
                  <input
                    className="rounded-md border-gray-900 border-[0.1px] min-w-5 py-1.5 pl-3 pr-2 text-gray-900 focus:outline-none
              shadow-md ring-1 ring-gray-300 text-[13px] sm:text-sm ring-inset sm:leading-6"
                    id="customer_number"
                    type="number"
                    name="contact_number"
                    onChange={updateClient}
                    // maxlength={10}
                    min={0} 
                    max={9999999999}
                    required
                    value={client.contact_number}
                  />
                </div>
              </div>
              <div className="grid gap-1 px-2">
                <label
                  className="text-sm text-gray-900"
                  htmlFor="billing_address"
                >
                  <span className="text-red-600">*</span>Billing Address
                </label>
                <input
                  className="rounded-md border-gray-900 border-[0.1px] py-1.5 pl-3 pr-2 text-gray-900 focus:outline-none
              shadow-md ring-1 ring-gray-300 text-[13px] sm:text-sm ring-inset sm:leading-6"
                  id="billing_address"
                  type="text"
                  name="billing_address"
                  onChange={updateClient}
                  required
                  value={client.billing_address}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2">
              <div className="grid gap-1 px-2">
                <label className="text-sm text-gray-900" htmlFor="note">
                  Note
                </label>
                <input
                  className="rounded-md border-gray-900 border-[0.1px] py-1.5 pl-3 pr-2 text-gray-900 focus:outline-none
              shadow-md ring-1 ring-gray-300 text-[13px] sm:text-sm ring-inset sm:leading-6"
                  id="note"
                  type="text"
                  name="note"
                  onChange={updateClient}
                  value={client.note}
                />
              </div>
              <div className="grid grid-cols-2">
                <div className="grid gap-1 px-2">
                  <label
                    className="text-sm text-gray-900"
                    htmlFor="purchase_date"
                  >
                    <span className="text-red-600">*</span>Purchase Date
                  </label>
                  <input
                    className="rounded-md border-gray-900 border-[0.1px] py-1.5 pl-3 pr-2 text-gray-900 focus:outline-none
              shadow-md ring-1 ring-gray-300 text-[13px] sm:text-sm ring-inset sm:leading-6"
                    id="purchase_date"
                    type="date"
                    name="purchase_date"
                    onChange={updateClient}
                    required
                    value={client.purchase_date}
                  />
                </div>
                <div className="grid gap-1 px-2">
                  <label className="text-sm text-gray-900" htmlFor="status">
                    <span className="text-red-600">*</span>Status
                  </label>

                  <select
                    className="rounded-md border-gray-900 border-[0.1px] py-1.5 pl-3 pr-2 text-gray-900 focus:outline-none
                shadow-md ring-1 ring-gray-300 text-[13px] sm:text-sm ring-inset sm:leading-6"
                    id="status"
                    name="status"
                    // defaultValue={"Sent"}
                    onChange={updateClient}
                    value={client.status}
                    required
                  >
                    <option hidden>Select a Status</option>
                    <option value="Sent">Sent</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>
          </section>
          <hr className="my-6 border-dashed border-black border-[0.1.1px]"></hr>

          {/* Product info*/}
          <h3 className="text-2xl p-2 font-serif">Products</h3>
          {items.map((data, index) => (
            <section key={index} className="relative mt-4">
              <div className=" grid gap-0 md:grid-cols-2">
                <div className="grid grid-cols-5">
                  <div className="grid gap-1 col-span-2 px-2">
                    <label className="text-sm text-gray-900" htmlFor="item">
                      Item
                    </label>
                    <input
                      className="rounded-md border-gray-900 min-w-8 border-[0.1px] py-1.5 pl-3 pr-2 text-gray-900 focus:outline-none
        shadow-md ring-1 ring-gray-300 text-[13px] sm:text-sm ring-inset sm:leading-6"
                      id="item"
                      name="item"
                      type="text"
                      value={data.item}
                      onChange={(e) => updateItem(e, index)}
                      required
                    />
                  </div>
                  <div className="grid gap-1 col-span-3 px-2">
                    <label
                      className="text-sm text-gray-900"
                      htmlFor="description"
                    >
                      Description
                    </label>
                    <input
                      className="rounded-md border-gray-900 border-[0.1px] py-1.5 pl-3 pr-2 text-gray-900 focus:outline-none
        shadow-md ring-1 ring-gray-300 text-[13px] sm:text-sm ring-inset sm:leading-6"
                      id="description"
                      name="description"
                      type="text"
                      value={data.description}
                      onChange={(e) => updateItem(e, index)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="grid gap-1 px-2">
                    <label className="text-sm text-gray-900" htmlFor="quantity">
                      Quantity
                    </label>
                    <input
                      className="rounded-md border-gray-900 border-[0.1px] min-w-3 py-1.5 pl-3 pr-2 text-gray-900 focus:outline-none
        shadow-md ring-1 ring-gray-300 text-[13px] sm:text-sm ring-inset sm:leading-6"
                      id="quantity"
                      type="number"
                      name="quantity"
                      value={data.quantity}
                      onChange={(e) => updateItem(e, index)}
                      required
                    />
                  </div>
                  <div className="grid gap-1 px-2">
                    <label className="text-sm text-gray-900" htmlFor="price">
                      Price
                    </label>
                    <input
                      className="rounded-md border-gray-900 border-[0.1px] min-w-4 py-1.5 pl-3 pr-2 text-gray-900 focus:outline-none
        shadow-md ring-1 ring-gray-300 text-[13px] sm:text-sm ring-inset sm:leading-6"
                      id="price"
                      name="price"
                      type="number"
                      placeholder="₹"
                      value={data.price}
                      onChange={(e) => updateItem(e, index)}
                      required
                    />
                  </div>
                  <div className="grid gap-1 px-2">
                    <label className="text-sm text-gray-900" htmlFor="total">
                      Total
                    </label>
                    <input
                      className="rounded-md border-gray-900 border-[0.1px] min-w-5 py-1.5 pl-3 pr-2 text-gray-900 focus:outline-none
        shadow-md ring-1 ring-gray-300 text-[13px] sm:text-sm ring-inset sm:leading-6"
                      id="total"
                      name="total"
                      type="number"
                      placeholder="₹"
                      value={data.total}
                      onChange={(e) => updateItem(e, index)}
                      required
                    />
                  </div>
                </div>
              </div>
              <img
                onClick={() => itemDelete(index)}
                className="size-7 cursor-pointer absolute right-5 -top-2"
                src="https://www.svgrepo.com/show/21045/delete-button.svg"
              />
            </section>
          ))}
          <hr className="mt-6 border-dashed border-black border-[0.1.1px]"></hr>
          <div
            onClick={addItem}
            className="border-[0.1px] text-center m-2 p-2 cursor-pointer rounded-md border-black border-dashed"
          >
            <AiOutlinePlus className="inline" /> Add Product
          </div>

          {/* Billing info */}
          <section>
            <div className="grid sm:grid-cols-2 grid-cols-1">
              <div
                className="grid grid-cols-2 
            "
              >
                <div className="grid grid-cols-1 pl-20 place-items-start items-center">
                  <label className="text-sm text-gray-900" htmlFor="sub_total">
                    Sub Total
                  </label>
                  <label className="text-sm text-gray-900" htmlFor="tax">
                    Tax
                    <select 
                    className="ml-1 bg-gray-300" 
                    defaultValue={10}
                    onChange={(e)=>setTax(e.target.value)}
                    >
                      <option selected >0</option>
                      <option>19</option>
                      <option>12</option>
                      <option>15</option>
                      <option>18</option>
                      <option>20</option>
                    </select>
                    %
                  </label>
                  <label className="text-sm text-gray-900" htmlFor="Total">
                    Total
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-1 place-items-start">
                  <input
                    className="rounded-md ml-3 border-gray-900 border-[0.1px] min-w-5 py-1.5 pl-3 pr-2 text-gray-900 focus:outline-none
        shadow-md ring-1 ring-gray-300 text-[13px] sm:text-sm ring-inset sm:leading-6"
                    id="sub_total"
                    name="sub_total"
                    type="number"
                    placeholder="₹"
                    onChange={updateTotal}
                    required
                    value={total.sub_total}
                  />

                  <input
                    className="rounded-md ml-3 border-gray-900 border-[0.1px] min-w-5 py-1.5 pl-3 pr-2 text-gray-900 focus:outline-none
        shadow-md ring-1 ring-gray-300 text-[13px] sm:text-sm ring-inset sm:leading-6"
                    id="tax"
                    name="tax"
                    type="number"
                    placeholder="₹"
                    onChange={updateTotal}
                    required
                    value={total.tax}
                  />

                  <input
                    className="rounded-md ml-3 border-gray-900 border-[0.1px] min-w-5 py-1.5 pl-3 pr-2 text-gray-900 focus:outline-none
        shadow-md ring-1 ring-gray-300 text-[13px] sm:text-sm ring-inset sm:leading-6"
                    id="Total"
                    name="total"
                    type="number"
                    placeholder="₹"
                    onChange={updateTotal}
                    required
                    value={total.total}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-gray-800  ml-4 mb-5 sm:ml-10 text-white rounded-lg px-3 py-2"
                >
                  <AiOutlinePlus className="inline" /> Save Invoice
                </button>
              </div>
            </div>
          </section>
        </div>
        {pop_up && (
        <div className="z-50 max-w-[50%] max-h-[15%] p-5 rounded-md flex placeholder: border-2 outline-1 ring-slate-500 ring-4 absolute top-[45%] bg-gray-800 border-white">
          <p className="text-white">Success! Your invoice was completed.</p>
        </div>
      )}
        </form>
    </>
  );
}
