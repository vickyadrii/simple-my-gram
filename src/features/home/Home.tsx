import { useEffect, useState } from "react";
import { PostData } from "@/types";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const list = localStorage.getItem("posts");
    const parsedlist = list ? JSON.parse(list) : [];
    if (parsedlist.length !== 0) {
      setPosts(parsedlist);
    }
  }, []);

  const filteredPosts = posts.filter((data) => data.posting === "1");

  const handleOnNavigate = (href: string) => {
    navigate(href);
  };

  return (
    <div className="flex flex-col items-end gap-5">
      <div className="bg-white p-10 space-y-6 shadow-md rounded-md max-h-[85vh] overflow-y-auto">
        <div className="">
          <h2 className="text-2xl text-center font-semibold">All Posts</h2>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {filteredPosts.map(({ title, content }, index) => (
            <Card>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto max-h-60">
                <p className="text-sm text-slate-800 leading-6">{content}</p>
              </CardContent>
              <CardFooter>
                <span className="mt-4 text-slate-500 text-sm font-medium">#{index + 1}</span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <Button onClick={() => handleOnNavigate("/posting")}>Post something</Button>
        <Button variant="outline" onClick={() => handleOnNavigate("/about")}>
          About Me
        </Button>
      </div>
    </div>
  );
};

export default Home;