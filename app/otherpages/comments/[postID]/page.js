 import CommentList from "@/app/component/commentlist";

 export default function home({params}) {
    return (
        <div className="h-fit">
            <CommentList
            params={params}
            />
        </div>
    )
 }