import Button from "./button";


export default function NewsFeed(){
    function handleClick(e: any){
        console.log(e)
    }

    return (<>
        <Button name="Click me" onButtonClick={(e: any) => handleClick(e)}/>
    </>)
}