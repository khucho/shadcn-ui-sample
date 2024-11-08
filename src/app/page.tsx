import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Receipe{
    title: string,
    image: string,
    time: number,
    description: string,
    vegan: boolean,
    id: string
}

async function getReceipes(): Promise<Receipe[]>{
  const result = await fetch('http://localhost:4000/recipes');

  await new Promise((resolve) => setTimeout(resolve,3000));

  return result.json();
}
export default async function Home() {

  const receipes = await getReceipes();
  return (
    <main>
      <div className="grid grid-cols-3 gap-8">
        {receipes.map( receipe => (
            <Card key={receipe.id} className="flex flex-col jusify-between">
                <CardHeader className="flex-row gap-4 items-center">
                  <Avatar>
                    <AvatarImage src={`/img/${receipe.image}`} alt="receipe img"/>
                    <AvatarFallback>
                      {receipe.title.slice(0,2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{receipe.title}</CardTitle>
                    <CardDescription>{receipe.time} mins to cook.</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{receipe.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button> View Receipt </Button>
                   {receipe.vegan && <Badge  variant="secondary">Vegan!</Badge>}
                </CardFooter>
            </Card>
        ))}
      </div>
    </main>
  );
}
