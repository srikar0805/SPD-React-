import CreateTransactions from "./createTransactions";
import { useContext, useState, useEffect } from "react";
import { Detailscontext } from "../context/details";
import TempNavbar from "./tempNavbar.js";
// import { Portfoliocontext } from "../context/portfolio-context";
const Transactions = () => {
  const dets = useContext(Detailscontext);
  // const port = useContext(Portfoliocontext);

  const getdetails = (dat) => {
    dets.details.push(dat);
  };

  console.log(dets.details);

  return (
    <>
      <TempNavbar />
      <CreateTransactions takedetails={getdetails} />
    </>
  );
};

export default Transactions;
