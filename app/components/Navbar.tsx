export default function Navbar(){
    const links=[{
        title:"Github",
        href:"#"
    },{
        title:"Twitter",
        href:"#"
    },{
        title:"Some",
        href:"#"
    }]
    return(
        <div className="flex justify-between pt-4 items-center pr-3 pl-3 pb-4">
            <div className="font-bold text-2xl">Shortner</div>
            <div className="items-center flex gap-10 ">
                {links.map((link,idx)=>(
                    <a href={link.href} key={link.title} className="text-stone-300 hover:text-slate-500 font-bold transiton:all-1s ease-out ">{link.title}</a>
                ))}
            </div>
        </div>
    )
}