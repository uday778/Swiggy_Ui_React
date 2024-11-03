import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";


function OnYourMind({ data }) {
    const [value, setValue] = useState(0);

    function handlePrev() {
        value <= 0 ? "" : setValue((prev) => prev - 50);
    }

    function handleNext() {
        value === 150 ? "" : setValue((prev) => prev + 50);
    }

    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">What`s On Your Mind?</h1>
                <div className="flex gap-4">
                    <div
                        className={`rounded-2xl p-2 cursor-pointer ` + (value <= 0 ? "bg-gray-200" : "bg-gray-300")}
                        onClick={handlePrev}
                    >
                        <FaArrowLeft className={(value <= 0 ? "text-gray-400" : "text-gray-800")} />
                    </div>
                    <div
                        className={`rounded-2xl p-2 cursor-pointer ` + (value >= 150 ? "bg-gray-200" : "bg-gray-300")}
                        onClick={handleNext}
                    >
                        <FaArrowRight className={(value >= 150 ? "text-gray-400" : "text-gray-800")} />
                    </div>
                </div>
            </div>
            <div
                style={{ translate: `${-value}% ` }}
                className={`flex mt-4 duration-1000`}
            >
                {data && data.map((item) => (
                
                  
                    <img
                        key={item.id}
                        src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
                        className="w-[145px]"
                        alt=""
                    />
                ))}
            </div>

            <hr className="border my-10"></hr>
        </div>
    );
}


export default OnYourMind;

