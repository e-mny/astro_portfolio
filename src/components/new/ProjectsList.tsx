import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { projectData } from "@/content/data"

const allProjTitles = projectData.map((project) => project.title)

interface ScrollAreaDemoProps {
  addClass?: string;
}

export function ScrollAreaDemo({ addClass }: ScrollAreaDemoProps) {
  return (
    <ScrollArea className={cn("h-48 w-full rounded-md pl-0", addClass)}>
      <div className="">
        {/* TODO: Replace the content of the projects */}

        {allProjTitles.map((title, index) => (
          <React.Fragment key={title}>
            <div className="text-base">{title}</div>
            {(index < allProjTitles.length - 1) 
            ? <Separator className="my-2" /> : ""}
            
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}
