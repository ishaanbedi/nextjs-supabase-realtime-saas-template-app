import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

interface QuotableData {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

const AxiosSamplePage: React.FC = () => {
  const [data, setData] = useState<QuotableData | null>(null);

  useEffect(() => {
    axios
      .get<QuotableData>("https://api.quotable.io/random")
      .then((response: AxiosResponse<QuotableData>) => {
        setData(response.data);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="min-h-screen p-8">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">Fetched Data (JSON)</h1>
          <pre
            style={{
              maxWidth: "400px",
              overflowX: "auto",
            }}
          >
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
        <div className="p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">Code</h1>
          <pre>
            {`
import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

interface QuotableData {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

const AxiosSamplePage: React.FC = () => {
  const [data, setData] = useState<QuotableData | null>(null);

  useEffect(() => {
    axios
      .get<QuotableData>("https://api.quotable.io/random")
      .then((response: AxiosResponse<QuotableData>) => {
        setData(response.data);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="min-h-screen p-8">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">Fetched Data (JSON)</h1>
          <pre
            style={{
              maxWidth: "400px",
              overflowX: "auto",
            }}
          >
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
        <div className="p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">Code</h1>
          <pre>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default AxiosSamplePage;
            
            `}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default AxiosSamplePage;
