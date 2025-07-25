"use client"
import React, { ChangeEvent, useState} from "react";
import { handleOnClick } from "../action/handleClick";
import { BiLink } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon,CopyIcon } from "./Icons";

export default function UrlInput(){

    const [inputValue, setInputValue] = useState<string>("");
    const [outputValue, setOutputValue] = useState<string>("");
    const [awaiting, setAwaiting] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);

    const handleInputChange=(e:ChangeEvent<HTMLInputElement>)=>{setInputValue(e.target.value)}
   
    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault();
        if(!inputValue.trim()){
            setError(true)
            setTimeout(()=>{setError(false)},300)
            return;
        }

        setAwaiting(true);
        try {
            const shortendUrl=await handleOnClick(inputValue)
            if(shortendUrl==inputValue){
                setError(true);
               setTimeout(() => setError(false), 3000);
            }
            else{
                setError(false);
                setOutputValue(shortendUrl)
            }
        } 
        catch (error) {
            console.log("SOME ERROR OCCURED WHILE SHORTENING URL :",error);
            setError(true)    
            setTimeout(() => setError(false), 3000);
        }
        finally{
            setAwaiting(false)
        }
    }

    const copyToClipboard=async()=>{
        try{
            await navigator.clipboard.writeText(outputValue);
            setCopied(true)
            setTimeout(() => setCopied(false), 3000);
        }
        catch(error){
            console.log("Failed to Copy",error)
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit} className="relative">
                <div className="flex items-center  gap-x-0 justify-center pr-25 pt-15">
                    <div className="relative flex-1 justify-evenly">
                      <input
                    type="url"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter your long URL here..."
                    disabled={awaiting}
                    className="w-full text-center max-w-2xl mx-auto block px-5 py-4  pl-12 rounded-2xl bg-gray-900/60 border border-gray-700 text-white placeholder-gray-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-500 focus:outline-none transition-all duration-200 shadow-lg pr-14"
                    />

             <AnimatePresence>
              {error && (
                <motion.div
                  className="absolute left-0 w-full text-center text-slate-900 text-md"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}>
                  Please enter a valid URL (e.g., https://example.com)
                </motion.div>
              )}
            </AnimatePresence>
                </div>
                <button 
                    type="submit"
                    disabled={awaiting}
                      className={`ml-1 px-8 py-3 rounded-lg font-medium transition-all duration-300 text-white 
              ${
                awaiting
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-gradient-to-r from-slate-900 to-neutral-500   hover:shadow-lg hover:shadow-black-900/100 rounded-2xl w-fit"
              }`}>
                {awaiting ? (
              <div className="flex items-center">
                <Spinner />
                <span className="ml-2 ">Processing...</span>
              </div>
            ) : (
              "Shorten URL"
            )}
                </button>
                </div>
            </form>
                  <AnimatePresence>
        {outputValue && (
          <div>
            <div className="flex flex-col sm:flex-row bg-gray-900/50 py-2 px-4 rounded-lg items-start sm:items-center justify-between space-y-3 sm:space-y-0 mt-5 ">
              <div className="flex-1 min-w-0 pr-2">
                {" "}
                {/* Added min-width and padding */}
                <div className="text-sm text-gray-200 mb-1 pl-130">
                  Your shortened URL:
                </div>
                <a
                  href={outputValue}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl pl-125 font-medium text-blue-300 hover:text-blue-200 hover:underline transition-colors truncate block">
                  {" "}
                  {/* Added truncate and block */}
                  {outputValue.replace(/^https?:\/\//, "")}
                </a>
              </div>
              <motion.button
                onClick={copyToClipboard}
                className={`flex-shrink-0 flex items-center gap-2 py-2 px-4 rounded-md transition-all ${
                  copied
                    ? "bg-green-600/20 text-green-400 border border-green-600/30"
                    : "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 hover:text-white"
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}>
                {copied ? (
                  <>
                    <CheckIcon className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        )}
      </AnimatePresence>
        </div>
    )
}
const Spinner = () => {
  return (
    <svg
      aria-hidden="true"
      className="w-5 h-5 animate-spin text-gray-600 fill-white"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
  );
}