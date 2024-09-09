import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

interface ScrollAreaDemoProps {
  addClass?: string;
}

export function ScrollAreaDemo({ addClass }: ScrollAreaDemoProps) {
  return (
    <ScrollArea className={cn("h-72 w-full rounded-md pl-0", addClass)}>
      <div className="">
        // TODO: Replace the content of the projects
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}
