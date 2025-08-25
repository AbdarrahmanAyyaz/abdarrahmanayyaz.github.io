import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/Card";
import { Badge, Button } from "./ui";

export default function ProjectCard({ title, img, summary, tags = [], live, code }) {
  return (
    <Card className="group overflow-hidden h-full flex flex-col" hover animate>
      {/* Image */}
      <div className="aspect-card overflow-hidden rounded-t-xl -m-6 mb-0">
        <img 
          src={img} 
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
        />
      </div>
      
      {/* Content */}
      <CardHeader className="pb-3">
        <CardTitle className="text-text group-hover:text-accent transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-muted line-clamp-2">
          {summary}
        </CardDescription>
      </CardHeader>

      {/* Tags */}
      <CardContent className="pt-0 flex-1">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              size="sm"
              className="text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      {/* Actions */}
      <CardFooter className="pt-4 gap-3">
        {live && (
          <Button
            asChild
            variant="primary"
            size="sm"
            className="flex-1"
          >
            <a 
              href={live} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
              Live
            </a>
          </Button>
        )}
        {code && (
          <Button
            asChild
            variant="secondary"
            size="sm"
            className="flex-1"
          >
            <a 
              href={code} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="m10 13 5 5 5-5"/>
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
                <path d="M12 12v9"/>
              </svg>
              Code
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
