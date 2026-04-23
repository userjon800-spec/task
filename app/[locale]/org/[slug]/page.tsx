"use client";

import { useParams } from "next/navigation";
import { JSX, useState } from "react";

export default function Page():JSX.Element {
  const [data, setData] = useState(null)
  const params = useParams();
  console.log(params.slug);
  
  return <div>page</div>;
}