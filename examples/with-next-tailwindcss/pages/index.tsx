import React from "react";

export default function IndexPage() {
  return (
    <div className="flex flex-col justify-center items-center max-w-7xl mx-auto">
      <div className="bg-gray-800 p-6 rounded-lg text-white">
        <h1 className="text-4xl font-bold mb-4 text-gray-100">
          🧙‍♂️ Welcome ser!
        </h1>

        <p>
          Go checkout the{" "}
          <a href="https://wizard-ui.com" className="underline">
            docs
          </a>
          . Or if you have questions{" "}
          <a href="https://twitter.com/arthuryeti" className="underline">
            send me a tweet
          </a>
          .
        </p>
      </div>
    </div>
  );
}
