import { Down } from "./Icons";

export default function Hero(){
    return (
        <div>
            <div className="text-sm max-w-fit max-h-fit rounded-2xl bg-slate-700 p-2 m-0 mx-auto font-extralight border border-black shadow-2xl flex justify-center items-center hover:text-slate-400 transition-colors duration-200">
        <span> Shorten URL in one click</span>  
        <Down/>
    </div>
<h1 className="flex justify-center items-center text-3xl tracking-tight mt-10 space-x-3">
  <p className="text-red-500 font-bold">STOP</p>
  <span>Sending Long URLs</span>
</h1>
        <p className="text-xl font-medium text-neutral-300  mt-12 text-center px-4 leading-relaxed max-w-2xl mx-auto pb-8">
  Create clean, memorable URLs in seconds with our powerful URL shortener.
</p>

   </div>
    )
}